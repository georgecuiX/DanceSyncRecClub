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
import { PracticeProvider } from './pages/PracticeContext'; 
import PracticeDetails from './pages/PracticeDetails';

export const WebRoutes = () => {
    return (
        <PracticeProvider> {/* Wrap Router with PracticeProvider */}
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
                    <Route path='*' element={<h1>Page not found</h1>} /> {/* Catch all other paths */}
                </Routes>
            </Router>
        </PracticeProvider>
    );
};

