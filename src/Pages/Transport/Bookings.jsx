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
        dropoff: 'The Sapphire Mall, Gurugram',
        status: 'Accepted',
        customerName: 'Naman Chaudhary',
        customerPhone: '+91 98765 43210',
        time: '2 min',
        distance: '12.5 km',
        estimatedFare: '₹250',
        earnings: '₹250',
        pickupTime: '10:30 AM',
        vehicleType: 'Sedan',
        paymentMethod: 'Cash',
        service: 'Residential Move',
        estimatedLoad: '2 BHK',
        schedule: 'Today, 10:30 AM',
        specialInstructions: 'Handle with care. Customer has a narrow stairwell.'
      }
    ],
    Completed: [
      {
        id: 'ORD-2041',
        pickup: 'Sector 37,Gurugram',
        dropoff: 'Iffco Chowk, Gurugram',
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
        dropoff: 'Rohini Sector 18, Delhi',
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
        dropoff: 'Indirapuram, Ghaziabad',
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
        <div className="p-6 max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedBooking(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <span className="mr-2">←</span> Back to Bookings
          </button>

          {/* Customer Info and Earnings Combined */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBooking.customerName}</h2>
                <p className="text-sm text-gray-600">{selectedBooking.id} • {selectedBooking.status}</p>
                <p className="text-sm text-gray-600 mt-1">Phone: {selectedBooking.customerPhone}</p>
                <p className="text-sm text-gray-600">Payment: {selectedBooking.paymentMethod}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Earnings</p>
                <p className="text-3xl font-bold text-gray-900">{selectedBooking.earnings}</p>
              </div>
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="space-y-4">
              {/* Pickup */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pickup</p>
                  <p className="text-blue-600 font-medium">{selectedBooking.pickup}</p>
                </div>
              </div>

              {/* Drop-off */}
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Drop-off</p>
                  <p className="text-blue-600 font-medium">{selectedBooking.dropoff}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Service</p>
                <p className="font-medium text-gray-900">{selectedBooking.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Load</p>
                <p className="font-medium text-gray-900">{selectedBooking.estimatedLoad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Schedule</p>
                <p className="font-medium text-gray-900">{selectedBooking.schedule}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Distance</p>
                <p className="font-medium text-gray-900">{selectedBooking.distance}</p>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Special instructions:</span> {selectedBooking.specialInstructions}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors shadow-sm">
              🚗 Arrived at Pickup
            </button>
            <button className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-600 transition-colors shadow-sm">
              🚀 Start Trip
            </button>
            <button className="w-full bg-red-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-red-600 transition-colors shadow-sm">
              ❌ Cancel Trip
            </button>
            <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors shadow-sm">
              ✅ Complete Trip
            </button>
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
                          <p className="text-sm font-medium text-gray-900">{booking.dropoff}</p>
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
