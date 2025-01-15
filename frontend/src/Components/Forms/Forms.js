import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Address: "",
    purpose: "",
    facility: "",
    booking: "",
    requestedBy: "",
    approvedBy: "",
    dateFiled: "",
    dateEvent: "",
    startTime: "",
    endTime: "",
    dateAccomplished: "",
    receivedBy: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/event/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Successfully booked!");
        setFormData({
          Address: "",
          purpose: "",
          facility: "",
          booking: "",
          requestedBy: "",
          approvedBy: "",
          dateFiled: "",
          dateEvent: "",
          startTime: "",
          endTime: "",
          dateAccomplished: "",
          receivedBy: "",
        });
        navigate("/");
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-3 text-lg";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8">
        <header className="bg-blue-600 text-white py-4 px-6 rounded-t-lg">
          <h1 className="text-2xl font-bold tracking-wide">Request Form</h1>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Request Details</h2>
              {[
                { label: "Address to (Dept/Office/Unit)", name: "Address" },
                { label: "Purpose of the Request", name: "purpose", textarea: true },
                { label: "Facility to Use", name: "facility" },
                { label: "Booking Specification", name: "booking", textarea: true },
                { label: "Requested by", name: "requestedBy" },
                { label: "Approved By", name: "approvedBy" },
              ].map(({ label, name, textarea }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  {textarea ? (
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows="3"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    ></textarea>
                  ) : (
                    <input
                      type="text"
                      className={inputClass}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 border rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Additional Information</h2>
              {[
                { label: "Date Filed", name: "dateFiled", type: "date" },
                { label: "Date of Event", name: "dateEvent", type: "date" },
                { label: "Start Time", name: "startTime", type: "time" },
                { label: "End Time", name: "endTime", type: "time" },
                { label: "Date Accomplished", name: "dateAccomplished", type: "date" },
                { label: "Received By", name: "receivedBy" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type={type}
                    className={inputClass}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-3 rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-600"} text-white hover:bg-blue-700 transition`}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forms;
