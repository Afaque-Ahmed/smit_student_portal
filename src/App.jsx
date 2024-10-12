import React, { useState, useEffect } from "react";
import './App.css'

// src/App.js


function ClassAssignmentTracker() {
  // State to hold classes and their links
  const [classes, setClasses] = useState([
    { name: "chatbot", links: ["https://www.google.com.pk/"] },
    ,
  ]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [selectedClass, setSelectedClass] = useState(null); // State for selected class after search
  const [newLink, setNewLink] = useState(""); // State for new link input
  const [errorMessage, setErrorMessage] = useState(""); // State for search error message

  // Load classes from localStorage on mount
  useEffect(() => {
    const storedClasses = localStorage.getItem("classes");
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  // Function to search for the class by name
  const handleSearch = () => {
    const foundClass = classes.find((cls) => cls.name.toLowerCase() === searchTerm.toLowerCase());
    if (foundClass) {
      setSelectedClass(foundClass);
      setErrorMessage(""); // Clear error if class is found
    } else {
      setSelectedClass(null);
      setErrorMessage("Class not found. Please try again."); // Set error message
    }
  };

  // Function to add a new link to the selected class
  const addLink = () => {
    if (newLink.trim() && selectedClass) {
      const updatedClasses = classes.map((cls) => {
        if (cls.name === selectedClass.name) {
          return { ...cls, links: [...cls.links, newLink] };
        }
        return cls;
      });

      // Update the classes state
      setClasses(updatedClasses);

      // Save updated classes to localStorage
      localStorage.setItem("classes", JSON.stringify(updatedClasses));

      // Reset the new link input field
      setNewLink("");

      // Update the selectedClass with the newly updated class from updatedClasses
      const updatedClass = updatedClasses.find((cls) => cls.name === selectedClass.name);
      setSelectedClass(updatedClass);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Portal</h1>
      <h3 style={{color:"green"}} >Search Class : chatbot</h3>

      {/* Search for a class */}
      <div>
        <input
          type="text"
          placeholder="Search class by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search Class</button>
      </div>

      {/* Show error message if class is not found */}
      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {errorMessage}
        </div>
      )}

      {/* If class is found, show link input */}
      {selectedClass && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedClass.name} - Add Links</h2>
          <input
            type="text"
            placeholder="Enter link"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <button onClick={addLink}>Add Link</button>

          {/* Display the list of links for this class */}
          <div style={{ marginTop: "10px" }}>
            <h3>Links:</h3>
            <ul>
              {selectedClass.links.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

  
    </div>
  );
}

export default ClassAssignmentTracker;

