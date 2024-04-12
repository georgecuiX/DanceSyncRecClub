import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/index.css";
import Footer from "../components/Footer";
import axios from "axios";

const CommunicationCenter = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [messageInfo, setMessageInfo] = useState({
        sender: "",
        message: "",
    });

    useEffect(() => {
        // Fetch messages from the server when the component mounts
        axios
            .get("http://localhost:3001/message-center")
            .then((response) => {
                // Reverse the order of messages array
                const reversedMessages = response.data.reverse();
                setMessages(reversedMessages);
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const { sender, message } = messageInfo;

        axios
            .post("http://localhost:3001/message-center", {
                sender,
                message,
            })
            .then(() => {
                // Clear previous error message
                setErrorMessage("");
                // Set success message
                setSuccessMessage("Message Sent!");
                // Clear input fields
                setMessageInfo({
                    sender: "",
                    message: "",
                });
                axios
                    .get("http://localhost:3001/message-center")
                    .then((response) => {
                        // Reverse the order of messages array
                        const reversedMessages = response.data.reverse();
                        setMessages(reversedMessages);
                    })
                    .catch((error) => {
                        console.error("Error fetching messages:", error);
                    });
            })
            .catch((error) => {
                console.error("Error:", error);
                // Set error message based on backend response
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.error
                ) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("An error occurred while processing your request");
                }
            });
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/admin");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMessageInfo({
            ...messageInfo,
            [name]: value,
        });
    };

    return (
        <div className="bg-gray-700 h-screen overflow-hidden">
            <Navbar />
            <div className="flex items-center justify-around w-full">
                <div className="msg-con">
                    <form onSubmit={handleSubmit}>
                        <div className="flex-1 flex flex-row w-full mb-8">
                            <h1 className="font-semibold text-xl bg-yellow-200 py-1 px-2 reddit-mono">
                                Send A Message.
                            </h1>
                        </div>
                        <div className="flex-2 flex justify-center flex-col items-center">
                            {errorMessage && (
                                <div className="text-red-500 top-52 absolute">
                                    {errorMessage}
                                </div>
                            )}
                            {successMessage && (
                                <div className="text-green-500 top-52 absolute">
                                    {successMessage}
                                </div>
                            )}

                            <div className="flex w-full flex-col">
                                <input
                                    className=" w-96 h-10 mb-4 rounded-2xl px-5 border-black focus:outline-none bg-blue-50"
                                    type="text"
                                    name="sender"
                                    placeholder="Full Name"
                                    value={messageInfo.sender}
                                    onChange={handleChange}
                                    maxLength={60}
                                    required
                                />
                                <textarea
                                    className="w-full h-96 rounded-2xl px-5 py-3 border-black focus:outline-none bg-blue-50 mr-8 resize-none whitespace-pre-wrap"
                                    name="message"
                                    placeholder="Hey Everyone, I'd like to inform you that..."
                                    maxLength={500}
                                    value={messageInfo.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="text-gray-500 text-right">
                                {500 - messageInfo.message.length} characters remaining
                            </div>
                        </div>
                        <br />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="py-2 px-6 rounded-xl bg-yellow-300 border hover:bg-green-200 transition reddit-mono border-black"
                            >
                                Send Message <span className=" pl-2">➤</span>
                            </button>
                        </div>
                    </form>
                </div>
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
};

export default CommunicationCenter;
