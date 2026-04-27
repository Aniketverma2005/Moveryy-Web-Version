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
const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

// ── Mock chart data ───────────────────────────────────────────────────────────
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

// ── Static data ───────────────────────────────────────────────────────────────
const services = [
  { icon: MdOutlineHome, title: 'House Moving', description: 'Complete household relocation', path: '/house-moving', gradient: 'from-blue-600 to-blue-700' },
  { icon: MdOutlineDirectionsCar, title: 'Car Moving', description: 'Safe vehicle transportation', path: '/car-moving', gradient: 'from-green-500 to-green-600' },
  { icon: MdOutlineBusinessCenter, title: 'Office Shifting', description: 'Commercial relocation services', path: '/office-shifting', gradient: 'from-purple-500 to-purple-600' },
  { icon: MdOutlineInventory2, title: 'Storage', description: 'Secure storage solutions', path: '', gradient: 'from-orange-500 to-orange-600' },
];

const recentSearches = [
  { from: 'Koramangala', to: 'Whitefield' },
  { from: 'HSR Layout', to: 'Electronic City' },
  { from: 'Indiranagar', to: 'Marathahalli' },
];

// ── Custom tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-2.5 text-sm">
      <p className="font-bold text-gray-700">{label}</p>
      <p className="text-blue-600 font-semibold">₹{payload[0]?.value?.toLocaleString('en-IN')}</p>
    </div>
  );
};

const BarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-4 py-2.5 text-sm">
      <p className="font-bold text-gray-700">{label}</p>
      <p className="text-blue-600 font-semibold">{payload[0]?.value} bookings</p>
    </div>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon: Icon, iconBg, trend, trendVal }) => (
  <motion.div variants={card}
    whileHover={{ scale: 1.02, boxShadow: '0 10px 32px rgba(0,0,0,0.10)' }}
    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-default">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center`}>
        <Icon size={22} className="text-white" />
      </div>
      <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
        }`}>
        {trend === 'up' ? <MdTrendingUp size={13} /> : <MdTrendingDown size={13} />}
        {trendVal}
      </span>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
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
    { label: 'Upcoming', value: '3', sub: 'Scheduled', icon: MdOutlineSchedule, iconBg: 'bg-purple-500', trend: 'up', trendVal: 'Next: 3 days' },
    { label: 'Cancelled', value: '1', sub: 'This year', icon: MdOutlineCancel, iconBg: 'bg-red-500', trend: 'down', trendVal: '-1 vs last yr' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6 font-sans">

      {/* ── Welcome banner ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="mb-7">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName} 👋</h1>
        <p className="text-gray-500 text-base mt-1">Here's your moving activity overview.</p>
      </motion.div>

      {/* ── Stat cards ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </motion.div>

      {/* ── Charts row ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-7">

        {/* Spending area chart */}
        <motion.div variants={card} className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-gray-900">Spending Overview</h2>
              <p className="text-sm text-gray-400">Monthly moving expenses (₹)</p>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
              <MdTrendingUp size={13} /> +18% vs last year
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={spendingData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2.5}
                fill="url(#blueGrad)" dot={{ fill: '#2563eb', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Booking status pie */}
        <motion.div variants={card} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-1">Booking Status</h2>
          <p className="text-sm text-gray-400 mb-4">Distribution of all bookings</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                paddingAngle={4} dataKey="value">
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3">
            {statusData.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-gray-600">{name}</span>
                </div>
                <span className="font-bold text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Booking trend bar chart ── */}
      <motion.div variants={card} initial="hidden" animate="show"
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Booking Trend</h2>
            <p className="text-sm text-gray-400">Weekly bookings over the last 6 weeks</p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Last 6 weeks</span>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={bookingTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<BarTooltip />} />
            <Bar dataKey="bookings" fill="#2563eb" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ── Services ── */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-7">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Services</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, title, description, path, gradient }, i) => (
            <motion.div key={i} variants={card}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 32px rgba(0,0,0,0.12)' }}>
              {path
                ? <Link to={path} className={`bg-gradient-to-br ${gradient} p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer shadow-md block`}>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                    <Icon size={28} className="text-white" />
                  </div>
                  <p className="font-bold text-white text-sm">{title}</p>
                  <p className="text-white/80 text-xs mt-1">{description}</p>
                </Link>
                : <div className={`bg-gradient-to-br ${gradient} p-5 rounded-2xl flex flex-col items-center text-center cursor-pointer shadow-md opacity-80`}>
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                    <Icon size={28} className="text-white" />
                  </div>
                  <p className="font-bold text-white text-sm">{title}</p>
                  <p className="text-white/80 text-xs mt-1">{description}</p>
                </div>
              }
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom row: Recent searches + Available movers ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-7">

        {/* Recent searches */}
        <motion.div variants={card} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4">Recent Searches</h2>
          <div className="flex flex-col gap-3">
            {recentSearches.map(({ from, to }, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MdOutlineLocationOn size={16} className="text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{from} → {to}</span>
                </div>
                <MdOutlineKeyboardArrowRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available movers */}
        <motion.div variants={card} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">
              {vehicles.length > 0 ? 'Available Movers' : 'Top Rated Movers'}
            </h2>
            <Link to="/compare" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
              View all →
            </Link>
          </div>

          {vehicleLoad && (
            <div className="flex justify-center py-8">
              <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!vehicleLoad && (
            <div className="flex flex-col gap-3">
              {(vehicles.length > 0 ? vehicles.slice(0, 3) : [
                { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km', price: '₹1,200' },
                { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km', price: '₹1,150' },
                { name: 'CityMove Pro', rating: 4.6, reviews: 756, distance: '4.2 km', price: '₹1,350' },
              ]).map((v, i) => {
                const name = v?.organizationName || v?.name || 'Mover';
                const rating = v?.rating ?? 4.5;
                const reviews = v?.reviews ?? v?.totalReviews ?? 0;
                const distance = v?.distance ? `${v.distance} km` : v?.distance || '—';
                const price = v?.price ?? (v?.basePrice ? `₹${Number(v.basePrice).toLocaleString('en-IN')}` : '₹1,200');
                return (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                        <MdOutlineLocalShipping size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MdOutlineStar size={12} className="text-yellow-400" />
                          <span>{rating}</span>
                          {reviews > 0 && <span>({reviews})</span>}
                          <span className="text-gray-300">•</span>
                          <span>{distance}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-base font-bold text-blue-600">{price}</span>
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
