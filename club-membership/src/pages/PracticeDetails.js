import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import { usePractices } from '../pages/PracticeContext';
import { useUser } from '../pages/UserContext';

const PracticeDetails = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { selectedPractice, removePractice, showPopupMessage, assignCoach, updateMembers } = usePractices();
    const [coaches, setCoaches] = useState([]);
    const [members, setMembers] = useState([]);
    
    useEffect(() => {
        if (user.role === 'admin') {
            axios.get('http://localhost:3001/coachs')
                .then(response => {
                    console.log(response.data); // Log to check the response data
                    setCoaches(response.data);
                })
                .catch(error => {
                    console.error('Failed to fetch coaches:', error);
                });
        }
        if (user.role === 'coach') {
            axios.get('http://localhost:3001/members')
                .then(response => setMembers(response.data))
                .catch(error => console.error('Failed to fetch members:', error));
        }
    }, [user.role]);
    

    const handleCancel = () => {
        if (selectedPractice && selectedPractice.id) {
            removePractice(selectedPractice.id);
            showPopupMessage("Practice canceled successfully. Members will be notified.");
            navigate('/practiceCalendar');
        }
    };

    // Function to handle coach assignment
    const handleAssignCoach = (coachUsername) => {
        if (selectedPractice) {
            assignCoach(selectedPractice.id, coachUsername);
            showPopupMessage(`Coach ${coachUsername} assigned successfully.`);
            navigate('/practiceCalendar');
        } else {
            console.log("No selected practice available for assignment.");
        }
    };

    const handleMemberUpdate = (memberUsername, add = true) => {
        let updatedMembers = selectedPractice.members || [];
        if (add) {
            // Add member if not already included
            if (!updatedMembers.includes(memberUsername)) {
                updatedMembers.push(memberUsername);
                showPopupMessage(`Member ${memberUsername} added to practice.`);
            }
        } else {
            // Remove member
            updatedMembers = updatedMembers.filter(member => member !== memberUsername);
            showPopupMessage(`Member ${memberUsername} removed from practice.`);
        }
        updateMembers(selectedPractice.id, updatedMembers);
        navigate('/practiceCalendar');
    };


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
                    <ul>
                        {selectedPractice.members && selectedPractice.members.map(member => (
                            <li key={member} className="flex justify-between items-center">
                                {member}
                                <button onClick={() => handleMemberUpdate(member, false)} className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button 
                        onClick={handleCancel} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
                    >
                        Cancel Practice
                    </button>
                    {user.role === 'admin' && (
                        <>
                            <select onChange={(e) => assignCoach(e.target.value)} className="ml-4 bg-white border border-gray-300 rounded shadow">
                                <option>Select a coach</option>
                                {coaches.map((coach, index) => (
                                    <option key={index} value={coach.username}>{coach.username}</option>
                                ))}
                            </select>
                            <button 
                                onClick={() => handleAssignCoach(document.querySelector('select').value)}
                                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                            >
                                Assign Coach
                            </button>
                        </>
                    )}
                    {user.role === 'coach' && (
                        <>
                            <select onChange={(e) => updateMembers(e.target.value)} className="ml-4 bg-white border border-gray-300 rounded shadow">
                                <option>Select a member</option>
                                {members.map((member, index) => (
                                    <option key={index} value={member.username}>{member.username}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => handleMemberUpdate(document.querySelector('select').value)}
                                className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow"
                            >
                                Update Members
                            </button>
                        </>
                    )}
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

