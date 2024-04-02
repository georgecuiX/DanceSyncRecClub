import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeScreen.css'; // Import the CSS file

const WelcomeScreen = () => {
  return (
    <div className="welcomeScreen">
      <h1>Welcome to Our Club!</h1>
      <p>Select one of the following to proceed</p>
      <div>
        <Link to="/register">
          <button>Register for a New Account</button>
        </Link>
        {/* Add Log in as a Member button */}
        <Link to="/login-member">
          <button>Log in as a Member</button>
        </Link>
        {/* Add Log in as an Admin button */}
        <Link to="/login-admin">
          <button>Log in as an Admin</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
