import React, { createContext, useContext, useState } from 'react';

const PracticeContext = createContext();

export const usePractices = () => useContext(PracticeContext);

export const PracticeProvider = ({ children }) => {
  const [practices, setPractices] = useState([]);
  const [selectedPractice, setSelectedPractice] = useState(null);  
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const addPractice = (practice) => {
    // Assign a unique ID to each new practice
    const practiceWithId = { ...practice, id: Date.now() };
    setPractices((prevPractices) => [...prevPractices, practiceWithId]);
  };

  const removePractice = (id) => {
    setPractices((prevPractices) => prevPractices.filter(practice => practice.id !== id));
  };

  const selectPractice = (practicesForDay) => {  // Add this function
      setSelectedPractice(practicesForDay);
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide pop-up after 3 seconds
  };

  // Include selectedPractice and selectPractice in the context provider value
  return (
    <PracticeContext.Provider value={{ practices, addPractice, removePractice, selectedPractice, selectPractice, showPopup, popupMessage, showPopupMessage }}>
      {children}
    </PracticeContext.Provider>
  );
};

export default PracticeContext;
