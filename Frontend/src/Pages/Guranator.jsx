import React, { useState } from 'react';
import axios from 'axios';

const CreateGuranator = () => {
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

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field === '')) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('/api/guarantors', formData);
      setSuccessMessage('Guarantor created successfully');
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
    } catch(error) {
      setError('An error occurred while creating the guarantor',error);
      setSuccessMessage('');
    }
  };

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
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
            >
              Create Guaranator
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGuranator;