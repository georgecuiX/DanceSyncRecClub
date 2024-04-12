import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePractices } from './PracticeContext';

const MemberPayment = () => {
    const { addPractice } = usePractices();
    const navigate = useNavigate();
    const location = useLocation();
    const { date, startTime, endTime } = location.state; // Destructuring directly from state
    const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility
    
    // Payment Form States
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCVC] = useState('');
    const [cardType, setCardType] = useState('Visa');

    // Costs and taxes
    const cost = 30; // Base cost in dollars
    const tax = cost * 0.13; // 13% HST
    const totalCost = cost + tax;

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Processing payment with card number: ${cardNumber}`);

        // Simulate a payment processing delay and successful payment
        setTimeout(() => {
            addPractice({
              date: format(date, 'yyyy-MM-dd'),
              startTime: format(startTime, 'HH:mm'),
              endTime: format(endTime, 'HH:mm'),
            });

            // Show the pop-up notification
            setShowPopup(true);

            // Hide the popup after a few seconds
            setTimeout(() => {
                setShowPopup(false);
                navigate('/member'); // Navigate to member home page after scheduling
            }, 800);
        }); 
    };

    const handleBack = () => {
        navigate('/schedulePractice'); // Navigate back to the WelcomeScreen
      };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Navbar />
            <div className="flex justify-center items-center mt-12 mx-auto px-4">
                <div className="w-full max-w-6xl p-5 flex flex-row">  
                    {/* Payment Form Section */}
                    <div className="flex-[15] mr-10">
                        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Card Number */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-l font-bold mb-2">Card Number:</label>
                                <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            {/* Expiry Date */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-l font-bold mb-2">Expiry Date:</label>
                                <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} placeholder="MM/YY" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            {/* CVC */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-l font-bold mb-2">CVC:</label>
                                <input type="text" value={cvc} onChange={(e) => setCVC(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            {/* Card Type */}
                            <div className="mb-6">
                                <label className="block text-gray-700 text-l font-bold mb-2">Card Type:</label>
                                <select value={cardType} onChange={(e) => setCardType(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                                    <option value="Visa">Visa</option>
                                    <option value="MasterCard">MasterCard</option>
                                    <option value="American Express">American Express</option>
                                </select>
                            </div>
                            <button type="submit" className='px-6 py-4 rounded-xl bg-blue-500 hover:bg-blue-700 text-white font-bold w-full transition'>
                                Pay and Schedule
                            </button>
                        </form>
                    </div>
                    {/* Receipt Section */}
                    <div className="flex-[10] border-l pl-10">
                        <h2 className="text-2xl font-bold mb-4">Receipt</h2>
                        <div className="text-gray-700 text-l">
                            <p>Base Cost: ${cost.toFixed(2)}</p>
                            <p>HST (13%): ${tax.toFixed(2)}</p>
                            <p className="font-bold">Total: ${totalCost.toFixed(2)}</p>
                        </div>
                        <button type="button" className='px- py-4 rounded-xl bg-slate-400 border w-3/5 hover:bg-slate-500 transition' onClick={handleBack}>⬅</button>
                    </div>
                </div>
                {showPopup && (
                    <div className="absolute top-20 bg-green-500 text-white py-2 px-4 rounded-lg z-10">
                        <p>Practice scheduled successfully!</p>
                        <p>Date: {format(date, 'PPP')}</p>
                        <p>Time: From {format(startTime, 'p')} to {format(endTime, 'p')}</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MemberPayment;
