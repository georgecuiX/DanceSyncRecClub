import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hiphop from '../assets/hiphop.png';
import Footer from '../components/Footer';

const WelcomeScreen = () => {
  return (
    <div className=" bg-white w-screen flex flex-col text-center">
      <Navbar />
      <div className=' py-72 flex flex-row w-full bg-gray-600 items-center justify-around'>
        <h1 className=' mt-6 text-white font-bold text-10xl rakkas bg-blue-900 w-full'>REC CLUB</h1>
      </div>
      <div className=' bg-gray-400 py-20 flex justify-between flex-col'>
        <h1 className=' text-8xl text-blue-900 fancy'>Let's GO!</h1>
        <div className='flex flex-row py-24 px-80 justify-evenly items-center'>
          <Link to="/login" className='login-button transition hover:bg-green-900'>
            <p>Member Login</p>
          </Link>
          <Link to="/admin-login" className='login-button transition hover:bg-red-900'>
            <p>Admin Login</p>
          </Link>
        </div>
        <Link to="/register">
          <p className=' text-blue-700 hover:text-blue-500 text-xl'>Create an account</p>
        </Link>
      </div>
      <div className=' w-screen py-36 text-wrap text-left bg-gray-200'>
        <h1 className=' text-center text-6xl text-blue-900 font-bold pb-20 reddit-mono'>Welcome to Rec Club!</h1>
        <div className='flex justify-evenly flex-ro px-36'>
          <p className=' flex text-wrap text-xl flex-2 text-gray-500'>
          At Rec Club, we're all about the joy of dance and the camaraderie of our tight-knit community. Whether you're a seasoned dancer or just starting out, our club offers a welcoming space for everyone to come together and enjoy the rhythm of life.
          <br></br>
          <br></br>
          With weekly practice sessions led by our passionate amateur coach, you'll have the opportunity to improve your skills, learn new moves, and dance the night away in a fun and supportive environment.
          <br></br>
          <br></br>
          Membership at Rec Club is flexible, allowing you to attend practices on your own schedule. Simply show up when it suits you, and pay as you go. For added convenience, members have the option to pay for practices in advance, with discounts available for those who choose to do so.
          <br></br>
          <br></br>
          Our dedicated treasurer ensures that our practice space is always ready for us, handling the monthly rent payments with precision and care. And our coach, while balancing a full-time job, is committed to providing top-notch instruction whenever she's able to join us on the dance floor.
          <br></br>
          <br></br>
          With our app, we keep track of club finances and member attendance, ensuring that everyone stays accountable and that our club can continue to thrive. Plus, we send out friendly reminders about upcoming practices, so you'll never miss a chance to dance!
          <br></br>
          <br></br>
          So come join us at Rec Club, where every step brings us closer together and every beat keeps us moving forward. Let's dance!
          </p>
          <img className=' flex-1 h-1/4 w-auto' src={Hiphop} alt="dancer" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomeScreen;
