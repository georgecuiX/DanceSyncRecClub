import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link along with useNavigate
import Navbar from '../components/Navbar';
import './Login.css'; 


export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate(); // Create an instance of navigate

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Attempting login with:', credentials);
        // Here you would typically handle the login, e.g., send the credentials to your server
        alert('Successful Login');
        navigate('/memberHome'); // Use useNavigate() hook to redirect after login
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to the WelcomeScreen
    };

    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                {/* Add "Forgot your password?" link */}
                <Link to='/forgotPassword'>Forgot your password?</Link>
                <br />
                <button type="button" onClick={handleBack}>Back</button>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};
