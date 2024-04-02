import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminHomePage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Here you would clear the login state/session
        console.log('User logged out');
        navigate('/'); // Navigate back to the login or welcome page
    };

    return (
        <div>
            <Navbar />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminHomePage;