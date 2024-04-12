import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import RegistrationScreen from './pages/RegistrationScreen';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import ForgotPassword from './pages/ForgotPassword';
import MemberHomePage from './pages/MemberHomePage';
import AdminHomePage from './pages/AdminHomePage';
import SchedulePractice from './pages/SchedulePractice';
import PracticeCalendar from './pages/PracticeCalendar';
import PracticeDetails from './pages/PracticeDetails';
import CoachHomePage from './pages/CoachHomePage';
import { CoachLogin } from './pages/CoachLogin';
import CommunicationCenter from './pages/CommunicationCenter';
import Notifications from './pages/Notifications';
import CoachCommunication from './pages/CoachCommunication';
import { PracticeProvider } from './pages/PracticeContext';
import { UserProvider } from './pages/UserContext'; // Import the UserProvider
import MemberManagement from './pages/MemberManagement';
import MemberPayment from './pages/MemberPayment';
import Attendance from './pages/Attendance';

export const WebRoutes = () => {
    return (
        <UserProvider> {/* Wrap everything with UserProvider to handle user data globally */}
            <PracticeProvider> {/* Practice data management within UserProvider */}
                <Router>
                    <Routes>
                        <Route path='/' element={<WelcomeScreen />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/admin-login' element={<AdminLogin />} />
                        <Route path='/register' element={<RegistrationScreen />} />
                        <Route path='/forgot' element={<ForgotPassword />} />
                        <Route path='/member' element={<MemberHomePage />} />
                        <Route path='/admin' element={<AdminHomePage />} />
                        <Route path='/schedulePractice' element={<SchedulePractice />} />
                        <Route path='/practiceCalendar' element={<PracticeCalendar />} />
                        <Route path='/practiceDetails' element={<PracticeDetails />} />
                        <Route path='/coach-login' element={<CoachLogin />} />
                        <Route path='/coach' element={<CoachHomePage />} />
                        <Route path='/communication' element={<CommunicationCenter />} />
                        <Route path='/notifications' element={<Notifications />} />
                        <Route path='/coach-communication' element={<CoachCommunication />} />
                        <Route path='/member-management' element={<MemberManagement />} />
                        <Route path='/member-payment' element={<MemberPayment />} />
                        <Route path='/attendance' element={<Attendance />} />
                        <Route path='*' element={
                        <div className=' overflow-y-hidden h-screen bg-black text-3xl text-white reddit-mono'>
                            <h1>Page not found</h1>
                            <img className='w-full h-64' src='https://www.icegif.com/wp-content/uploads/2022/01/icegif-962.gif' alt='error'/>
                            <img className='w-full h-64' src='https://alphaomegaarmament.com/wp-content/uploads/2024/03/How-LeBron-James-became-a-TikTok-meme-%E2%80%98You-Are-My-Sunshine-5.webp' alt='error'/>
                            <img className='w-full h-64' src='https://neonmusic.online/wp-content/uploads/2024/04/444-10-7.jpg' alt='error'/>
                            <img className=' w-full h-64' src='https://i.kym-cdn.com/entries/icons/facebook/000/034/772/Untitled-1.jpg' alt='error'/>
                        </div>} /> {/* Catch all other paths */}
                    </Routes>
                </Router>
            </PracticeProvider>
        </UserProvider>
    );
};