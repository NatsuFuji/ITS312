import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const navigate = useNavigate();

  const isAuthenticated = Boolean(localStorage.getItem("userToken"));
  const selectedCouncil = localStorage.getItem("selectedCouncil");

  const handleBookClick = () => {
    if (isAuthenticated) {
      navigate("/forms");
    } else {
      alert("You must log in to book!");
    }
  };

  const bypassHandleBookClick = () => {
    navigate("/forms");
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  const events = [
    {
      title: "Team Meeting",
      start: new Date(2025, 0, 27, 9, 0),
      end: new Date(2025, 0, 27, 11, 0),
      category: "SHTM",
    },
    {
      title: "Workshop",
      start: new Date(2025, 0, 28, 10, 0),
      end: new Date(2025, 0, 28, 12, 0),
      category: "SSLATE",
    },
    {
      title: "Annual Review",
      start: new Date(2025, 0, 29, 14, 0),
      end: new Date(2025, 0, 29, 16, 0),
      category: "SBIT",
    },
    {
      title: "HR Training",
      start: new Date(2025, 0, 30, 11, 0),
      end: new Date(2025, 0, 30, 13, 0),
      category: "ARFIEN",
    },
    {
      title: "Departmental Meeting",
      start: new Date(2025, 0, 30, 12, 0),
      end: new Date(2025, 0, 30, 5, 0),
      category: "SSLATE",
    },
  ];

  const getEventColor = (category) => {
    switch (category) {
      case "SBIT":
        return "#4F46E5"; // Indigo
      case "ARFIEN":
        return "#3B82F6"; // Blue
      case "SHTM":
        return "#60A5FA"; // Light Blue
      case "SSLATE":
        return "#93C5FD"; // Sky Blue
      default:
        return "#D1D5DB"; // Gray
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center p-4 bg-blue-600 text-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">
          {isAuthenticated ? `Council: ${selectedCouncil}` : "Event Calendar"}
        </h1>
        <div className="flex gap-2">
          {isAuthenticated ? (
            <button
              onClick={handleLogoutClick}
              className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Calendar Section */}
      <div className="w-full max-w-5xl mt-6 bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-end gap-4 mb-4">
          {/* <button
            onClick={handleBookClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book
          </button> */}
          <button
            onClick={bypassHandleBookClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book
          </button>
        </div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "500px" }}
          className="bg-blue-100 rounded-lg"
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: getEventColor(event.category),
              color: "white",
              borderRadius: "4px",
              padding: "4px",
            },
          })}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
