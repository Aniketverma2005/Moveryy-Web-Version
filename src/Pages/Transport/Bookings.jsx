import React, { useState } from 'react';

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('Active');

  // Sample booking data
  const bookings = {
    Active: [
      {
        id: 'ORD-2042',
        pickup: 'Bandra Kurla Complex, Mumbai',
        destination: 'Andheri West, Mumbai',
        status: 'Assigned',
        customerName: 'Rajesh Kumar',
        time: '2 min',
        distance: '12.5 km'
      }
    ],
    Completed: [
      {
        id: 'ORD-2041',
        pickup: 'Powai, Mumbai',
        destination: 'Goregaon East, Mumbai',
        status: 'Completed',
        customerName: 'Priya Sharma',
        time: '45 min',
        distance: '18.2 km',
        earnings: '₹320'
      },
      {
        id: 'ORD-2040',
        pickup: 'Malad West, Mumbai',
        destination: 'Borivali West, Mumbai',
        status: 'Completed',
        customerName: 'Amit Patel',
        time: '25 min',
        distance: '8.7 km',
        earnings: '₹180'
      }
    ],
    Rejected: [
      {
        id: 'ORD-2039',
        pickup: 'Thane West, Mumbai',
        destination: 'Navi Mumbai',
        status: 'Rejected',
        customerName: 'Sneha Joshi',
        time: '1 hour ago',
        distance: '22.1 km',
        reason: 'Too far from current location'
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

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Bookings</h1>
      </div>

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