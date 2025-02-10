import React, {useEffect, useState} from 'react';
import './style.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const GameComponent = () => {

    const [data, setData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [solution, setSolution] = useState(0);

    const navigate = useNavigate();

    const gameWin = () => {
        navigate('/win')
    }

    useEffect(() => {
        axios.get('https://marcconrad.com/uob/banana/api.php?out=json&base64=no')
            .then((response) => {
                setData(response);
                setImageUrl(response.data.question);
                setSolution(response.data.solution);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    console.log(data);
    console.log(imageUrl);
    console.log(solution)

    return (
        <div className='game-play-wrapper'>
            <h1 className='game-play-timer'>Time : 00.44</h1>
            <div className='game-play-control'>
                <div className='game-play-control-content mute'></div>
                <div className='game-play-control-content pause'></div>
                <div className='game-play-control-content resume'></div>
                <div className='game-play-control-content retry'></div>
            </div>
            <div className='game-play-content'>
                <img src={imageUrl} alt="error"/>
            </div>
            <div className='game-play-button-panel'>
                <button className='game-play-button' onClick={gameWin}>0</button>
                <button className='game-play-button'>1</button>
                <button className='game-play-button'>2</button>
                <button className='game-play-button'>3</button>
                <button className='game-play-button'>4</button>
                <button className='game-play-button'>5</button>
                <button className='game-play-button'>6</button>
                <button className='game-play-button'>7</button>
                <button className='game-play-button'>8</button>
                <button className='game-play-button'>9</button>
            </div>
        </div>
    );
};

export default GameComponent;