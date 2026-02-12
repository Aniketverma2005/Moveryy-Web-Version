import React, { useState } from 'react';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineCalendarToday, MdOutlineAccessTime,
  MdOutlineLocalShipping, MdOutlineLocationOn, MdOutlineKeyboardArrowRight,
  MdOutlineSchedule, MdOutlineHistory, MdOutlineCancel, MdOutlineBusinessCenter
} from 'react-icons/md';

// --- Data Structures (Example Data) ---
const bookingsData = [
  {
    id: 1,
    mover: 'QuickMove Express',
    service: 'House Moving',
    icon: <MdOutlineHome size={20} className="text-gray-600" />,
    pickup: '123 MG Road, Bangalore',
    drop: '456 Koramangala, Bangalore',
    date: '15 Feb 2024',
    time: '10:00 AM',
    price: '₹1,200',
    status: 'Upcoming',
    badge: 'Confirmed',
  },
  {
    id: 2,
    mover: 'SafeShift Services',
    service: 'Car Moving',
    icon: <MdOutlineDirectionsCar size={20} className="text-gray-600" />,
    pickup: '789 HSR Layout, Bangalore',
    drop: '321 Electronic City, Bangalore',
    date: '20 Feb 2024',
    time: '2:00 PM',
    price: '₹850',
    status: 'Upcoming',
    badge: 'Confirmed',
  },
  {
    id: 3,
    mover: 'CityMove Pro',
    service: 'Office Shifting',
    icon: <MdOutlineBusinessCenter size={20} className="text-gray-600" />,
    pickup: '45 Noida Sector 15, Delhi',
    drop: '99 Gurgaon Sector 44, Delhi',
    date: '10 Jan 2024',
    time: '9:30 AM',
    price: '₹2,500',
    status: 'Past',
    badge: 'Completed',
  },
  {
    id: 4,
    mover: 'QuickMove Express',
    service: 'House Moving',
    icon: <MdOutlineHome size={20} className="text-gray-600" />,
    pickup: '30 Bandra, Mumbai',
    drop: '50 Andheri, Mumbai',
    date: '01 Mar 2024',
    time: '1:00 PM',
    price: '₹1,500',
    status: 'Cancelled',
    badge: 'Cancelled',
  },
];

// --- Helper Components ---

const TabItem = ({ title, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors duration-150 relative ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:text-gray-800'
    }`}
  >
    {title}
    <span className="ml-2 text-xs opacity-80">{count}</span>
  </button>
);

const BookingCard = ({ booking }) => {
  const badgeColor = booking.badge === 'Confirmed' 
    ? 'bg-green-100 text-green-600' 
    : booking.badge === 'Cancelled' 
    ? 'bg-red-100 text-red-600' 
    : 'bg-gray-200 text-gray-700';

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <MdOutlineLocalShipping size={24} className="text-gray-800" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">{booking.mover}</span>
            <div className="flex items-center text-sm text-gray-600">
              {booking.icon}
              <span className="ml-1">{booking.service}</span>
            </div>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}>
          {booking.badge}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Pickup Location */}
        <div className="col-span-2 md:col-span-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-500">PICKUP</span>
            <span className="text-gray-700 font-medium">{booking.pickup}</span>
          </div>
        </div>
        
        {/* Drop Location */}
        <div className="col-span-2 md:col-span-1 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-500">DROP</span>
            <span className="text-gray-700 font-medium">{booking.drop}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MdOutlineCalendarToday size={16} className="mr-1" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center">
            <MdOutlineAccessTime size={16} className="mr-1" />
            <span>{booking.time}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-blue-600">{booking.price}</span>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
            View Details <MdOutlineKeyboardArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabs = [
    { id: 'upcoming', title: 'Upcoming', count: bookingsData.filter(b => b.status === 'Upcoming').length },
    { id: 'past', title: 'Past', count: bookingsData.filter(b => b.status === 'Past').length },
    { id: 'cancelled', title: 'Cancelled', count: bookingsData.filter(b => b.status === 'Cancelled').length },
  ];

  const filteredBookings = bookingsData.filter(b => b.status.toLowerCase() === activeTab);

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">
      
      {/* Tabs Navigation */}
      <div className="flex items-center border-b border-gray-300 mb-6">
        {tabs.map(tab => (
          <TabItem
            key={tab.id}
            title={tab.title}
            count={tab.count}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Bookings List */}
      <div className="max-w-4xl mx-auto">
        {filteredBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} />
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center p-10 bg-white rounded-xl text-gray-500">
            No {activeTab} bookings found.
          </div>
        )}
      </div>

    </div>
  );
};

export default BookingsPage;