import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reciept = () => {
  const [loanData, setLoanData] = useState(null);
  const [guarantors, setGuarantors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Get loan data and guarantors from localStorage
    const storedLoanData = JSON.parse(localStorage.getItem('loanData'));
    const storedGuarantors = JSON.parse(localStorage.getItem('guarantors'));

    if (storedLoanData) {
      setLoanData(storedLoanData);
    }
    if (storedGuarantors) {
      setGuarantors(storedGuarantors);
    }
  }, []);

  const handleSubmit = async () => {
    if (!loanData || guarantors.length === 0) {
      setError('Loan data and guarantors are required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // API call to submit loan and guarantors data
      const response = await axios.post('http://localhost:3000/api/v1/loans', {
        {...loanData,
        ...guarantors,}
      });

      // Handle success
      setSuccessMessage('Loan and guarantors data submitted successfully!');
      setLoading(false);
    } 
    catch (err) {
      // Handle error
      setError('An error occurred while submitting the data.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Submit Loan & Guarantor</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        {loading ? (
          <p className="text-center text-blue-500">Submitting...</p>
        ) : (
          <div>
            {/* Display Loan Data */}
            <h3 className="text-xl font-semibold text-gray-800">Loan Data</h3>
            <div className="text-gray-600">
              <p><strong>Amount:</strong> {loanData?.amount}</p>
              <p><strong>Category:</strong> {loanData?.category}</p>
              <p><strong>Loan Period:</strong> {loanData?.loanPeriod}</p>
              <p><strong>Subcategory:</strong> {loanData?.subcategory}</p>
            </div>

      

            {/* Display Guarantors */}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Guarantors</h3>
            <ul className="text-gray-600">
              {guarantors.length === 0 ? (
                <p>No guarantors available.</p>
              ) : (
                guarantors.map((guarantor, index) => (
                  <li key={index} className="mb-2">
                    <p><strong>Name:</strong> {guarantor?.name}</p>
              <p><strong>Email:</strong> {guarantor?.email}</p>
              <p><strong>CNIC:</strong> {guarantor?.cnic}</p>
              <p><strong>Location:</strong> {guarantor?.location}</p>
              <p><strong>Bank Name:</strong> {guarantor?.bankName}</p>
              <p><strong>Branch Code:</strong> {guarantor?.branchCode}</p>
              <p><strong>Account Number:</strong> {guarantor?.accountNumber}</p>
              <p><strong>Permission Address:</strong> {guarantor?.permissionAddress}</p>
                    {/* Add more fields if necessary */}
                  </li>
                ))
              )}
            </ul>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700"
            >
              Submit Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reciept;