import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarComponent from "./Components/calendarbooking/Calendar";
import Forms from "./Components/Forms/Forms";
import Login from "./Components/Login/Login";
import Signup from "./Components/Create/Signup";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import History from "./Components/History/History"; 
import PendingEvents from "./Components/Events/PendingEvents";


function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for the calendar and forms */}
        <Route path="/" element={<CalendarComponent />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/pending-events" element={<PendingEvents />} />
      </Routes>
    </Router>
  );
}

export default App;
