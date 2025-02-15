import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const LostComponent = () => {

    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/load')
    }

    return (
        <div className='lost-wrapper'>
            <div className='lost-bg-image'></div>
            <div className='lost-buttons'>
                <div className='home-btn' onClick={goToMenu}></div>
            </div>
        </div>
    );
};

export default LostComponent;