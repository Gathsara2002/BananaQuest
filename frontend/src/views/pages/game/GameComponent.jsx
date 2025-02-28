import React, {useEffect, useState} from 'react';
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

    const navigate = useNavigate();

    const gameWin = () => {
        navigate('/win');
    };

    const gameLost = () => {
        navigate('/lost');
    };

    const loadGame = () => {
        setTimeLeft(60);
        setIsImageLoaded(false);

        axios.get('https://marcconrad.com/uob/banana/api.php?out=json&base64=no')
            .then((response) => {
                setData(response);
                setImageUrl(response.data.question);
                setSolution(response.data.solution);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    useEffect(() => {
        loadGame();
    }, [reloadGame]);

    useEffect(() => {
        let timer;
        if (isImageLoaded && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            gameLost();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timeLeft, isImageLoaded]);

    const handleAnswer = (num) => {
        if (num === solution) {
            gameWin();
        } else {
            gameLost();
        }
    };

    const handleRetry = () => {
        setReloadGame(!reloadGame);
    };

    return (
        <div className='game-play-wrapper'>
            <h1 className='game-play-timer'>Time : 00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</h1>
            <div className='game-play-control'>
                <div className='game-play-control-content mute'></div>
                <div className='game-play-control-content pause'></div>
                <div className='game-play-control-content resume'></div>
                <div className='game-play-control-content retry' onClick={handleRetry}></div>
            </div>
            <div className='game-play-content'>
                {!isImageLoaded && <div className='image-loader'>Loading...</div>}
                <img src={imageUrl} alt="game puzzle" onLoad={() => setIsImageLoaded(true)}
                     style={{display: isImageLoaded ? 'block' : 'none'}}/>
            </div>
            <div className='game-play-button-panel'>
                {[...Array(10).keys()].map(num => (
                    <button key={num} className='game-play-button' onClick={() => handleAnswer(num)}>{num}</button>
                ))}
            </div>
        </div>
    );
};

export default GameComponent;