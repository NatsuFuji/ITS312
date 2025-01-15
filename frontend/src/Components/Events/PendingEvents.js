import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const handleApprove = (eventId) => {
    alert(`Event with ID ${eventId} approved!`);
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const handleDecline = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/event/delete/${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert(`Event with ID ${eventId} declined!`);
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      } else {
        const errorData = await response.json();
        console.error("Failed to decline event:", errorData);
        alert(`Failed to decline the event. Error: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert(`An error occurred while declining the event. Please try again.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/event/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Back
        </button>
        <h2 className="text-xl font-bold text-blue-800">Pending Events</h2>
      </div>
      <table className="w-full border-collapse bg-gray-50">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-4 text-left">Purpose</th>
            <th className="py-3 px-4 text-left">Event Date</th>
            <th className="py-3 px-4 text-left">Time</th>
            <th className="py-3 px-4 text-left">Organizer</th>
            <th className="py-3 px-4 text-left">Facility to Use</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b">{event.purpose}</td>
              <td className="py-3 px-4 border-b">{new Date(event.dateEvent).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{`${event.startTime} - ${event.endTime}`}</td>
              <td className="py-3 px-4 border-b">{event.requestedBy}</td>
              <td className="py-3 px-4 border-b">{event.facility || "N/A"}</td>
              <td className="py-3 px-4 border-b text-center">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleApprove(event.id)}
                    className="px-3 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(event.id)}
                    className="px-3 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Decline
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {events.length === 0 && (
        <p className="mt-4 text-gray-600 text-center">No pending events to display.</p>
      )}
    </div>
  );
};

export default PendingEvents;
