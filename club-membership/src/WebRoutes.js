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
                <Route path='/admin-login' element={<AdminLogin />} />
                <Route path='/register' element={<RegistrationScreen />} />
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/member' element={<MemberHomePage />} />
                <Route path='/admin' element={<AdminHomePage />} />
                <Route path='*' element={<h1>Page not found</h1>} /> {/* Catch all other paths */}
            </Routes>
        </Router>
    );
};
