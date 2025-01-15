import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date();

  // Sample events
  const events = [
    {
      title: "Team Meeting",
      start: new Date(2025, 0, 27, 9, 0),
      end: new Date(2025, 0, 27, 11, 0),
      category: "SHTM",
    },
    // Additional events...
  ];

  const upcomingEvents = events.filter((event) => event.start > currentDate);

  const getEventColor = (category) => {
    switch (category) {
      case "SBIT":
        return "#4A90E2";
      case "ARFIEN":
        return "#50E3C2";
      case "SHTM":
        return "#F5A623";
      case "SSLATE":
        return "#B8E986";
      default:
        return "#D8D8D8";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleNavigation = (route) => navigate(route);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-sm">
        <h1 className="text-xl font-semibold text-blue-800">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        <button
          onClick={() => handleNavigation("/history")}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-blue-800"
        >
          <h2 className="text-lg font-medium">History</h2>
          <p className="text-sm mt-2">View all past events</p>
        </button>
        <button
          onClick={() => handleNavigation("/pending-events")}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-blue-800"
        >
          <h2 className="text-lg font-medium">Pending Events</h2>
          <p className="text-sm mt-2">Review upcoming requests</p>
        </button>
      </div>

      {/* Calendar */}
      <div className="w-full max-w-7xl mt-8 px-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <Calendar
            localizer={localizer}
            events={upcomingEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "60vh" }}
            className="text-blue-800"
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: getEventColor(event.category),
              },
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
