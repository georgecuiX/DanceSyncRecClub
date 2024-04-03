import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/index.css'

const AdminHomePage = () => {

    return (
        <div className="p-5">
            <Navbar />
            <div className="space-y-2">
                <Link to="/financial" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Financial Management and Reporting
                </Link>
                <Link to="/memberMangagement" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Member Management
                </Link>
                <Link to="/practiceScheduler" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Practice Scheduler and Calendar
                </Link>
                <Link to="/userManagement" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    User Role Management
                </Link>
                <Link to="/messageSender" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Communication Center
                </Link>
                <Link to="/" className="block p-4 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
                    Log Out
                </Link>
            </div>
        </div>
    );
};


export default AdminHomePage;