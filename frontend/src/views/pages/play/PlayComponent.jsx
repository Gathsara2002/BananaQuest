import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const PlayComponent = () => {

    const navigate = useNavigate();

    const playGame = () => {
        navigate('/game')
    }

    const goToLeaderboard = () => {
        navigate('/leaderboard')
    }

    const logOut = () => {
        navigate('/login')
    }

    return (
        <div className='play-wrapper'>
            <div className='play-wallpaper'>
                <div className='play-card'>
                    <h1 className='play-text'>Play Game</h1>
                    <button className='button' style={{marginBottom: '20px'}} onClick={playGame}>Load Game</button>
                    <button className='button' style={{marginBottom: '20px'}} onClick={goToLeaderboard}>Leaderboard</button>
                    <button className='button' style={{marginBottom: '20px'}} onClick={logOut}>Log Out</button>
                    <button className='button'>Credits</button>
                </div>
            </div>
        </div>
    );
};

export default PlayComponent;