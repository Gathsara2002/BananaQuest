import React, {useState} from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../../service/SignInService.js";

const LogInComponent = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const loginDetails = {
            email,
            password
        };
        console.log('login details:', loginDetails);
        loginUser(loginDetails)
            .then(response => {
                console.log('Login successful:', response);
                navigate('/load');
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('Login failed. Please try again.');
            });
    };

    return (
        <div className='login-wrapper'>
            <div className='login-wallpaper'>
                <div className='login-card'>
                    <h1 className='login-text'>LogIn</h1>
                    <input
                        type="text"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{marginBottom: '20px', marginTop: '20px'}}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{marginBottom: '40px'}}
                    />
                    <button className='button' onClick={handleLogin}>LogIn</button>
                </div>
            </div>
        </div>
    );
};

export default LogInComponent;