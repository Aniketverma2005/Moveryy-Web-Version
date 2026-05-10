import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineLocationOn, MdArrowBack, MdOutlineDirectionsCar,
  MdOutlineAccessTime, MdOutlinePhone, MdCheck, MdClose,
  MdOutlineAttachMoney,
} from 'react-icons/md';
import { cardVariants, containerVariants, pageVariants } from '../../utils/animations';

const TABS = ['Active', 'Completed', 'Rejected'];

const STATUS_STYLE = {
  Accepted: 'bg-blue-50 text-blue-600 border-blue-100',
  Completed: 'bg-green-50 text-green-600 border-green-100',
  Rejected: 'bg-red-50 text-red-500 border-red-100',
  Active: 'bg-blue-50 text-blue-600 border-blue-100',
};

const bookings = {
  Active: [
    {
      id: 'ORD-2042', pickup: 'Sector 10, Gurugram', dropoff: 'The Sapphire Mall, Gurugram',
      status: 'Accepted', customerName: 'Naman Chaudhary', customerPhone: '+91 98765 43210',
      time: '2 min', distance: '12.5 km', earnings: '₹2500', pickupTime: '10:30 AM',
      vehicleType: 'Sedan', paymentMethod: 'Cash', service: 'Residential Move',
      estimatedLoad: '2 BHK', schedule: 'Today, 10:30 AM',
      specialInstructions: 'Handle with care. Customer has a narrow stairwell.',
    },
  ],
  Completed: [
    {
      id: 'ORD-2041', pickup: 'Sector 37, Gurugram', dropoff: 'Iffco Chowk, Gurugram',
      status: 'Completed', customerName: 'Shruti Sharma', customerPhone: '+91 87654 32109',
      time: '45 min', distance: '18.2 km', earnings: '₹3200', completedTime: '9:45 AM',
      vehicleType: 'Hatchback', paymentMethod: 'UPI',
    },
    {
      id: 'ORD-2040', pickup: 'GTB Nagar, Delhi', dropoff: 'Rohini Sector 18, Delhi',
      status: 'Completed', customerName: 'Amitansh Patel', customerPhone: '+91 76543 21098',
      time: '25 min', distance: '8.7 km', earnings: '₹1800', completedTime: '8:20 AM',
      vehicleType: 'Sedan', paymentMethod: 'Card',
    },
  ],
  Rejected: [
    {
      id: 'ORD-2039', pickup: 'Sector 16, Noida', dropoff: 'Indirapuram, Ghaziabad',
      status: 'Rejected', customerName: 'Sneha Joshi', customerPhone: '+91 65432 10987',
      time: '1 hour ago', distance: '22.1 km', reason: 'Too far from current location',
      rejectedTime: '7:30 AM', vehicleType: 'SUV', paymentMethod: 'Cash',
    },
  ],
};

// ── Detail View ───────────────────────────────────────────────────────────────
const BookingDetail = ({ booking, onBack }) => (
  <motion.div variants={pageVariants} initial="hidden" animate="show"
    className="p-6 max-w-2xl mx-auto">
    <button onClick={onBack}
      className="flex items-center gap-2 text-blue-600 text-sm font-semibold mb-6 hover:opacity-70 transition-opacity">
      <MdArrowBack size={18} /> Back to Bookings
    </button>

    {/* Customer + Earnings */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Customer</p>
          <h2 className="text-xl font-bold text-gray-900">{booking.customerName}</h2>
          <p className="text-sm text-gray-500 mt-1">{booking.id}</p>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
            <MdOutlinePhone size={14} className="text-gray-400" />
            {booking.customerPhone}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">Payment: {booking.paymentMethod}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Earnings</p>
          <p className="text-3xl font-bold text-gray-900">{booking.earnings}</p>
          <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[booking.status] || STATUS_STYLE.Active}`}>
            {booking.status}
          </span>
        </div>
      </div>
    </div>

    {/* Route */}
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">Route</p>
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center gap-1 mt-1 flex-shrink-0">
          <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #22C55E', backgroundColor: '#fff' }} />
          <div style={{ width: 1.5, height: 32, background: 'repeating-linear-gradient(to bottom,#9CA3AF 0,#9CA3AF 4px,transparent 4px,transparent 8px)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #EF4444', backgroundColor: '#fff' }} />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Pickup</p>
            <p className="text-sm font-semibold text-gray-800">{booking.pickup}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Drop-off</p>
            <p className="text-sm font-semibold text-gray-800">{booking.dropoff}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Trip Info */}
    {booking.service && (
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">Trip Details</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Service', value: booking.service },
            { label: 'Estimated Load', value: booking.estimatedLoad },
            { label: 'Schedule', value: booking.schedule },
            { label: 'Distance', value: booking.distance },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-400 mb-0.5">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
        {booking.specialInstructions && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-xs text-amber-700">
              <span className="font-semibold">Note: </span>{booking.specialInstructions}
            </p>
          </div>
        )}
      </div>
    )}

    {/* Actions */}
    <div className="space-y-2.5">
      {[
        { label: '🚗 Arrived at Pickup', style: 'bg-blue-600 hover:bg-blue-700 text-white' },
        { label: '🚀 Start Trip', style: 'bg-blue-600 hover:bg-blue-700 text-white' },
        { label: '✅ Complete Trip', style: 'bg-green-600 hover:bg-green-700 text-white' },
        { label: '❌ Cancel Trip', style: 'bg-white hover:bg-red-50 text-red-500 border border-red-200' },
      ].map(({ label, style }) => (
        <button key={label} className={`w-full py-3 px-5 rounded-xl font-semibold text-sm transition-colors ${style}`}>
          {label}
        </button>
      ))}
    </div>
  </motion.div>
);

// ── Booking Card ──────────────────────────────────────────────────────────────
const BookingCard = ({ booking, onOpen, activeTab }) => (
  <motion.div variants={cardVariants}
    className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <span className="text-sm font-bold text-gray-900">{booking.id}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_STYLE[booking.status] || STATUS_STYLE.Active}`}>
          {booking.status}
        </span>
      </div>
      <div className="text-right">
        <p className="text-xs font-semibold text-gray-700">{booking.customerName}</p>
        <p className="text-xs text-gray-400 mt-0.5">{booking.time}</p>
      </div>
    </div>

    {/* Route */}
    <div className="flex items-start gap-3 mb-4">
      <div className="flex flex-col items-center gap-0.5 mt-1 flex-shrink-0">
        <div style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid #22C55E', backgroundColor: '#fff' }} />
        <div style={{ width: 1.5, height: 22, background: 'repeating-linear-gradient(to bottom,#9CA3AF 0,#9CA3AF 3px,transparent 3px,transparent 7px)' }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid #EF4444', backgroundColor: '#fff' }} />
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-semibold text-gray-800 leading-tight">{booking.pickup}</p>
        <p className="text-xs text-gray-400">{booking.distance}</p>
        <p className="text-sm font-semibold text-gray-800 leading-tight">{booking.dropoff}</p>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <div className="flex items-center gap-3">
        {booking.earnings && (
          <span className="text-sm font-bold text-green-600">{booking.earnings}</span>
        )}
        {booking.reason && (
          <span className="text-xs text-red-400">{booking.reason}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {activeTab === 'Active' && (
          <>
            <button className="px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors">
              Decline
            </button>
            <button className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Accept
            </button>
          </>
        )}
        <button onClick={() => onOpen(booking)}
          className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors">
          View →
        </button>
      </div>
    </div>
  </motion.div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const TransportBookings = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedBooking, setSelectedBooking] = useState(null);

  if (selectedBooking) {
    return <BookingDetail booking={selectedBooking} onBack={() => setSelectedBooking(null)} />;
  }

  const list = bookings[activeTab] || [];

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show"
      className="p-6 max-w-3xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Bookings</h1>
        <div className="w-10 h-0.5 bg-blue-600 rounded-full mt-1" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
            {tab}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
              }`}>
              {bookings[tab].length}
            </span>
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="show"
          className="space-y-3">
          {list.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <MdOutlineDirectionsCar size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-600">No {activeTab.toLowerCase()} bookings</p>
              <p className="text-sm text-gray-400 mt-1">New bookings will appear here.</p>
            </div>
          ) : (
            list.map(b => (
              <BookingCard key={b.id} booking={b} onOpen={setSelectedBooking} activeTab={activeTab} />
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TransportBookings;
