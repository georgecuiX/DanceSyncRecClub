import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistrationScreen from './pages/RegistrationScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import logo from './logo.svg';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <p>Welcome to the Rec Club!</p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Our club is dedicated to bringing together enthusiasts and professionals to share knowledge, network, and collaborate on exciting projects.</p>
          <p>Whether you're looking to learn, share, or lead, there's a place for you here.</p>
        </header>
        {/* Update from Switch to Routes */}
        <Routes>
          <Route path="/register" element={<RegistrationScreen />} />
          <Route path="/" element={<WelcomeScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


