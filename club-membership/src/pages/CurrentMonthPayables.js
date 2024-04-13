import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


const CurrentMonthPayables = () => {
    const navigate = useNavigate();
    const accountPayables = [
        { memberName: 'John Doe', amountPaid: 340, datePaid: '2024-04-01' },
        { memberName: 'Jane Doe', amountPaid: 510, datePaid: '2024-04-02' },
        { memberName: 'Anakin Skywalker', amountPaid: 150, datePaid: '2024-04-02' },
        { memberName: 'John Smith', amountPaid: 0, datePaid: 'N/A' },
    ];


    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="bg-gray-700 min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-col items-center justify-start flex-grow">
                <div className="mt-12 px-12 py-6 rounded-2xl bg-pink-50 w-full max-w-4xl">
                    <h2 className="text-center text-3xl font-bold text-gray-700 mb-6">Current Month Account Payables</h2>
                    <table className="table-auto border-collapse border border-gray-500 w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-400 px-4 py-2 text-gray-800">Member Name</th>
                                <th className="border border-gray-400 px-4 py-2 text-gray-800">Amount Paid in Advance</th>
                                <th className="border border-gray-400 px-4 py-2 text-gray-800">Date Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountPayables.map((payable, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">{payable.memberName}</td>
                                    <td className="border border-gray-400 px-4 py-2">${payable.amountPaid.toFixed(2)}</td>
                                    <td className="border border-gray-400 px-4 py-2">{payable.datePaid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        className="px-6 py-4 rounded-xl bg-slate-400 border hover:bg-slate-500 transition text-white"
                        onClick={handleBack}
                    >
                        ⬅
                    </button>
                </div>
            </div>
            <div className='absolute bottom-0'>
                <Footer />
            </div>
        </div>
    );
};

export default CurrentMonthPayables;
