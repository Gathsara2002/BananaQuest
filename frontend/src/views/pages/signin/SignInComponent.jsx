import React from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";

const SignInComponent = () => {

    const navigate = useNavigate();

    const loginGame= () => navigate('/login');

    return (
        <div className='signin-wrapper'>
            <div className='signin-wallpaper'>
                <div className='signin-card'>
                    <h1 className='signin-text'>SignIn</h1>
                    <input type="text" name="email" className="input" placeholder="Email"
                           style={{marginBottom: '20px', marginTop: '10px'}}/>
                    <input type="text" name="username" className="input" placeholder="Username"
                           style={{marginBottom: '20px'}}/>
                    <input type="password" name="password" className="input" placeholder="Password"
                           style={{marginBottom: '20px'}}/>
                    <button className='button' onClick={loginGame}>SignIn</button>
                    <p className='login-link'>Already have an account <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;