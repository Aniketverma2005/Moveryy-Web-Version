import { useState, useEffect } from 'react';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineCalendarToday, MdOutlineAccessTime,
  MdOutlineLocalShipping, MdOutlineKeyboardArrowRight, MdOutlineBusinessCenter,
} from 'react-icons/md';
import { api } from '../../services/api';

// ── Fetch bookings from API ───────────────────────────────────────────────────
const fetchBookingsFromAPI = async () => {
  const response = await api.get('/api/v1/bookings');
  return response?.bookings || response?.data?.bookings || response?.data || [];
};

// ── Normalize API booking → UI shape ─────────────────────────────────────────
const normalizeBooking = (b) => {
  const status = (b?.status || '').toLowerCase();
  const uiStatus = ['upcoming', 'confirmed', 'pending'].includes(status) ? 'Upcoming'
    : status === 'completed' ? 'Past'
      : status === 'cancelled' ? 'Cancelled'
        : 'Upcoming';

  const badge = status === 'confirmed' ? 'Confirmed'
    : status === 'completed' ? 'Completed'
      : status === 'cancelled' ? 'Cancelled'
        : status === 'pending' ? 'Pending'
          : 'Confirmed';

  const serviceType = b?.serviceType || b?.service || 'House Moving';
  const icon = serviceType.toLowerCase().includes('car')
    ? <MdOutlineDirectionsCar size={20} className="text-gray-600" />
    : serviceType.toLowerCase().includes('office')
      ? <MdOutlineBusinessCenter size={20} className="text-gray-600" />
      : <MdOutlineHome size={20} className="text-gray-600" />;

  const price = b?.pricing?.total ?? b?.totalAmount ?? b?.price ?? 0;
  const formattedPrice = price ? `₹${Number(price).toLocaleString('en-IN')}` : 'N/A';

  const scheduledDate = b?.scheduledDate || b?.date || '';
  const formattedDate = scheduledDate
    ? new Date(scheduledDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'TBD';

  return {
    id: b?.id || b?._id,
    mover: b?.organizationName || b?.driverName || b?.mover || 'Mover',
    service: serviceType,
    icon,
    pickup: b?.pickupLocation?.address || b?.pickup || 'N/A',
    drop: b?.dropoffLocation?.address || b?.drop || 'N/A',
    date: formattedDate,
    time: b?.scheduledTime || b?.time || '',
    price: formattedPrice,
    status: uiStatus,
    badge,
    driver: b?.assignedDriver || null,
  };
};

// ── Components ────────────────────────────────────────────────────────────────
const TabItem = ({ title, count, isActive, onClick }) => (
  <button onClick={onClick}
    className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors duration-150 relative ${isActive ? 'bg-[#4285F4] text-white' : 'text-gray-600 hover:text-gray-800'
      }`}>
    {title}
    <span className="ml-2 text-xs opacity-80">{count}</span>
  </button>
);

const BookingCard = ({ booking }) => {
  const badgeColor = booking.badge === 'Confirmed' || booking.badge === 'Pending'
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

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          <div className="flex flex-col text-sm">
            <span className="text-gray-500 text-xs">PICKUP</span>
            <span className="text-gray-700 font-medium">{booking.pickup}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
          <div className="flex flex-col text-sm">
            <span className="text-gray-500 text-xs">DROP</span>
            <span className="text-gray-700 font-medium">{booking.drop}</span>
          </div>
        </div>
      </div>

      {/* Driver info if available */}
      {booking.driver && (
        <div className="mb-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700">
          <span className="font-medium">Driver: </span>
          {booking.driver?.name || booking.driver?.firstName || 'Assigned'}
          {booking.driver?.phone && <span className="ml-2 text-gray-500">• {booking.driver.phone}</span>}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MdOutlineCalendarToday size={16} className="mr-1" />
            <span>{booking.date}</span>
          </div>
          {booking.time && (
            <div className="flex items-center">
              <MdOutlineAccessTime size={16} className="mr-1" />
              <span>{booking.time}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-[#4285F4]">{booking.price}</span>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-[#4285F4] border border-[#4285F4] rounded-lg hover:bg-blue-50 transition-colors duration-200">
            View Details <MdOutlineKeyboardArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => (
  <div className="flex justify-center py-12">
    <div className="w-8 h-8 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin" />
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetchBookingsFromAPI()
      .then(data => setBookings((Array.isArray(data) ? data : []).map(normalizeBooking)))
      .catch(err => setError(err?.message || 'Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  const tabs = [
    { id: 'upcoming', title: 'Upcoming', count: bookings.filter(b => b.status === 'Upcoming').length },
    { id: 'past', title: 'Past', count: bookings.filter(b => b.status === 'Past').length },
    { id: 'cancelled', title: 'Cancelled', count: bookings.filter(b => b.status === 'Cancelled').length },
  ];

  const filteredBookings = bookings.filter(b => b.status.toLowerCase() === activeTab);

  return (
    <div className="bg-gray-100 min-h-screen p-6 font-inter">

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-300 mb-6">
        {tabs.map(tab => (
          <TabItem key={tab.id} title={tab.title} count={tab.count}
            isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
        ))}
      </div>

      {loading && <Spinner />}

      {!loading && error && (
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
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
      )}
    </div>
  );
};

export default BookingsPage;
