import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineBusinessCenter,
  MdOutlineInventory2, MdOutlineLocationOn, MdOutlineStar,
  MdOutlineKeyboardArrowRight, MdOutlineLocalShipping,
  MdTrendingUp, MdTrendingDown, MdOutlineBookmarks,
  MdOutlineCheckCircle, MdOutlineSchedule, MdOutlineCancel,
} from 'react-icons/md';
import userService from '../../services/userService';

// ── Animation variants ────────────────────────────────────────────────────────
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const card = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 22 } },
};

// ── Chart data ────────────────────────────────────────────────────────────────
const spendingData = [
  { month: 'Jan', amount: 1200 }, { month: 'Feb', amount: 800 },
  { month: 'Mar', amount: 2100 }, { month: 'Apr', amount: 1500 },
  { month: 'May', amount: 900 }, { month: 'Jun', amount: 2800 },
  { month: 'Jul', amount: 1700 },
];
const bookingTrendData = [
  { week: 'W1', bookings: 2 }, { week: 'W2', bookings: 5 },
  { week: 'W3', bookings: 3 }, { week: 'W4', bookings: 7 },
  { week: 'W5', bookings: 4 }, { week: 'W6', bookings: 6 },
];
const statusData = [
  { name: 'Completed', value: 8, color: '#22c55e' },
  { name: 'Upcoming', value: 3, color: '#2563eb' },
  { name: 'Cancelled', value: 1, color: '#ef4444' },
];

// ── Services — blue-600 / white only ─────────────────────────────────────────
const services = [
  { icon: MdOutlineHome, title: 'House Moving', description: 'Complete household relocation', path: '/house-moving' },
  { icon: MdOutlineDirectionsCar, title: 'Car Moving', description: 'Safe vehicle transportation', path: '/car-moving' },
  { icon: MdOutlineBusinessCenter, title: 'Office Shifting', description: 'Commercial relocation services', path: '/office-shifting' },
  { icon: MdOutlineInventory2, title: 'Storage', description: 'Secure storage solutions', path: '' },
];

const recentSearches = [
  { from: 'Koramangala', to: 'Whitefield' },
  { from: 'HSR Layout', to: 'Electronic City' },
  { from: 'Indiranagar', to: 'Marathahalli' },
];

// ── Custom tooltips ───────────────────────────────────────────────────────────
const SpendTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg px-5 py-3">
      <p className="text-base font-bold text-gray-700">{label}</p>
      <p className="text-blue-600 font-bold text-lg">₹{payload[0]?.value?.toLocaleString('en-IN')}</p>
    </div>
  );
};
const BarTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-lg px-5 py-3">
      <p className="text-base font-bold text-gray-700">{label}</p>
      <p className="text-blue-600 font-bold text-lg">{payload[0]?.value} bookings</p>
    </div>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon: Icon, iconBg, trend, trendVal }) => (
  <motion.div variants={card}
    whileHover={{ scale: 1.02, boxShadow: '0 12px 36px rgba(37,99,235,0.12)' }}
    className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm cursor-default">
    <div className="flex items-start justify-between mb-5">
      <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-sm`}>
        <Icon size={26} className="text-white" />
      </div>
      <span className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
        }`}>
        {trend === 'up' ? <MdTrendingUp size={15} /> : <MdTrendingDown size={15} />}
        {trendVal}
      </span>
    </div>
    <p className="text-4xl font-extrabold text-gray-900 mb-1">{value}</p>
    <p className="text-base font-semibold text-gray-700">{label}</p>
    {sub && <p className="text-sm text-gray-400 mt-1">{sub}</p>}
  </motion.div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  });
  const [vehicles, setVehicles] = useState([]);
  const [vehicleLoad, setVehicleLoad] = useState(true);

  useEffect(() => {
    userService.getCurrentUser().then(u => { if (u) setUser(u); }).catch(() => { });
  }, []);

  useEffect(() => {
    userService.getAvailableVehicles({ serviceType: 'houseshift', capacityValue: 2, capacityUnit: 'bhk', distance: 10 })
      .then(d => setVehicles(Array.isArray(d) ? d : []))
      .catch(() => { })
      .finally(() => setVehicleLoad(false));
  }, []);

  const userName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
    : 'there';

  const stats = [
    { label: 'Total Bookings', value: '12', sub: 'All time', icon: MdOutlineBookmarks, iconBg: 'bg-blue-600', trend: 'up', trendVal: '+3 this month' },
    { label: 'Completed Moves', value: '8', sub: 'Successfully', icon: MdOutlineCheckCircle, iconBg: 'bg-green-500', trend: 'up', trendVal: '+2 this month' },
    { label: 'Upcoming', value: '3', sub: 'Scheduled', icon: MdOutlineSchedule, iconBg: 'bg-blue-500', trend: 'up', trendVal: 'Next: 3 days' },
    { label: 'Cancelled', value: '1', sub: 'This year', icon: MdOutlineCancel, iconBg: 'bg-red-500', trend: 'down', trendVal: '-1 vs last yr' },
  ];

  const fallbackMovers = [
    { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km', price: '₹1,200' },
    { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km', price: '₹1,150' },
    { name: 'CityMove Pro', rating: 4.6, reviews: 756, distance: '4.2 km', price: '₹1,350' },
  ];

  return (
    <div className="bg-white min-h-screen px-10 py-10 font-sans">

      {/* ── Welcome ── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome back, {userName} 👋</h1>
        <p className="text-gray-500 text-lg mt-2">Here's your moving activity overview.</p>
      </motion.div>

      {/* ── Stat cards ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </motion.div>

      {/* ── Charts row ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* Spending area chart */}
        <motion.div variants={card}
          className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Spending Overview</h2>
              <p className="text-base text-gray-400 mt-0.5">Monthly moving expenses (₹)</p>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full">
              <MdTrendingUp size={16} /> +18% vs last year
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={spendingData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 13, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<SpendTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3}
                fill="url(#blueGrad)" dot={{ fill: '#2563eb', r: 5 }} activeDot={{ r: 7 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Booking status donut */}
        <motion.div variants={card}
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Booking Status</h2>
          <p className="text-base text-gray-400 mb-5">Distribution of all bookings</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={52} outerRadius={78}
                paddingAngle={4} dataKey="value">
                {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-3 mt-4">
            {statusData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-base text-gray-600 font-medium">{name}</span>
                </div>
                <span className="text-base font-extrabold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Booking trend bar chart ── */}
      <motion.div variants={card} initial="hidden" animate="show"
        className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Booking Trend</h2>
            <p className="text-base text-gray-400 mt-0.5">Weekly bookings over the last 6 weeks</p>
          </div>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">Last 6 weeks</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={bookingTrendData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 13, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 13, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<BarTip />} />
            <Bar dataKey="bookings" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Services ── */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Services</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, title, description, path }, i) => {
            const inner = (
              <motion.div variants={card}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(37,99,235,0.15)' }}
                className="bg-blue-600 rounded-3xl p-7 flex flex-col items-center text-center shadow-md cursor-pointer h-full">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Icon size={32} className="text-white" />
                </div>
                <p className="text-lg font-bold text-white">{title}</p>
                <p className="text-blue-100 text-sm mt-1.5 leading-relaxed">{description}</p>
                <div className="mt-4 h-0.5 w-0 bg-white/50 rounded-full group-hover:w-12 transition-all duration-300" />
              </motion.div>
            );
            return path
              ? <Link to={path} key={i} className="block">{inner}</Link>
              : <div key={i} className="opacity-70">{inner}</div>;
          })}
        </div>
      </motion.div>

      {/* ── Bottom row ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent searches */}
        <motion.div variants={card}
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Recent Searches</h2>
          <div className="flex flex-col gap-4">
            {recentSearches.map(({ from, to }, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MdOutlineLocationOn size={20} className="text-blue-600" />
                  </div>
                  <span className="text-base font-semibold text-gray-700">{from} → {to}</span>
                </div>
                <MdOutlineKeyboardArrowRight size={22} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available movers */}
        <motion.div variants={card}
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              {vehicles.length > 0 ? 'Available Movers' : 'Top Rated Movers'}
            </h2>
            <Link to="/compare" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              View all →
            </Link>
          </div>

          {vehicleLoad && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!vehicleLoad && (
            <div className="flex flex-col gap-4">
              {(vehicles.length > 0 ? vehicles.slice(0, 3) : fallbackMovers).map((v, i) => {
                const name = v?.organizationName || v?.name || 'Mover';
                const rating = v?.rating ?? 4.5;
                const reviews = v?.reviews ?? v?.totalReviews ?? 0;
                const distance = v?.distance ? `${v.distance} km` : v?.distance || '—';
                const price = v?.price ?? (v?.basePrice ? `₹${Number(v.basePrice).toLocaleString('en-IN')}` : '₹1,200');
                return (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center">
                        <MdOutlineLocalShipping size={22} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-gray-800">{name}</p>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                          <MdOutlineStar size={14} className="text-yellow-400" />
                          <span>{rating}</span>
                          {reviews > 0 && <span>({reviews})</span>}
                          <span className="text-gray-300">•</span>
                          <span>{distance}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-extrabold text-blue-600">{price}</span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

    </div>
  );
};

export default HomePage;
