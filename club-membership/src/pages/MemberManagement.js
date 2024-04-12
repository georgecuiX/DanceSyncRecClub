import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MembersManagement = () => {
    const [members, setMembers] = useState([
        { name: "John Doe", attendance: 8, paid: true, email: "helloworld@gmail.com" },
        { name: "Jane Smith", attendance: 3, paid: false, email: "helloworld@gmail.com" },
        { name: "Alice Johnson", attendance: 6, paid: true, email: "helloworld@gmail.com" },
        { name: "Bob Brown", attendance: 4, paid: true, email: "helloworld@gmail.com" },
        { name: "Emily Davis", attendance: 10, paid: true, email: "helloworld@gmail.com" }
    ]);

    const [sortDirections, setSortDirections] = useState({
        name: 1,
        attendance: 1,
        paid: 1
    });

    const toggleSortDirection = (column) => {
        setSortDirections({
            ...sortDirections,
            [column]: -sortDirections[column]
        });
    };

    const sortByName = () => {
        const sortedMembers = [...members].sort((a, b) => sortDirections.name * a.name.localeCompare(b.name));
        setMembers(sortedMembers);
        toggleSortDirection("name");
    };

    const sortByAttendance = () => {
        const sortedMembers = [...members].sort((a, b) => sortDirections.attendance * (b.attendance - a.attendance));
        setMembers(sortedMembers);
        toggleSortDirection("attendance");
    };

    const sortByPaid = () => {
        const sortedMembers = [...members].sort((a, b) => {
            if (a.paid && !b.paid) return sortDirections.paid * -1;
            if (!a.paid && b.paid) return sortDirections.paid * 1;
            return 0;
        });
        setMembers(sortedMembers);
        toggleSortDirection("paid");
    };

    const deleteRecord = (index) => {
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
    };

    return (
        <div className=" bg-gray-700 h-screen overflow-scroll">
            <Navbar />
            <div className="flex items-center justify-center">
                <h2 className=" text-center text-3xl reddit-mono font-bold bg-slate-200 w-fit text-gray-700">User Membership Log</h2>
            </div>

            <div className="flex justify-center w-full overflow-scroll pb-40">
                <div className="w-fit px-12 py-6 rounded-2xl self-center mt-6 flex justify-center flex-col items-center overflow-scroll max-h-screen bg-pink-50">
                    <button onClick={openPopup} className='px-4 py-2 rounded-xl bg-green-400 border w-fit hover:bg-green-500 transition font-bold text-green-900 mb-4 border-none'>Add Record</button>

                    <table id="memberTable" className=" w-fit bg-slate-100 border-collapse rounded-2xl overflow-scroll" >
                        <thead className="p-12">
                            <tr>
                                <th className="bg-slate-400  p-3 text-center font-bold"><button onClick={sortByName}>Name ⭥</button></th>
                                <th className="bg-slate-400  p-3 text-center font-bold">Email</th>
                                <th className="bg-slate-400  p-3 text-center font-bold"><button onClick={sortByAttendance}>Attendance ⭥</button></th>
                                <th className="bg-slate-400  p-3 text-center font-bold"><button onClick={sortByPaid}>Paid ⭥</button></th>
                                <th className=" bg-slate-400 p-3 text-center font-bold">Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={index}>
                                    <td className=" border-black p-3 text-center">{member.name}</td>
                                    <td className=" border-black p-3 text-center">{member.email}</td>
                                    <td className=" border-black p-3 text-center">{member.attendance}</td>
                                    <td className={`border-black p-3 text-center ${member.paid ? 'bg-green-200' : 'bg-red-200'}`}>{member.paid ? "Yes" : "No"}</td>
                                    <td className={` border-black p-3 text-center ${member.attendance >= 5 ? 'bg-orange-200' : ''}`}>{member.attendance >= 5 ? "10% off" : "No discount"}</td>
                                    <td className=" border-black p-3 text-center bg-red-500 font-bold"><button onClick={() => deleteRecord(index)}>Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className=" fixed top-0 left-0 w-full hidden z-30" id="overlay"></div>
                    <div className=" hidden fixed bg-slate-200 w-1/3 border-black rounded-2xl p-6" id="popup">
                        <span className=" absolute top-1 right-1 cursor-pointer text-red-700 text-4xl p-2" onClick={closePopup}>&times;</span>
                        <h2 className=" text-center text-xl reddit-mono font-bold bg-green-200 w-fit text-green-800 mb-3">Add Member</h2>
                        <form onSubmit={addNewMember} className="flex flex-col items-center justify-center">
                            <input className=" mt-4 mb-2 w-5/6 h-12 rounded-2xl border-black px-2" type="text" id="name" name="name" placeholder="Full Name" required /><br />
                            <input className=" mb-2 w-5/6 h-12 rounded-2xl border-black px-2" type="email" id="email" name="email" placeholder="Email" required /><br />
                            <div className="flex gap-16">
                                <div className="flex flex-col items-center justify-center">
                                    <label>Attendance</label>
                                    <input className=" w-12 text-center px-2 py-2 rounded-2xl border-black" type="number" id="attendance" name="attendance" required /><br />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <label htmlFor="paid">Paid?</label>
                                    <div className="flex gap-4 items-center justify-center">
                                        <div>
                                            <input
                                                className='radio'
                                                type="radio"
                                                id="paidTrue"
                                                name="paid"
                                                value="true"
                                                required
                                            />
                                            <label htmlFor="newPaid">Yes</label>
                                        </div>
                                        <div>
                                            <input
                                                className='radio'
                                                type="radio"
                                                id="paidFalse"
                                                name="paid"
                                                value="false"
                                                required
                                            />
                                            <label htmlFor="newPaid">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className='px-4 py-2 mt-8 rounded-xl bg-green-400 border w-fit hover:bg-green-500 transition font-bold text-green-900 mb-4 border-none'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0'>
                <Footer />
            </div>
        </div>
    );

    function openPopup() {
        document.getElementById("popup").style.display = "block";
        document.getElementById("overlay").style.display = "block";
    }

    function closePopup() {
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }

    function addNewMember(event) {
        event.preventDefault();
        const newName = document.getElementById("name").value;
        const newEmail = document.getElementById("email").value;
        const newAttendance = parseInt(document.getElementById("attendance").value);
        const paidTrue = document.getElementById("paidTrue").checked; // Convert string to boolean
        const newPaid = paidTrue ? true: false;
        console.log(newPaid);
        setMembers([
            ...members,
            { name: newName, email: newEmail, attendance: newAttendance, paid: newPaid }
        ]);
        closePopup();
    }
};

export default MembersManagement;
