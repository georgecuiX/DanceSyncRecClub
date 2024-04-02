import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Passwords don't match.");
            return;
        }
        console.log('Reset password request for:', formData);
        // Here you would handle the password reset request
        // e.g., send the formData to your server for verification and password update
        alert('Your password has been updated.');
        navigate('/'); // Navigate back to the login page
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to the WelcomeScreen
    };

    return (
        <div>
            <h1>Reset Your Password</h1>
            <p>Please enter your username and email address to reset your password.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Confirm New Password:
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="button" onClick={handleBack}>Back</button> {}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
