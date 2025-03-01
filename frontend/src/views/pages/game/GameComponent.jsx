import React, {useEffect, useRef, useState} from 'react';
import './style.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

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

    // Use refs for timers to easily clear them
    const timerRef = useRef(null);
    const resultTimerRef = useRef(null);
    // Audio refs for sound effects
    const backgroundMusicRef = useRef(null);
    const winSoundRef = useRef(null);
    const loseSoundRef = useRef(null);

    const navigate = useNavigate();

    // Initialize audio
    useEffect(() => {
        // Create audio elements
        backgroundMusicRef.current = new Audio('./../../../assets/game_track.mp3');
        backgroundMusicRef.current.loop = true;
        backgroundMusicRef.current.volume = 0.5;

        winSoundRef.current = new Audio('./../../../assets/CorrectAnswer.mp3');
        loseSoundRef.current = new Audio('./../../../assets/WrongAnswer.mp3');

        // Set preload attribute
        [backgroundMusicRef, winSoundRef, loseSoundRef].forEach(ref => {
            if (ref.current) {
                ref.current.preload = 'auto';
            }
        });

        setAudioInitialized(true);

        return () => {
            // Clean up audio on component unmount
            [backgroundMusicRef, winSoundRef, loseSoundRef].forEach(ref => {
                if (ref.current) {
                    ref.current.pause();
                    ref.current.src = '';
                }
            });
        };
    }, []);

    // Function to play sound that respects mute state
    const playSound = (audioRef) => {
        if (!isMuted && audioRef.current) {
            // Reset the audio to start
            audioRef.current.currentTime = 0;

            // Create a play promise to handle autoplay restrictions
            const playPromise = audioRef.current.play();

            // Handle potential play() promise rejection (happens with autoplay restrictions)
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play failed:", error);
                    // Don't throw error to user, just log it
                });
            }
        }
    };

    // Start background music on user interaction (to get around autoplay restrictions)
    const startBackgroundMusic = () => {
        if (!isMuted && backgroundMusicRef.current && !backgroundMusicRef.current.playing) {
            playSound(backgroundMusicRef);
        }
    };

    const gameWin = () => {
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

    const loadGame = () => {
        // Reset states
        setTimeLeft(60);
        setIsImageLoaded(false);
        setIsPaused(false);
        setGameResult(null);
        setResultCountdown(null);

        // Clear any existing timers
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if (resultTimerRef.current) {
            clearTimeout(resultTimerRef.current);
        }

        axios.get('https://marcconrad.com/uob/banana/api.php?out=json&base64=no')
            .then((response) => {
                setData(response);
                setImageUrl(response.data.question);
                setSolution(response.data.solution);

                // Start background music
                if (audioInitialized && !isPaused && !isMuted) {
                    startBackgroundMusic();
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadGame();

        // Add a one-time click handler to the document to enable audio
        // This is to work around autoplay restrictions in browsers
        const enableAudio = () => {
            startBackgroundMusic();
            document.removeEventListener('click', enableAudio);
        };

        document.addEventListener('click', enableAudio);

        return () => {
            // Clean up timers on unmount
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            if (resultTimerRef.current) {
                clearTimeout(resultTimerRef.current);
            }
            document.removeEventListener('click', enableAudio);
        };
    }, [reloadGame]);

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
            } else if (!isPaused && !gameResult && audioInitialized) {
                startBackgroundMusic();
            }
        }
    }, [isMuted, isPaused, gameResult, audioInitialized]);

    // Effect to handle pause/resume
    useEffect(() => {
        if (backgroundMusicRef.current && audioInitialized) {
            if (isPaused || gameResult) {
                backgroundMusicRef.current.pause();
            } else if (!isMuted) {
                startBackgroundMusic();
            }
        }
    }, [isPaused, gameResult, isMuted, audioInitialized]);

    const handleAnswer = (num) => {
        // Prevent answering if game is already decided
        if (gameResult) return;

        if (num === solution) {
            gameWin();
        } else {
            gameLost();
        }
    };

    const handleRetry = () => {
        // Start music if it wasn't playing
        startBackgroundMusic();
        setReloadGame(!reloadGame);
    };

    const handlePause = () => {
        // Only allow pause if game is active
        if (!gameResult) {
            setIsPaused(true);
        }
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    const handleMute = () => {
        setIsMuted(true);
    };

    const handleUnmute = () => {
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
                {!isImageLoaded && <div className='image-loader'>Loading...</div>}
                <img
                    src={imageUrl}
                    alt="game puzzle"
                    onLoad={() => setIsImageLoaded(true)}
                    style={{
                        display: isImageLoaded ? 'block' : 'none',
                        filter: (isPaused || gameResult) ? 'blur(5px)' : 'none'
                    }}
                />
            </div>
            <div className='game-play-button-panel'>
                {[...Array(10).keys()].map(num => (
                    <button key={num} className='game-play-button' onClick={() => handleAnswer(num)}>{num}</button>
                ))}
            </div>
        </div>
    )
        ;
};

export default GameComponent;