import React from 'react';
import './style.css';

const PlayComponent = () => {
    return (
        <div className='play-wrapper'>
            <div className='play-wallpaper'>
                <div className='play-card'>
                    <h1 className='play-text'>Play Game</h1>
                    <button className='button' style={{marginBottom: '20px'}}>Load Game</button>
                    <button className='button' style={{marginBottom: '20px'}}>Leaderboard</button>
                    <button className='button' style={{marginBottom: '20px'}}>Quit Game</button>
                    <button className='button'>Credits</button>
                </div>
            </div>
        </div>
    );
};

export default PlayComponent;