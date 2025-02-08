import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const LogInComponent = () => {

    const navigate = useNavigate();

    const goToLoadGame = () => navigate('/load');

    return (
        <div className='login-wrapper'>
            <div className='login-wallpaper'>
                <div className='login-card'>
                    <h1 className='login-text'>LogIn</h1>
                    <input type="text" name="username" className="input" placeholder="Username"
                           style={{marginBottom: '20px',marginTop:'20px'}}/>
                    <input type="password" name="password" className="input" placeholder="Password"
                           style={{marginBottom: '40px'}}/>
                    <button className='button' onClick={goToLoadGame}>LogIn</button>
                </div>
            </div>
        </div>
    );
};

export default LogInComponent;