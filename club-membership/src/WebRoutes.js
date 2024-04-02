import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import RegistrationScreen from './pages/RegistrationScreen'
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import ForgotPassword  from './pages/ForgotPassword'; 
import MemberHomePage from './pages/MemberHomePage'; 
import AdminHomePage from './pages/AdminHomePage';

export const WebRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<WelcomeScreen />} />
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={<AdminLogin />} />
                <Route path='/register' element={<RegistrationScreen />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/memberHome' element={<MemberHomePage />} />
                <Route path='/adminHome' element={<AdminHomePage />} />
                <Route path='*' element={<h1>Page not found</h1>} /> {/* Catch all other paths */}
            </Routes>
        </Router>
    );
};
