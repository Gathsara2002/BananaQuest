import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const CreditComponent = () => {

    const navigate = useNavigate();

    const goToMenu = () => {
        navigate('/load')
    }

    return (
        <div className='credit-wrapper'>
            <div className='credit-bg-image'>
                <div className='lost-buttons'>
                    <div className='home-btn' onClick={goToMenu}></div>
                </div>
            </div>
        </div>
    );
};

export default CreditComponent;