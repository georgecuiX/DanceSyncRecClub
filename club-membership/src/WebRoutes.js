import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import { Login } from './pages/Login';

export const WebRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Main />} /> {/* Use element prop to render Main component */}
                <Route path='/login' element={<Login />} /> {/* Use element prop to render Login component */}
                <Route path='*' element={<h1>Page not found</h1>} /> {/* Catch all other paths */}
            </Routes>
        </Router>
    );
};
