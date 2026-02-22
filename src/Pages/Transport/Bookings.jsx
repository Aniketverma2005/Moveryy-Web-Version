import React from 'react';

const Bookings = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        <p className="text-gray-600 mt-1">Manage your booking requests and history</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-2xl">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Bookings Management</h3>
          <p className="text-gray-600">Your booking management interface will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};

export default Bookings;