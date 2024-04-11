import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes, startOfDay } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { usePractices } from './PracticeContext'

// Assuming you've got the list of coaches as before
// CHANGE THIS WHEN DATABASE OF COACHES IS CREATED
const coaches = [
  { id: 1, name: 'Coach Carter' },
  { id: 2, name: 'Coach Taylor' },
  { id: 3, name: 'Coach Dale' },
  { id: 4, name: 'Coach Bombay' },
];

const SchedulePractice = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(setHours(setMinutes(new Date(), 0), 8));
  const [endTime, setEndTime] = useState(setHours(setMinutes(new Date(), 0), 9)); // Initialize to one hour later as an example
  const [selectedCoach, setSelectedCoach] = useState('');
  const { addPractice } = usePractices();

  // Handling changes in date, start time, end time, and selected coach
  const handleDateChange = (date) => setSelectedDate(date);
  const handleStartTimeChange = (time) => setStartTime(time);
  const handleEndTimeChange = (time) => setEndTime(time);
  const handleCoachChange = (e) => setSelectedCoach(e.target.value);
  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validation checks
    if (!selectedDate || !startTime || !endTime || !selectedCoach) {
      alert("Please fill in all the fields.");
      return;
    }
  
    if (startTime >= endTime) {
      alert("The start time must be before the end time.");
      return;
    }

    addPractice({
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime: format(startTime, 'HH:mm'),
      endTime: format(endTime, 'HH:mm'),
      coach: selectedCoach
    });
  
    // Show the pop-up notification
    setShowPopup(true);
  
    // Optionally hide the popup after a few seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 5000); // Show popup for 5 seconds
  
    console.log(`Practice scheduled on: ${format(selectedDate, 'PPP')} from ${format(startTime, 'p')} to ${format(endTime, 'p')} with ${selectedCoach}`);
    // Here, you would typically proceed with backend integration or further state updates
  };  
  
  // In your form, add the required attribute to the <select> element for coach selection
  <select
    value={selectedCoach}
    onChange={handleCoachChange}
    required  // Make selection mandatory
    className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select a Coach</option>
    {coaches.map((coach) => (
      <option key={coach.id} value={coach.name}>{coach.name}</option>
    ))}
  </select>
  

  const navigate = useNavigate(); // Create an instance of navigate

  const handleBack = () => {
    navigate('/admin'); // Navigate back to the WelcomeScreen
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="mt-12 flex flex-col items-center justify-center">
        {/* Popup Notification */}
        {showPopup && (
        <div className="absolute top-20 bg-green-500 text-white py-2 px-4 rounded-lg z-10">
            <p>Practice scheduled successfully!</p>
            <p>Date: {format(selectedDate, 'PPP')}</p>
            <p>Time: From {format(startTime, 'p')} to {format(endTime, 'p')}</p>
            <p>Coach: {selectedCoach}</p>
        </div>
        )}
        <h2 className="text-2xl font-bold mb-4">Schedule Practice</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          {/* Date Picker */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Practice Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()} // Disallow past dates
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Start Time Picker */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Starting Time:</label>
            <DatePicker
              selected={startTime}
              onChange={handleStartTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30} // Time slots every hour
              minTime={setHours(setMinutes(startOfDay(new Date()), 0), 8)} // Starting at 8 AM
              maxTime={setHours(setMinutes(startOfDay(new Date()), 0), 22)} // Up to 10 PM for starting time
              dateFormat="h:mm aa"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* End Time Picker */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Ending Time:</label>
            <DatePicker
              selected={endTime}
              onChange={handleEndTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30} // Time slots every hour
              minTime={setHours(setMinutes(startOfDay(new Date()), 0), 9)} // Starting at 9 AM
              maxTime={setHours(setMinutes(startOfDay(new Date()), 0), 23)} // Up to 11 PM for ending time
              dateFormat="h:mm aa"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Coach Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Coach:</label>
            <select
              value={selectedCoach}
              onChange={handleCoachChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a Coach</option>
              {/* CHANGE THIS WHEN DATABASE OF COACHES IS ADDED*/}
              {coaches.map((coach) => (
                <option key={coach.id} value={coach.name}>{coach.name}</option>
              ))}
            </select>
          </div>
          <button type="button" className='px-4 py-4 rounded-xl bg-slate-400 border w-1/5 hover:bg-slate-500 transition' onClick={handleBack}>⬅</button>
          <button type="submit" className='px-6 py-4 rounded-xl bg-yellow-300 border w-1/3 ml-20 hover:bg-green-200 transition'>Schedule</button>
          <div className="flex justify-center w-full mt-4">
            <Link to="/practiceCalendar" className="text-blue-700 hover:text-blue-500 text-xl mr-4">
                View Calendar
            </Link>
            </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePractice;







