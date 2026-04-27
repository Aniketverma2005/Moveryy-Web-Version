import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineCalendarToday, MdOutlineAccessTime,
  MdOutlineLocalShipping, MdOutlineKeyboardArrowRight, MdOutlineBusinessCenter,
  MdOutlineBookmarks,
} from 'react-icons/md';
import { api } from '../../services/api';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const fetchBookingsFromAPI = async () => {
  const response = await api.get('/api/v1/bookings');
  return response?.bookings || response?.data?.bookings || response?.data || [];
};

const normalizeBooking = (b) => {
  const status = (b?.status || '').toLowerCase();
  const uiStatus = ['upcoming', 'confirmed', 'pending'].includes(status) ? 'Upcoming'
    : status === 'completed' ? 'Past'
      : status === 'cancelled' ? 'Cancelled'
        : 'Upcoming';
  const badge = status === 'confirmed' ? 'Confirmed'
    : status === 'completed' ? 'Completed'
      : status === 'cancelled' ? 'Cancelled'
        : status === 'pending' ? 'Pending' : 'Confirmed';
  const serviceType = b?.serviceType || b?.service || 'House Moving';
  const icon = serviceType.toLowerCase().includes('car')
    ? <MdOutlineDirectionsCar size={18} className="text-gray-500" />
    : serviceType.toLowerCase().includes('office')
      ? <MdOutlineBusinessCenter size={18} className="text-gray-500" />
      : <MdOutlineHome size={18} className="text-gray-500" />;
  const price = b?.pricing?.total ?? b?.totalAmount ?? b?.price ?? 0;
  const formattedPrice = price ? `₹${Number(price).toLocaleString('en-IN')}` : 'N/A';
  const scheduledDate = b?.scheduledDate || b?.date || '';
  const formattedDate = scheduledDate
    ? new Date(scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'TBD';
  return {
    id: b?.id || b?._id, mover: b?.organizationName || b?.driverName || b?.mover || 'Mover',
    service: serviceType, icon, pickup: b?.pickupLocation?.address || b?.pickup || 'N/A',
    drop: b?.dropoffLocation?.address || b?.drop || 'N/A', date: formattedDate,
    time: b?.scheduledTime || b?.time || '', price: formattedPrice,
    status: uiStatus, badge, driver: b?.assignedDriver || null,
  };
};

const badgeStyles = {
  Confirmed: 'bg-blue-100 text-blue-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Completed: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-100 text-red-500',
};

const BookingCard = ({ booking }) => (
  <motion.div variants={cardVariants}
    whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineLocalShipping size={20} className="text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-gray-900">{booking.mover}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            {booking.icon}<span className="ml-1">{booking.service}</span>
          </div>
        </div>
      </div>
      <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeStyles[booking.badge] || 'bg-gray-100 text-gray-600'}`}>
        {booking.badge}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-4">
      {[{ label: 'PICKUP', val: booking.pickup, color: 'bg-green-500' }, { label: 'DROP', val: booking.drop, color: 'bg-red-500' }].map(({ label, val, color }) => (
        <div key={label} className="flex items-start gap-2 bg-slate-50 rounded-xl p-3">
          <div className={`w-2 h-2 rounded-full ${color} mt-1.5 flex-shrink-0`} />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
            <p className="text-sm font-medium text-gray-700">{val}</p>
          </div>
        </div>
      ))}
    </div>
    {booking.driver && (
      <div className="mb-3 p-3 bg-blue-50 rounded-xl text-sm text-blue-700 font-medium">
        Driver: {booking.driver?.name || booking.driver?.firstName || 'Assigned'}
        {booking.driver?.phone && <span className="ml-2 text-blue-500">• {booking.driver.phone}</span>}
      </div>
    )}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1"><MdOutlineCalendarToday size={14} />{booking.date}</span>
        {booking.time && <span className="flex items-center gap-1"><MdOutlineAccessTime size={14} />{booking.time}</span>}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-blue-600">{booking.price}</span>
        <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
          Details <MdOutlineKeyboardArrowRight size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

const Spinner = () => (
  <div className="flex justify-center py-16">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchBookingsFromAPI()
      .then(data => setBookings((Array.isArray(data) ? data : []).map(normalizeBooking)))
      .catch(err => setError(err?.message || 'Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: bookings.filter(b => b.status === 'Upcoming').length },
    { id: 'past', label: 'Past', count: bookings.filter(b => b.status === 'Past').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'Cancelled').length },
  ];
  const filtered = bookings.filter(b => b.status.toLowerCase() === activeTab);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <MdOutlineBookmarks size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-sm text-gray-500">Track and manage your moving requests</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm w-fit">
        {tabs.map(({ id, label, count }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-blue-600'
              }`}>
            {label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${activeTab === id ? 'bg-white/20' : 'bg-slate-100'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {loading && <Spinner />}
      {!loading && error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">{error}</div>
      )}
      {!loading && !error && (
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {filtered.length > 0
            ? filtered.map(b => <BookingCard key={b.id} booking={b} />)
            : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <MdOutlineBookmarks size={40} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No {activeTab} bookings found.</p>
              </div>
            )
          }
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingsPage;
