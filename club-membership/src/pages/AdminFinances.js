import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const AdminFinances = () => {
    const navigate = useNavigate();
    const financialData = [
        { month: 'January', revenue: 3125, expenses: 1500, unpaid: 400 },
        { month: 'February', revenue: 3750, expenses: 1600, unpaid: 225 },
        { month: 'March', revenue: 4500, expenses: 1800, unpaid: 650 },
        { month: 'April', revenue: 1000, expenses: 350, unpaid: 100 },
    ];

    // Calculate total income for the year
    const totalIncome = financialData.reduce((acc, curr) => acc + (curr.revenue - curr.expenses), 0);

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };


    return (
        <div className="bg-gray-700 h-screen overflow-scroll">
            <Navbar />
            <div className="flex items-center justify-center">
                <h2 className="text-center text-3xl font-bold bg-slate-200 w-fit text-gray-700">Income Statement</h2>
            </div>
            <div className="flex justify-center w-full overflow-scroll pb-40">
                <div className="w-fit px-12 py-6 rounded-2xl self-center mt-6 flex justify-center flex-col items-center overflow-scroll max-h-screen bg-pink-50">
                    <table id="financeTable" className="w-fit bg-slate-100 border-collapse rounded-2xl overflow-scroll">
                        <thead className="p-12">
                            <tr>
                                <th className="bg-slate-400 p-3 text-center font-bold">Month</th>
                                <th className="bg-slate-400 p-3 text-center font-bold">Total Revenue</th>
                                <th className="bg-slate-400 p-3 text-center font-bold">Expenses</th>
                                <th className="bg-slate-400 p-3 text-center font-bold">Income</th>
                                <th className="bg-slate-400 p-3 text-center font-bold">Unpaid Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {financialData.map((data, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">
                                        {data.month === "April" ? 
                                            <Link to="/current-month-payables" className="text-blue-500 hover:text-blue-600">
                                                {data.month}
                                            </Link>
                                        : 
                                            data.month
                                        }
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2">${data.revenue.toFixed(2)}</td>
                                    <td className="border border-gray-400 px-4 py-2">${data.expenses.toFixed(2)}</td>
                                    <td className="border border-gray-400 px-4 py-2">${(data.revenue - data.expenses).toFixed(2)}</td>
                                    <td className="border border-gray-400 px-4 py-2">${data.unpaid.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="ml-10 mt-12 bg-slate-200 rounded-xl p-6">
                    <h2 className="text-3xl font-bold text-gray-800">Total Income</h2>
                    <p className="text-2xl text-green-600 mt-2">${totalIncome.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center justify-center mt-4">
                <button
                    type="button"
                    className="px-12 py-8 rounded-xl bg-slate-400 border hover:bg-slate-500 transition border-none"
                    onClick={handleBack}
                >
                    ⬅
                </button>
            </div>
            <div className='absolute bottom-0'>
                <Footer />
            </div>
        </div>
    );
};

export default AdminFinances;
