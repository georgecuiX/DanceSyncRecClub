import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css'; 

export const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate(); // Step 2: Create an instance of navigate

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
        alert('Succesful Login');
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to the WelcomeScreen
    };

    return (
        <div>
            <h1>Welcome to the Admin Login Page</h1>
            <p>Enter your username and password to proceed</p>
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
                <Link to='/forgotPassword'>Forgot your password?</Link>
                <br />
                <button type="button" onClick={handleBack}>Back</button> {}
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};