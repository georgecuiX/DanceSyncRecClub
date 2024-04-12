import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
    const [members, setMembers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/member-management-list");
                setMembers(response.data);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        fetchMembers();
    }, []);

    const handleBack = () => {
        navigate('/member');
    };

    return (
        <div className="bg-gray-700 h-screen overflow-scroll">
            <Navbar />
            <div className="flex items-center justify-center">
                <h2 className="text-center text-3xl reddit-mono font-bold bg-slate-200 w-fit text-gray-700">
                    Attendance Log
                </h2>
            </div>

            <div className="flex justify-center w-full overflow-scroll pb-40">
                <div className="w-fit px-12 py-6 rounded-2xl self-center mt-6 flex justify-center flex-col items-center overflow-scroll max-h-screen bg-pink-50">
                    <table id="memberTable" className="w-fit bg-slate-100 border-collapse rounded-2xl overflow-scroll">
                        <thead className="p-12">
                            <tr>
                                <th className="bg-slate-400 p-3 text-center font-bold">Name</th>
                                <th className="bg-slate-400 p-3 text-center font-bold">Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={index}>
                                    <td className="border-black p-3 text-center">{member.name}</td>
                                    <td className="border-black p-3 text-center">{member.attendance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default Attendance;
