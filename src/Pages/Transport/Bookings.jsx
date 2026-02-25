import React, { useState } from 'react';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Sample booking data
  const bookings = {
    Active: [
      {
        id: 'ORD-2042',
        pickup: 'Sector 10, Gurugram',
        destination: 'The Sapphire Mall, Gurugram',
        status: 'Assigned',
        customerName: 'Naman Chaudhary',
        customerPhone: '+91 98765 43210',
        time: '2 min',
        distance: '12.5 km',
        estimatedFare: '₹250',
        pickupTime: '10:30 AM',
        vehicleType: 'Sedan',
        paymentMethod: 'Cash'
      }
    ],
    Completed: [
      {
        id: 'ORD-2041',
        pickup: 'Sector 37,Gurugram',
        destination: 'Iffco Chowk, Gurugram',
        status: 'Completed',
        customerName: 'Shruti Sharma',
        customerPhone: '+91 87654 32109',
        time: '45 min',
        distance: '18.2 km',
        earnings: '₹320',
        completedTime: '9:45 AM',
        vehicleType: 'Hatchback',
        paymentMethod: 'UPI'
      },
      {
        id: 'ORD-2040',
        pickup: 'GTB Nagar, Delhi',
        destination: 'Rohini Sector 18, Delhi',
        status: 'Completed',
        customerName: 'Amitansh Patel',
        customerPhone: '+91 76543 21098',
        time: '25 min',
        distance: '8.7 km',
        earnings: '₹180',
        completedTime: '8:20 AM',
        vehicleType: 'Sedan',
        paymentMethod: 'Card'
      }
    ],
    Rejected: [
      {
        id: 'ORD-2039',
        pickup: 'Sector 16, Noida',
        destination: 'Indirapuram, Ghaziabad',
        status: 'Rejected',
        customerName: 'Sneha Joshi',
        customerPhone: '+91 65432 10987',
        time: '1 hour ago',
        distance: '22.1 km',
        reason: 'Too far from current location',
        rejectedTime: '7:30 AM',
        vehicleType: 'SUV',
        paymentMethod: 'Cash'
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned':
        return 'text-blue-600 bg-blue-50';
      case 'Completed':
        return 'text-green-600 bg-green-50';
      case 'Rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTabStyle = (tab) => {
    return activeTab === tab
      ? 'px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border-b-2 border-blue-600'
      : 'px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50';
  };

  // If a booking is selected, show detailed view
  if (selectedBooking) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Back Button */}
            <div className="p-6 border-b border-gray-200">
              <button
                onClick={() => setSelectedBooking(null)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
              >
                <span className="mr-2">←</span> Back to Bookings
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Booking Details - {selectedBooking.id}</h1>
            </div>

            {/* Detailed Booking Information */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedBooking.customerName}</p>
                    <p><span className="font-medium">Phone:</span> {selectedBooking.customerPhone}</p>
                    <p><span className="font-medium">Payment Method:</span> {selectedBooking.paymentMethod}</p>
                  </div>
                </div>

                {/* Trip Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Trip Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Vehicle Type:</span> {selectedBooking.vehicleType}</p>
                    <p><span className="font-medium">Distance:</span> {selectedBooking.distance}</p>
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Route Details */}
                <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Route Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Pickup Location</p>
                        <p className="text-gray-600">{selectedBooking.pickup}</p>
                        {selectedBooking.pickupTime && <p className="text-sm text-gray-500">Time: {selectedBooking.pickupTime}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-2">
                      <div className="w-0.5 h-8 bg-gray-300"></div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Destination</p>
                        <p className="text-gray-600">{selectedBooking.destination}</p>
                        {selectedBooking.completedTime && <p className="text-sm text-gray-500">Completed: {selectedBooking.completedTime}</p>}
                        {selectedBooking.rejectedTime && <p className="text-sm text-gray-500">Rejected: {selectedBooking.rejectedTime}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                {(selectedBooking.earnings || selectedBooking.estimatedFare) && (
                  <div className="md:col-span-2 bg-green-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Details</h3>
                    <div className="space-y-2">
                      {selectedBooking.earnings && (
                        <p className="text-lg"><span className="font-medium">Earnings:</span> 
                          <span className="text-green-600 font-bold ml-2">{selectedBooking.earnings}</span>
                        </p>
                      )}
                      {selectedBooking.estimatedFare && (
                        <p className="text-lg"><span className="font-medium">Estimated Fare:</span> 
                          <span className="text-blue-600 font-bold ml-2">{selectedBooking.estimatedFare}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Rejection Reason */}
                {selectedBooking.reason && (
                  <div className="md:col-span-2 bg-red-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Rejection Details</h3>
                    <p className="text-red-700">{selectedBooking.reason}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['Active', 'Completed', 'Rejected'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={getTabStyle(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Booking Cards */}
          <div className="p-6">
            {bookings[activeTab].length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No {activeTab.toLowerCase()} bookings found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings[activeTab].map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    {/* Booking Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{booking.id}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{booking.customerName}</p>
                        <p className="text-xs text-gray-400">{booking.time}</p>
                      </div>
                    </div>

                    {/* Route Information */}
                    <div className="space-y-2">
                      {/* Pickup */}
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{booking.pickup}</p>
                        </div>
                      </div>

                      {/* Route Line */}
                      <div className="flex items-center space-x-3">
                        <div className="w-3 flex justify-center">
                          <div className="w-0.5 h-6 bg-gray-300"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">{booking.distance}</p>
                        </div>
                      </div>

                      {/* Destination */}
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{booking.destination}</p>
                        </div>
                      </div>
                    </div>

                    {/* Open Link */}
                    <div className="mt-3">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-blue-600 hover:text-blue-800 text-sm underline bg-transparent border-none cursor-pointer"
                      >
                        Open
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          {booking.earnings && (
                            <span className="text-sm font-semibold text-green-600">
                              Earned: {booking.earnings}
                            </span>
                          )}
                          {booking.reason && (
                            <span className="text-sm text-red-600">
                              Reason: {booking.reason}
                            </span>
                          )}
                        </div>

                        {activeTab === 'Active' && (
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100">
                              Decline
                            </button>
                            <button className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                              Accept
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
