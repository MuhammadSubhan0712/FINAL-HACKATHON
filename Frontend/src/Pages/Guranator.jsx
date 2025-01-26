import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGuarantor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    cnic: '',
    bankName: '',
    accountNumber: '',
    branchCode: '',
    permissionAddress: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [guarantors, setGuarantors] = useState([]);
  const [loanData, setLoanData] = useState(null); // New state for loan data

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any fields are empty
    if (Object.values(formData).some((field) => field === '')) {
      setError('All fields are required');
      return;
    }

    // Package bank details into an object
    const bankDetails = {
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      branchCode: formData.branchCode,
    };

    const requestData = { ...formData, bankDetails }; // Include bank details in the request

    try {
      // Submit the form data to the backend
      const response = await axios.post('http://localhost:3000/api/v1/guarantors', requestData);
      setSuccessMessage('Guarantor created successfully');

      // Save data to localStorage
      const existingData = JSON.parse(localStorage.getItem('guarantors')) || [];
      existingData.push(formData);
      localStorage.setItem('guarantors', JSON.stringify(existingData));

      // Update guarantors state
      setGuarantors(existingData);

      // Clear form data
      setFormData({
        name: '',
        email: '',
        location: '',
        cnic: '',
        bankName: '',
        accountNumber: '',
        branchCode: '',
        permissionAddress: '',
      });
      setError('');

      navigate("/Submission");

    } catch (error) {
      setError('An error occurred while creating the guarantor');
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    // Retrieve stored guarantors and loan data from localStorage when the component mounts
    const storedGuarantors = JSON.parse(localStorage.getItem('guarantors')) || [];
    setGuarantors(storedGuarantors);

    // Assuming the loan data is stored in localStorage with the key 'loanData'
    const storedLoanData = JSON.parse(localStorage.getItem('loanData'));
    setLoanData(storedLoanData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Guarantor</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="CNIC"
              className="w-full p-3 border rounded-lg"
            />
            <div className="space-y-2">
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Bank Name"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="branchCode"
                value={formData.branchCode}
                onChange={handleChange}
                placeholder="Branch Code"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <input
              type="text"
              name="permissionAddress"
              value={formData.permissionAddress}
              onChange={handleChange}
              placeholder="Permission Address"
              className="w-full p-3 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Create Guarantor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGuarantor;