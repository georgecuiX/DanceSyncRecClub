import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WelcomeScreen = () => {
  return (
    <div className=" bg-white pb-52 w-screen flex flex-col text-center ">
      <Navbar />
      <div className=' py-72 flex flex-row w-full bg-gray-700 items-center justify-around'>
        <h1 className=' mt-6 text-white font-bold text-10xl bubblegum'>REC CLUB</h1>
      </div>
      <div className=' bg-gray-300 h-screen'>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <Link to="/login">
          <button>Member Login</button>
        </Link>
        <Link to="/admin">
          <button>Admin Login</button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeScreen;
