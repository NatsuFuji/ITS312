import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../img/SBIT.jpg";
import img2 from "../img/ARFIEN.jpg";
import img3 from "../img/SHTM.jpg";
import img4 from "../img/SSLATE.jpg";
import logo from "../img/logo.png"; // Replace with your actual logo image path

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false); // State for admin modal
  const [selectedCouncil, setSelectedCouncil] = useState("");
  const [adminUsername, setAdminUsername] = useState(""); // Admin username state
  const [adminPassword, setAdminPassword] = useState(""); // Admin password state
  const navigate = useNavigate();

  const councils = [
    { name: "SBIT", logo: img1 },
    { name: "ARFIEN", logo: img2 },
    { name: "SHTM", logo: img3 },
    { name: "SSLATE", logo: img4 },
  ];

  const openModal = (councilName) => {
    setSelectedCouncil(councilName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCouncil("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("userToken", "mockToken"); // Save token
    localStorage.setItem("selectedCouncil", selectedCouncil); // Save council
    navigate("/"); // Redirect to the calendar component
  };

  const openAdminModal = () => {
    setIsAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === "admin" && adminPassword === "admin123") {
      localStorage.setItem("userToken", "adminToken");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 relative">
      {/* Top-left image */}
      <div className="absolute top-11 left-9 lef">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
      </div>

      <h1 className="text-xl font-semibold mb-8">Book with:</h1>
      <div className="grid grid-cols-2 gap-6">
        {councils.map((council, index) => (
          <div
            key={index}
            onClick={() => openModal(council.name)}
            className="flex flex-col items-center justify-center bg-blue-50 border border-blue-500 rounded-lg w-52 h-52 shadow-lg transition transform hover:scale-105 cursor-pointer"
          >
            <img
              src={council.logo}
              alt={council.name}
              className="h-20 w-20 object-contain mb-4"
            />
            <h2 className="text-lg font-medium text-gray-700">{council.name}</h2>
          </div>
        ))}
      </div>

      {/* Admin Box */}
      <div
        onClick={openAdminModal}
        className="mt-6 flex flex-col items-center justify-center bg-green-50 border border-green-500 rounded-lg w-52 h-52 shadow-lg transition transform hover:scale-105 cursor-pointer"
      >
        <h2 className="text-lg font-medium text-gray-700">Admin</h2>
        <p className="text-sm text-gray-600">Access Admin Dashboard</p>
      </div>

      {/* Modal for Council Login */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Login to {selectedCouncil}
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Admin Login */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg relative">
            <button
              onClick={closeAdminModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label
                  htmlFor="adminUsername"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="adminUsername"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admin username"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="adminPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
