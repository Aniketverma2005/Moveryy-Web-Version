import React from 'react';

const Earnings = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
        <p className="text-gray-600 mt-1">Track your earnings and payment history</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-600 text-2xl">💰</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Earnings Dashboard</h3>
          <p className="text-gray-600">We will build an empire of 10000 crores in next 10 to 15 years.</p>
        </div>
      </div>
    </div>
  );
};

export default Earnings;