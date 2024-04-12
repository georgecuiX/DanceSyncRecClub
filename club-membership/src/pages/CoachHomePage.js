import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/index.css'
import Footer from '../components/Footer';
import Communication from '../assets/communications.png'

const CoachHomePage = () => {

    return (
        <div className="h-screen bg-stone-200 overflow-hidden">
            <Navbar />
            <div className='flex flex-col mt-8'>
                <div className="grid grid-flow-row grid-cols-3 w-full justify-items-center gap-y-16 px-40">
                    <Link to="/schedule" className="feature-box">
                        Upcoming Practices
                        <img src="https://cdn-icons-png.flaticon.com/512/6117/6117275.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/memberMangagement" className="feature-box">
                        Member Management
                        <img src="https://static-00.iconduck.com/assets.00/member-icon-2048x2048-ia0jy9lz.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/userManagement" className="feature-box">
                        User Role Management
                        <img src="https://cdn-icons-png.flaticon.com/512/5151/5151145.png" alt="icon" className='feature-icon' />
                    </Link>
                    <Link to="/coach-communication" className="feature-box">
                        Communication Center
                        <img src={Communication} alt="icon" className='feature-icon' />
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


export default CoachHomePage;