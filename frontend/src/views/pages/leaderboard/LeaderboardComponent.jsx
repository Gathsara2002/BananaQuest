import React from 'react';
import './style.css';

const LeaderboardComponent = () => {
    return (
        <div className='leaderboard-wrapper'>
            <div className='leaderboard-bg-image'>
                <div className='leaderboard-content'>
                    <h3 className='leaderboard-topic'>LEADERBOARD</h3>
                </div>
            </div>
            <div className='leaderboard-buttons'>
                <div className='home-btn'></div>
            </div>
        </div>
    );
};

export default LeaderboardComponent;