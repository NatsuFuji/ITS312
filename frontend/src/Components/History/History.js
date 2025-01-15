import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Sample placeholder data for past events
  const pastEvents = [
    {
      id: 1,
      title: "Annual Review",
      date: "2024-12-20",
      startTime: "14:00",
      endTime: "16:00",
      category: "SBIT",
      inputBy: "SBIT",
      description: "Year-end review meeting for SBIT department.",
    },
    {
      id: 2,
      title: "Council Party",
      date: "2024-12-18",
      startTime: "18:00",
      endTime: "21:00",
      category: "ARFIEN",
      inputBy: "ARFIEN",
      description: "End-of-year celebration for the council.",
    },
    {
      id: 3,
      title: "Workshop",
      date: "2024-12-15",
      startTime: "10:00",
      endTime: "12:00",
      category: "SSLATE",
      inputBy: "SSLATE",
      description: "Workshop on new tools and methodologies.",
    },
  ];

  // Function to handle viewing details
  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  // Function to close the details modal
  const closeDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#1e3a8a",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <h1 style={{ textAlign: "center", color: "#1e3a8a", flexGrow: 1, margin: "0 20px" }}>
          Event History
        </h1>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#1e3a8a", color: "#fff" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Event Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>End Time</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pastEvents.map((event) => (
            <tr key={event.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{event.title}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{event.date}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{event.startTime}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{event.endTime}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{event.category}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                <button
                  onClick={() => handleViewDetails(event)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to show event details */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          <h2 style={{ marginBottom: "10px", color: "#1e3a8a" }}>{selectedEvent.title}</h2>
          <p><strong>Date:</strong> {selectedEvent.date}</p>
          <p><strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
          <p><strong>Category:</strong> {selectedEvent.category}</p>
          <p><strong>Input By:</strong> {selectedEvent.inputBy}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <button
            onClick={closeDetails}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#ff4d4d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Overlay for modal */}
      {selectedEvent && (
        <div
          onClick={closeDetails}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default History;
