import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  MdOutlineInsights, MdOutlineAttachMoney, MdOutlinePerson,
  MdOutlineAccessTime, MdAdd, MdPeople, MdTrendingUp, MdTrendingDown,
} from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { TbChartArcs } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../../features/dashboard/dashboardSlice';

// --- Animation variants ---
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
};

// --- Sub-components ---
const MetricCard = ({ title, value, change, icon, trend }) => {
  const isPositive = trend !== 'down';
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.10)' }}
      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-blue-50">{icon}</div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
          isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
        }`}>
          {isPositive ? <MdTrendingUp size={12} /> : <MdTrendingDown size={12} />}
          {change || '0%'}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value || '0'}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </motion.div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: 'bg-blue-100 text-blue-600',
    pending: 'bg-yellow-100 text-yellow-600',
    'in-progress': 'bg-green-100 text-green-600',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-500',
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${map[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const TableRow = ({ bookingId, customer, route, date, status, amount, index }) => (
  <motion.tr
    variants={tableRowVariants}
    className={`border-b border-gray-50 hover:bg-blue-50/40 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
  >
    <td className="py-3.5 px-4 text-sm font-semibold text-blue-600">{bookingId}</td>
    <td className="py-3.5 px-4">
      <p className="text-sm font-semibold text-gray-800">{customer?.name || 'N/A'}</p>
      <p className="text-xs text-gray-400">{customer?.phone || ''}</p>
    </td>
    <td className="py-3.5 px-4 text-sm text-gray-600 hidden sm:table-cell">{route}</td>
    <td className="py-3.5 px-4 hidden md:table-cell">
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <MdOutlineAccessTime size={14} />
        {date}
      </div>
    </td>
    <td className="py-3.5 px-4"><StatusBadge status={status} /></td>
    <td className="py-3.5 px-4 text-sm font-bold text-gray-800">{amount}</td>
    <td className="py-3.5 px-4">
      <div className="flex gap-2">
        <button className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">View</button>
      </div>
    </td>
  </motion.tr>
);

const Skeleton = () => (
  <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-pulse">
    <div className="h-7 w-40 bg-gray-200 rounded-lg" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl" />)}
    </div>
    <div className="h-72 bg-gray-200 rounded-2xl" />
  </div>
);

// --- Main Page ---
const DashboardPage = () => {
  const dispatch = useDispatch();
  
  // 1. Added default empty objects/arrays to prevent .map() crashes
  const { 
    stats = [], 
    bookings = [], 
    company = {}, 
    loading = false, 
    error = null 
  } = useSelector(state => state.dashboard || {});

  useEffect(() => {
    // 2. Wrap dispatch in a conditional if you only want to load once
    dispatch(getDashboardData());
  }, [dispatch]);

  // 3. Memoized icons to prevent re-creation on every render
  const statIcons = useMemo(() => [
    <HiOutlineDocumentText size={20} className="text-blue-600" />,
    <TbChartArcs size={20} className="text-blue-600" />,
    <MdOutlineAttachMoney size={20} className="text-blue-600" />,
    <MdOutlinePerson size={20} className="text-blue-600" />,
  ], []);

  if (loading) return <Skeleton />;
  
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
      <p className="text-lg font-semibold">{error}</p>
      <button 
        onClick={() => dispatch(getDashboardData())}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-7"
      >
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Welcome back! Here's your business overview.</p>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7"
      >
        {stats.map((item, i) => (
          <MetricCard 
            key={i} 
            {...item} 
            icon={statIcons[i] || <MdOutlineInsights size={20} className="text-blue-600" />} 
          />
        ))}
      </motion.div>

      {/* Bookings Table */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="show"
        className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden"
      >
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100">
                {['Booking', 'Customer', 'Route', 'Date', 'Status', 'Amount', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody variants={containerVariants} initial="hidden" animate="show">
              {bookings.length > 0 ? (
                bookings.map((b, i) => <TableRow key={b.bookingId || i} {...b} index={i} />)
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-gray-400 text-sm">No recent bookings found.</td>
                </tr>
              )}
            </motion.tbody>
          </table>
        </div>
      </motion.div>

      {/* Bottom Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={cardVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { to: '/admin/bookings', icon: MdAdd, label: 'Add New Booking' },
              { to: '/admin/analytics', icon: MdOutlineInsights, label: 'View Analytics' },
              { to: '/admin/users', icon: MdPeople, label: 'Manage Team' },
            ].map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 group transition-all">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <Icon size={16} className="text-blue-600 group-hover:text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Company Overview</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
              {company?.name?.[0] || 'M'}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{company?.name || 'Moveryy'}</h3>
              <p className="text-xs text-gray-400">Est. {company?.since || '2024'}</p>
            </div>
          </div>
          <div className="space-y-2">
            {[company?.email, company?.phone, company?.cities].filter(Boolean).map((v, i) => (
              <div key={i} className="text-sm text-gray-600 bg-slate-50 px-3 py-2 rounded-lg">{v}</div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;