import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'; // Ensure you've imported format from date-fns
import { usePractices } from '../pages/PracticeContext';

const PracticeDetails = () => {
    const navigate = useNavigate();
    const { selectedPractice, removePractice, showPopupMessage } = usePractices();

    const handleCancel = () => {
        if (selectedPractice && selectedPractice.id) {
            removePractice(selectedPractice.id);
            showPopupMessage("Practice canceled successfully. Members will be notified."); // Show pop-up message
            navigate('/practiceCalendar'); // Navigate back to the calendar
        }
    };

    // Format startTime and endTime to include AM/PM
    // Use conditional chaining to safely access startTime and endTime
   // Example assuming selectedPractice.date is in 'yyyy-MM-dd' format and time is in 'HH:mm' format
    const practiceDate = selectedPractice?.date || '';
    const startTimeString = `${practiceDate}T${selectedPractice?.startTime}`;
    const endTimeString = `${practiceDate}T${selectedPractice?.endTime}`;

    const startTime = selectedPractice ? format(new Date(startTimeString), 'p') : '';
    const endTime = selectedPractice ? format(new Date(endTimeString), 'p') : '';
    
    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Practice Details</h1>
            {selectedPractice ? (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-lg text-gray-600"><span className="font-bold">Date:</span> {selectedPractice.date}</p>
                    <p className="text-lg text-gray-600"><span className="font-bold">Time:</span> From {startTime} to {endTime}</p>
                    <p className="text-lg text-gray-600 mb-4"><span className="font-bold">Coach:</span> {selectedPractice.coach}</p>
                    <button 
                        onClick={handleCancel} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
                    >
                        Cancel Practice
                    </button>
                </div>
            ) : (
                <p className="text-gray-600 text-lg">No practice details available.</p>
            )}
            <button 
                onClick={() => navigate('/practiceCalendar')} 
                className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
            >
                Back to Calendar
            </button>
        </div>
    );
};

export default PracticeDetails;

