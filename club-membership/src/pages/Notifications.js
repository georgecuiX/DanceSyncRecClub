import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/index.css";
import Footer from "../components/Footer";
import axios from "axios";

const Notifications = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Function to fetch messages from the server
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:3001/message-center");
                // Reverse the order of messages array
                const reversedMessages = response.data.reverse();
                setMessages(reversedMessages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        // Call the fetchMessages function initially
        fetchMessages();

        // Function to continuously fetch messages from the server
        const interval = setInterval(fetchMessages, 1000); // Poll every 5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate("/member");
    };

    return (
        <div className="bg-gray-700 h-screen overflow-hidden">
            <Navbar />
            <div className="flex items-center justify-around w-full">
                <div className="msg-con overflow-hidden">
                    <h1 className="font-semibold text-xl bg-cyan-200 py-1 px-2 reddit-mono w-fit">
                        Message Board.
                    </h1>
                    <div className="mt-4 max-h-full pb-10 overflow-y-scroll">
                        {messages.map((msg, index) => (
                            <div key={index} className="message mb-4 bg-gray-100 px-4 py-3 rounded-2xl break-words transition hover:bg-gray-300">
                                <p className="sender text-red-400 reddit-mono font-bold">{msg.sender}: </p>
                                <p className="content">{msg.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center mt-4">
                <button
                    type="button"
                    className="px-4 py-4 rounded-xl bg-slate-400 border w-1/6 hover:bg-slate-500 transition border-none"
                    onClick={handleBack}
                >
                    ⬅
                </button>
            </div>
            <div className="absolute bottom-0">
                <Footer />
            </div>
        </div>
    );
}

export default Notifications;
