import React, {useEffect, useRef, useState} from 'react';
import './style.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import gameTrack from '../../../assets/game_track.mp3';
import correctAnswer from '../../../assets/CorrectAnswer.mp3';
import wrongAnswer from '../../../assets/WrongAnswer.mp3';
import {score, getPlayerByFkId} from "../../../service/PlayerService.js";

const GameComponent = () => {
    const [data, setData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [solution, setSolution] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [reloadGame, setReloadGame] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [gameResult, setGameResult] = useState(null); // 'win', 'lose', or null
    const [resultCountdown, setResultCountdown] = useState(null);
    const [audioInitialized, setAudioInitialized] = useState(false);
    const [isLoadingGame, setIsLoadingGame] = useState(true);

    // Use refs for timers to easily clear them
    const timerRef = useRef(null);
    const resultTimerRef = useRef(null);

    // Audio refs for sound effects
    const backgroundMusicRef = useRef(null);
    const winSoundRef = useRef(null);
    const loseSoundRef = useRef(null);

    // Store audio elements to ensure they remain loaded
    const audioElementsRef = useRef([]);

    const navigate = useNavigate();

    // Initialize audio - IMPORTANT FIX: Handle audio loading properly
    useEffect(() => {
        console.log('Initializing audio...');

        // Create background music element
        const bgMusic = new Audio(gameTrack);
        bgMusic.loop = true;
        bgMusic.volume = 0.5;
        bgMusic.preload = 'auto';
        backgroundMusicRef.current = bgMusic;

        // Create win sound element
        const winSound = new Audio(correctAnswer);
        winSound.preload = 'auto';
        winSoundRef.current = winSound;

        // Create lose sound element
        const loseSound = new Audio(wrongAnswer);
        loseSound.preload = 'auto';
        loseSoundRef.current = loseSound;

        // Store all audio elements to prevent garbage collection
        audioElementsRef.current = [bgMusic, winSound, loseSound];

        // Debug logging to check if audio is correctly initialized
        audioElementsRef.current.forEach((audio, index) => {
            audio.addEventListener('canplaythrough', () => {
                console.log(`Audio ${index} is ready to play`);
            });

            audio.addEventListener('error', (e) => {
                console.error(`Audio ${index} error:`, e);
                console.error('Error code:', audio.error?.code);
            });
        });

        setAudioInitialized(true);
        console.log('Audio initialization complete');

        return () => {
            // Clean up audio on component unmount
            audioElementsRef.current.forEach(audio => {
                audio.pause();
                audio.src = '';
            });
        };
    }, []);

    // Improved play sound function
    const playSound = (audioRef) => {
        if (!audioRef || !audioRef.current) {
            console.error('Invalid audio reference');
            return;
        }

        if (isMuted) {
            console.log('Sound is muted, not playing');
            return;
        }

        console.log('Attempting to play sound');

        // Reset the audio to start
        audioRef.current.currentTime = 0;

        // Play with better error handling
        try {
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Audio play failed:", error);

                    // Try again with user interaction
                    const handleUserInteraction = () => {
                        audioRef.current.play().catch(e => console.error("Second attempt failed:", e));
                        document.removeEventListener('click', handleUserInteraction);
                    };

                    document.addEventListener('click', handleUserInteraction, {once: true});
                });
            }
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    // Start background music - improved implementation
    const startBackgroundMusic = () => {
        if (isMuted || !backgroundMusicRef.current) return;

        console.log('Starting background music');

        // Check if already playing
        if (!backgroundMusicRef.current.paused) {
            console.log('Music is already playing');
            return;
        }

        try {
            backgroundMusicRef.current.currentTime = 0;
            const playPromise = backgroundMusicRef.current.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Background music failed to play:", error);

                    // Create a one-time click handler to play music
                    const playMusicOnInteraction = () => {
                        backgroundMusicRef.current.play().catch(e =>
                            console.error("Second attempt to play music failed:", e)
                        );
                        window.removeEventListener('click', playMusicOnInteraction);
                    };

                    window.addEventListener('click', playMusicOnInteraction, {once: true});
                });
            }
        } catch (error) {
            console.error("Error starting background music:", error);
        }
    };

    const gameWin = () => {
        console.log('Game won!');

        // Stop the game timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set game result and start countdown
        setGameResult('win');
        setResultCountdown(3);

        // Play win sound
        playSound(winSoundRef);
    };

    const gameLost = () => {
        console.log('Game lost!');

        // Stop the game timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Set game result and start countdown
        setGameResult('lose');
        setResultCountdown(3);

        // Play lose sound
        playSound(loseSoundRef);
    };

    // Handle the result countdown and navigation
    useEffect(() => {
        if (resultCountdown !== null) {
            if (resultCountdown > 0) {
                resultTimerRef.current = setTimeout(() => {
                    setResultCountdown(resultCountdown - 1);
                }, 1000);
            } else {
                // Navigate after countdown reaches 0
                if (gameResult === 'win') {
                    navigate('/win');
                } else if (gameResult === 'lose') {
                    navigate('/lost');
                }
            }
        }

        return () => {
            if (resultTimerRef.current) {
                clearTimeout(resultTimerRef.current);
            }
        };
    }, [resultCountdown, gameResult, navigate]);

    // Simplified game loading without preloading
    const loadGame = () => {
        console.log('Loading game...');

        // Reset states
        setTimeLeft(60);
        setIsImageLoaded(false);
        setIsPaused(false);
        setGameResult(null);
        setResultCountdown(null);
        setIsLoadingGame(true);

        // Clear any existing timers
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (resultTimerRef.current) {
            clearTimeout(resultTimerRef.current);
        }

        console.log('Fetching game data...');
        axios.get('https://marcconrad.com/uob/banana/api.php?out=json&base64=no')
            .then((response) => {
                console.log('Game data received:', response.data);
                setData(response);

                const imgUrl = response.data.question;
                setImageUrl(imgUrl);
                setSolution(response.data.solution);
                setIsLoadingGame(false);

                // Start background music only if fully initialized
                if (audioInitialized && !isPaused && !isMuted) {
                    startBackgroundMusic();
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoadingGame(false);
            });
    };

    // Load game on initial render or reload
    useEffect(() => {
        loadGame();

        // Create a more robust audio initialization
        const enableAudio = () => {
            console.log('User interaction detected, attempting to enable audio');
            if (audioInitialized) {
                startBackgroundMusic();

                // Also try to briefly play and pause all sounds to "warm them up"
                audioElementsRef.current.forEach(audio => {
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                audio.pause();
                                audio.currentTime = 0;
                                console.log('Sound warmed up successfully');
                            })
                            .catch(e => console.log('Sound warm-up failed, will try again on next interaction'));
                    }
                });
            }
        };

        // Listen for user interaction
        const interactionEvents = ['click', 'touchstart', 'keydown'];
        interactionEvents.forEach(event => {
            document.addEventListener(event, enableAudio, {once: true});
        });

        return () => {
            // Clean up
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            if (resultTimerRef.current) {
                clearTimeout(resultTimerRef.current);
            }
            interactionEvents.forEach(event => {
                document.removeEventListener(event, enableAudio);
            });
        };
    }, [reloadGame]);

    // Game timer
    useEffect(() => {
        // Only run the timer if the game is not paused, image is loaded, and no result yet
        if (isImageLoaded && timeLeft > 0 && !isPaused && !gameResult) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0 && !gameResult) {
            gameLost();
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [timeLeft, isImageLoaded, isPaused, gameResult]);

    // Effect to handle mute/unmute
    useEffect(() => {
        if (backgroundMusicRef.current) {
            if (isMuted) {
                backgroundMusicRef.current.pause();
                console.log('Music muted');
            } else if (!isPaused && !gameResult && audioInitialized) {
                startBackgroundMusic();
                console.log('Music unmuted');
            }
        }
    }, [isMuted, isPaused, gameResult, audioInitialized]);

    // Effect to handle pause/resume
    useEffect(() => {
        if (backgroundMusicRef.current && audioInitialized) {
            if (isPaused || gameResult) {
                backgroundMusicRef.current.pause();
                console.log('Music paused');
            } else if (!isMuted) {
                startBackgroundMusic();
                console.log('Music resumed');
            }
        }
    }, [isPaused, gameResult, isMuted, audioInitialized]);

    const handleScore = async () => {
        try {
            const signInId = localStorage.getItem("banana_userId");
            if (!signInId) {
                console.error("No user ID found in localStorage.");
                return;
            }
            // Ensure getPlayerByFkId properly handles async data fetching
            const playerByFkId = await getPlayerByFkId(signInId);
            if (!playerByFkId) {
                console.error("No player found for the given signInId.");
                return;
            }
            const player = {
                playerId: playerByFkId.playerId,
                score: 25,
                signInDTO: playerByFkId.signInDTO
            };

            await score(player); // Ensure score() is awaited if it's async
            console.log("Score submitted successfully!");
        } catch (error) {
            console.error("Error handling score:", error);
        }
    };

    const handleAnswer = (num) => {
        // Prevent answering if game is already decided
        if (gameResult) return;
        console.log(`Selected answer: ${num}, Solution: ${solution}`);

        if (num === solution) {
            gameWin();
            handleScore();
        } else {
            gameLost();
        }
    };

    const handleRetry = () => {
        console.log('Retrying game');
        // Start music if it wasn't playing
        startBackgroundMusic();
        setReloadGame(!reloadGame);
    };

    const handlePause = () => {
        // Only allow pause if game is active
        if (!gameResult) {
            console.log('Game paused');
            setIsPaused(true);
        }
    };

    const handleResume = () => {
        console.log('Game resumed');
        setIsPaused(false);
    };

    const handleMute = () => {
        console.log('Sound muted');
        setIsMuted(true);
    };

    const handleUnmute = () => {
        console.log('Sound unmuted');
        setIsMuted(false);
    };

    // Get appropriate message for result overlay
    const getResultMessage = () => {
        if (gameResult === 'win') {
            return "You Win!";
        } else if (gameResult === 'lose') {
            return "Game Over!";
        }
        return "";
    };

    return (
        <div className='game-play-wrapper'>
            <h1 className='game-play-timer'>Time : 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</h1>
            <div className='game-play-control'>
                {isMuted ? (
                    <div className='game-play-control-content unmute' onClick={handleUnmute} title="Unmute"></div>
                ) : (
                    <div className='game-play-control-content mute' onClick={handleMute} title="Mute"></div>
                )}

                {isPaused ? (
                    <div className='game-play-control-content resume' onClick={handleResume} title="Resume"></div>
                ) : (
                    <div className='game-play-control-content pause' onClick={handlePause} title="Pause"></div>
                )}
                <div className='game-play-control-content retry' onClick={handleRetry} title="Retry"></div>
            </div>

            {isPaused && !gameResult && (
                <div className='game-overlay'>
                    <h2>GAME PAUSED</h2>
                    <button onClick={handleResume}>Resume</button>
                </div>
            )}

            {gameResult && (
                <div className='game-overlay result-overlay'>
                    <h2>{getResultMessage()}</h2>
                    <div className='result-countdown'>{resultCountdown}</div>
                    <p>Redirecting in {resultCountdown} seconds...</p>
                </div>
            )}

            <div className='game-play-content'>
                {isLoadingGame && (
                    <div className='image-loader'>
                        <div className="spinner"></div>
                        <p>Loading puzzle...</p>
                    </div>
                )}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="game puzzle"
                        onLoad={() => setIsImageLoaded(true)}
                        style={{
                            display: isImageLoaded ? 'block' : 'none',
                            filter: (isPaused || gameResult) ? 'blur(5px)' : 'none'
                        }}
                    />
                )}
            </div>
            <div className='game-play-button-panel'>
                {[...Array(10).keys()].map(num => (
                    <button
                        key={num}
                        className='game-play-button'
                        onClick={() => handleAnswer(num)}
                        disabled={!isImageLoaded || isPaused || gameResult}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameComponent;