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
                    <div className='leaderboard-score-container'>
                        <div className='leaderboard-score-row'>
                            <div className='leaderboard-score-rank'>1</div>
                            <div className='leaderboard-score-user'>Gathsara</div>
                            <div className='leaderboard-score-point'>1000</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='leaderboard-buttons'>
                <div className='home-btn' onClick={goToMenu}></div>
            </div>
        </div>
    );
};

export default LeaderboardComponent;