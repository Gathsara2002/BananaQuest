import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const PlayComponent = () => {

    const navigate = useNavigate();

    const playGame = () => {
        navigate('/game')
    }

    return (
        <div className='play-wrapper'>
            <div className='play-wallpaper'>
                <div className='play-card'>
                    <h1 className='play-text'>Play Game</h1>
                    <button className='button' style={{marginBottom: '20px'}} onClick={playGame}>Load Game</button>
                    <button className='button' style={{marginBottom: '20px'}}>Leaderboard</button>
                    <button className='button' style={{marginBottom: '20px'}}>Quit Game</button>
                    <button className='button'>Credits</button>
                </div>
            </div>
        </div>
    );
};

export default PlayComponent;