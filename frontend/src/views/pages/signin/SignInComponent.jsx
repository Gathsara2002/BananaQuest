import React, {useState} from 'react';
import './style.css';
import {useNavigate} from "react-router-dom";
import {signInUser} from "./../../../service/SignInService.js";
import {Slide, toast, ToastContainer} from "react-toastify";

const SignInComponent = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        const userDetails = {
            email,
            username,
            password
        };
        console.log('Sign-in details:', userDetails);
        signInUser(userDetails)
            .then(response => {
                console.log('Sign-in successful:', response);
                navigate('/login');
            })
            .catch(error => {
                console.error('Sign-in failed:', error);
                toast.error('🎉 Sign-in unsuccessful!', {
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
        <div className='signin-wrapper'>
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
            <div className='signin-wallpaper'>
                <div className='signin-card'>
                    <h1 className='signin-text'>SignIn</h1>
                    <input
                        type="text"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{marginBottom: '20px', marginTop: '10px'}}
                    />
                    <input
                        type="text"
                        name="username"
                        className="input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{marginBottom: '20px'}}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{marginBottom: '20px'}}
                    />
                    <button className='button' onClick={handleSignIn}>SignIn</button>
                    <p className='login-link'>Already have an account <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;
