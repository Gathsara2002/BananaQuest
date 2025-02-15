import React from 'react';
import "./style.css";
import {useNavigate} from "react-router-dom";

const WinComponent = () => {

    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/load')
    }

    const goToNextLevel = () => {
        navigate('/game')
    }

    return (
        <div className='win-wrapper'>
            <div className='win-bg-image'></div>
            <div className='win-buttons'>
                <div className='next-btn' onClick={goToNextLevel}></div>
                <div className='home-btn' onClick={goToMenu}></div>
            </div>
        </div>
    );
};

export default WinComponent;