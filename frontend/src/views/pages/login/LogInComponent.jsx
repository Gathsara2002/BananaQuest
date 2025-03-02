import React, {useState} from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../../service/SignInService.js";
import {Slide, toast, ToastContainer} from "react-toastify";

const LogInComponent = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const loginDetails = {
            email,
            password
        };
        loginUser(loginDetails)
            .then(response => {
                console.log('Login successful:', response);
                toast.error('Login successful!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
                navigate('/load');
            })
            .catch(error => {
                console.log(error);
                toast.error('Login failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                });
            });
    };

    return (
        <div className='login-wrapper'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
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