import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Dummy data for loan categories
const loanCategories = [
  {
    name: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Catering & Food", "Jahez"],
    maxLoan: "PKR 5 Lakh",
    loanPeriod: "3 years",
  },
  {
    name: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years",
  },
  {
    name: "Business Startup Loans",
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: "PKR 10 Lakh",
    loanPeriod: "5 years",
  },
  {
    name: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    loanPeriod: "4 years",
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle loan category and subcategory selection
  const handleCategoryChange = (e) => {
    const category = loanCategories.find((cat) => cat.name === e.target.value);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setLoanAmount("");
    setLoanPeriod("");
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleLoanPeriodChange = (e) => {
    setLoanPeriod(e.target.value);
  };

  const handleModalSubmit = async () => {
    if (!selectedCategory || !selectedSubcategory || !loanAmount || !loanPeriod) {
      alert("Please fill in all fields.");
      return;
    }

    const loanData = {
      category: selectedCategory.name,
      subcategory: selectedSubcategory,
      amount: loanAmount,
      loanPeriod: loanPeriod,
    };

    // Save loan data in localStorage
    localStorage.setItem("loanData", JSON.stringify(loanData));

        navigate("/register");


    // try {
    //   const response = await fetch("http://localhost:5000/api/v1/loans", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loanData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     alert(`Loan request successfully submitted. ID: ${data.loan._id}`);
        
    //     // Navigate to the registration page after loan submission
    //     navigate("/register");
    //   } else {
    //     alert("Failed to submit the loan request. Please try again.");
    //   }
    // } catch (error) {
    //   alert("Error occurred while submitting the request.");
    // }
  };

  return (
    <div className="home-page bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
          Saylani Microfinance App
        </h1>

        <div className="loan-categories mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Loan Category</h2>
          <select
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={handleCategoryChange}
          >
            <option value="">--Select a Category--</option>
            {loanCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="loan-details mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Loan Details for {selectedCategory.name}</h3>
            <p className="text-lg text-gray-700 mb-2">
              Maximum Loan: <span className="font-semibold">{selectedCategory.maxLoan}</span>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Loan Period: <span className="font-semibold">{selectedCategory.loanPeriod}</span>
            </p>
            <h4 className="text-xl font-medium text-gray-800 mb-4">Select a Subcategory</h4>
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              <option value="">--Select a Subcategory--</option>
              {selectedCategory.subcategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedSubcategory && (
          <div className="loan-calculator mt-6">
            <h4 className="text-xl font-medium text-gray-800 mb-4">Loan Calculator</h4>
            <p className="text-lg text-gray-700 mb-2">
              Subcategory: <span className="font-semibold">{selectedSubcategory}</span>
            </p>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <p className="text-lg text-blue-700">Loan Calculator will be implemented here.</p>
              <div className="mt-4">
                <label className="block text-gray-700">Enter Loan Amount</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  placeholder="Enter amount"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Select Loan Period</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                  value={loanPeriod}
                  onChange={handleLoanPeriodChange}
                >
                  <option value="">--Select Period--</option>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5 Years">5 Years</option>
                </select>
              </div>
            </div>

            {loanAmount && loanPeriod && (
              <div className="mt-6 bg-green-100 p-4 rounded-lg shadow-md">
                <p className="text-lg text-green-700">
                  Based on your selected amount of PKR {loanAmount} for a period of {loanPeriod}, we will calculate the loan repayment schedule here soon.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={handleModalSubmit}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Loan Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;