import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", cnic: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");
    setSuccessMessage("");
    
    try {
      const response = await axios.post("http://localhost:3000/api/v1/registerUser", formData);
      setSuccessMessage(response.data.message);
      setFormData({ name: "", email: "", cnic: "" });
      // setTimeout(() => history.push("/login"), 2000); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="cnic" className="block text-gray-700">CNIC</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="Enter your CNIC"
              required
              className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:text-blue-700">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;