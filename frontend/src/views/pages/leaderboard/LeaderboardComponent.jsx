import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const LeaderboardComponent = () => {

    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/load')
    }

    return (
        <div className='leaderboard-wrapper'>
            <div className='leaderboard-bg-image'>
                <div className='leaderboard-content'>
                    <h3 className='leaderboard-topic'>LEADERBOARD</h3>
                </div>
            </div>
            <div className='leaderboard-buttons'>
                <div className='home-btn' onClick={goToMenu}></div>
            </div>
        </div>
    );
};

export default LeaderboardComponent;