import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/index.css'

const MemberHomePage = () => {

    return (
        <div className="p-5">
            <Navbar />
            <div className="space-y-2">
                <Link to="/schedule" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Upcoming Practices
                </Link>
                <Link to="/paymentStatus" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Payment Status and Options
                </Link>
                <Link to="/attendance" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Attendance
                </Link>
                <Link to="/profileManagement" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    User Profile Management
                </Link>
                <Link to="/notifications" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Notifications and Reminders
                </Link>
                <Link to="/" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Log Out
                </Link>
            </div>
        </div>
    );
};


export default MemberHomePage;
