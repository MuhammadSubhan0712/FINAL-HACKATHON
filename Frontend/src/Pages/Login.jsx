import React, { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom"; // Import for redirecting

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/loginUser`,
        formData
      );
      alert(response.data.message);
      handleLoginSuccess(); // Show the popup after login success
    } catch (err) {
      setError(err.response?.data?.message || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setShowPopup(true); // Show the popup after login success
    setNewPassword(""); // Reset the newPassword field when the login is successful
    
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/reset-password`,
        { email: formData.email, newPassword }
      );
      alert(response.data.message);
      setShowPopup(false); // Hide the popup after password reset
      history.push("/dashboard"); // Redirect to the dashboard after password reset
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordPopupClose = () => {
    setShowPopup(false); // Close the popup when clicked
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>

        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!showResetPassword ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring focus:ring-indigo-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Enter New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                placeholder="Enter your new password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring focus:ring-indigo-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Register here
          </a>
        </p>
        {!showResetPassword && (
          <p className="text-sm text-center text-indigo-600 mt-4 cursor-pointer" onClick={() => setShowResetPassword(true)}>
            Forgot Password? Click here to reset.
          </p>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-800">Reset Password</h3>
            <form onSubmit={handleResetPassword} className="mt-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Enter New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:ring focus:ring-indigo-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
                  ) : (
                    "Reset"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleResetPasswordPopupClose}
                  className="text-sm text-gray-600 hover:text-indigo-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;