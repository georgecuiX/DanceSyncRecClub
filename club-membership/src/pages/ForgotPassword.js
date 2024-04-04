import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
        <div className='h-screen overflow-hidden'>
            <Navbar />
            <div className='flex flex-col items-center bg-gray-700 h-full'>
                <form onSubmit={handleSubmit} className="flex flex-col bg-white p-10 rounded-2xl px-28 py-16 mt-20">
                    <div className='flex-1 flex flex-row w-full mb-8'>
                        <h1 className='font-semibold text-xl bg-amber-100 py-1 px-2 reddit-mono'>Update Password.</h1>
                    </div>
                    <label>
                        <input 
                        className=' w-96 h-12 rounded-2xl px-5 border-black focus:outline-none bg-blue-100'
                        type="text" 
                        name="username" 
                        placeholder='Username' 
                        value={formData.username} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <br />
                    <label>
                    <input 
                        className=' w-96 h-12 rounded-2xl px-5 border-black focus:outline-none bg-blue-100'
                        type="email" 
                        name="email" 
                        placeholder='Email' 
                        value={formData.email} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <br />
                    <label>
                        <input 
                        className=' w-96 h-12 rounded-2xl px-5 border-black focus:outline-none bg-blue-100'
                        type="password" 
                        name="newPassword" 
                        placeholder='New Password' 
                        value={formData.newPassword} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <br />
                    <label>
                        <input 
                        className=' w-96 h-12 rounded-2xl px-5 border-black focus:outline-none bg-blue-100'
                        type="password" 
                        name="newPassword" 
                        placeholder='Confirm New Password' 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required />
                    </label>
                    <br />
                    <div className='flex justify-center'>
                        <button type="button" className='px-4 py-4 rounded-xl bg-slate-400 border w-1/5 hover:bg-slate-500 transition' onClick={handleBack}>⬅</button>
                        <button type="submit" className='px-6 py-4 rounded-xl bg-yellow-300 border ml-20 hover:bg-green-200 transition'>Update Password</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
