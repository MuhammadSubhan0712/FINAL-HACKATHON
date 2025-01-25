import React, { useState } from "react";

const Home = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <h2 className="text-3xl font-bold">
            Saylani Microfinance Management System
          </h2>
        </div>
      </header>

      {/* Loan Categories */}
      <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Our Loan Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg">
              <h4 className="text-xl font-bold text-blue-600 mb-2">
                Wedding Loans
              </h4>

              <ul className="list-disc ml-5 mt-2">
                <li className="text-blue-900">Valima Reception</li>
                <li className="text-blue-900">Catering and Food</li>
                <li className="text-blue-900">Furniture</li>
                <li className="text-blue-900">Jahez</li>
              </ul>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg">
              <h4 className="text-xl font-bold text-blue-600 mb-2">
                Home Construction Loans
              </h4>

              <ul className="list-disc ml-5 mt-2">
                <li className="text-blue-900">Basic Structure</li>
                <li className="text-blue-900">Finishing</li>
              </ul>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg">
              <h4 className="text-xl font-bold text-blue-600 mb-2">
                Business Startup Loans
              </h4>
              <ul className="list-disc ml-5 mt-2">
                <li className="text-blue-900">Buy Stall</li>
                <li className="text-blue-900">Advance Rent for Shop</li>
                <li className="text-blue-900"> Shop Assets</li>
                <li className="text-blue-900"> Shop Machinery</li>
              </ul>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow hover:shadow-lg">
              <h4 className="text-xl font-bold text-blue-600 mb-2">
                Education Loans
              </h4>
              <ul className="list-disc ml-5 mt-2">
                <li className="text-blue-900"> University Fees</li>
                <li className="text-blue-900">Child Fees Loan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; 2025 Saylani Microfinance Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
