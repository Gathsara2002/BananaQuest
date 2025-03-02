import React, {useEffect, useState} from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";
import {getAllPlayers} from "../../../service/PlayerService.js";

const LeaderboardComponent = () => {
    const [players, setPlayers] = useState([]);

    const fetchPlayers = async () => {
        try {
            const data = await getAllPlayers();
            const sortedPlayers = data.result.sort((a, b) => b.score - a.score);
            setPlayers(sortedPlayers);
        } catch (error) {
            console.error('Players Loading Error:', error.message);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/load');
    }

    return (
        <div className='leaderboard-wrapper'>
            <div className='leaderboard-bg-image'>
                <div className='leaderboard-content'>
                    <h3 className='leaderboard-topic'>LEADERBOARD</h3>
                    <div className='leaderboard-score-container'>
                        {players && players.length > 0 ? (
                            players.map((player, index) => (
                                <div key={player.id || index} className='leaderboard-score-row'>
                                    <div className='leaderboard-score-rank'>{index + 1}</div>
                                    <div className='leaderboard-score-user'>{player.signIn.username}</div>
                                    <div className='leaderboard-score-point'>{player.score}</div>
                                </div>
                            ))
                        ) : (
                            <div className='leaderboard-score-row'>
                                <div className='leaderboard-score-user'>No players available</div>
                            </div>
                        )}
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