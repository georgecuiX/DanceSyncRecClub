import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/index.css'
import Footer from '../components/Footer';
import Payment from '../assets/payment.png'

const MemberHomePage = () => {

    return (
        <div className="h-screen bg-stone-200 overflow-hidden">
            <Navbar />
            <div className='flex flex-col mt-8'>
                <div className="grid grid-flow-row grid-cols-3 w-full justify-items-center gap-y-16 px-40">
                    <Link to="/schedulePractice" className="feature-box">
                        Schedule Practice
                        <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678116-calendar-512.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/practiceCalendar" className="feature-box">
                        Upcoming Practices
                        <img src="https://cdn-icons-png.flaticon.com/512/6117/6117275.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/paymentStatus" className="feature-box">
                        Payment Status and Options
                        <img src={Payment} alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/attendance" className="feature-box">
                        Attendance
                        <img src="https://cdn-icons-png.flaticon.com/512/8999/8999099.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/notifications" className="feature-box">
                        Notifications and Reminders
                        <img src="https://static-00.iconduck.com/assets.00/notification-icon-1842x2048-xr57og4y.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/" className="feature-box">
                        Log Out
                        <img src="https://static-00.iconduck.com/assets.00/logout-1-icon-2048x2048-dsthju9g.png" alt="icon" className='feature-icon' />
                    </Link>
                </div>
                <div className='absolute bottom-0'>
                    <Footer />
                </div>
            </div>
        </div>
    );
};


export default MemberHomePage;
