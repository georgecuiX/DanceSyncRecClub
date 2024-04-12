import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isToday } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { usePractices } from './PracticeContext'
import { useUser } from './UserContext';

const PracticeCalendar = ({ practiceDates = [] }) => {
  const { practices, selectPractice, showPopup, popupMessage } = usePractices();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useUser();

  const startMonth = startOfWeek(startOfMonth(currentMonth));
  const endMonth = endOfWeek(endOfMonth(currentMonth));
  const daysArray = eachDayOfInterval({ start: startMonth, end: endMonth });

  const isPracticeDay = (day) => practices.some((practice) => practice.date === format(day, 'yyyy-MM-dd'));

  const handleBack = () => {
    // Conditional navigation based on the user's role
    if (user.role === 'member') {
      navigate('/schedulePractice');
    } else if (user.role === 'coach') {
      navigate('/coach');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate(-1); // Default back navigation
    }
  };

  const handleDayClick = (day) => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const practicesForDay = practices.filter(practice => format(new Date(practice.date), 'yyyy-MM-dd') === formattedDay);

    if (practicesForDay.length > 0) {
      selectPractice(practicesForDay); // Update context with the practices for the selected day
      navigate('/practiceDetails'); // Assumes you have a route set up for this
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {showPopup && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-3 px-6 text-center z-50">
                    {popupMessage}
                </div>
      )}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-12">
          <div className="flex items-center justify-between py-4 px-6">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-gray-600 hover:text-gray-800 transition text-lg">
              Previous
            </button>
            <span className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</span>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-gray-600 hover:text-gray-800 transition text-lg">
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-md font-semibold text-center">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3 p-4 text-lg">
            {daysArray.map((day, i) => {
              const formattedDay = format(day, 'yyyy-MM-dd');
              const practiceForDay = practices.find(practice => practice.date === formattedDay);
              const practiceScheduled = isPracticeDay(day); 
  
              return (
                <div
                key={i} 
                className={`h-32 flex flex-col justify-between p-3 text-center rounded-lg border border-gray-200 ${isSameMonth(day, currentMonth) ? 'text-gray-700' : 'text-gray-400'} ${isToday(day) ? 'bg-blue-200' : 'bg-gray-50'} ${practiceScheduled ? 'bg-green-300 cursor-pointer' : ''}`}
                onClick={() => practiceScheduled && handleDayClick(day)} // Only handle clicks if there's a practice
              >
                <span className="font-bold">{format(day, 'd')}</span>
                {practiceForDay && (
                  <button 
                    type="button" 
                    className="text-xs text-white bg-blue-500 rounded px-2 py-1 self-center"
                    onClick={(e) => {
                      e.stopPropagation();
                        selectPractice(practiceForDay); // Use the selectPractice method from context
                        navigate('/practiceDetails'); // Navigate to the details page
                      }}
                    >
                      Practice
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-4">
            <button type="button" className='px-4 py-2 rounded-xl bg-slate-400 border hover:bg-slate-500 transition text-sm' onClick={handleBack}>Back</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};  
  
export default PracticeCalendar;


