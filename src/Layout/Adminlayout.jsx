import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineSearch, MdOutlineNotifications, MdOutlineSettings } from 'react-icons/md';
import Sidebar from '../Pages/Admin/AdminSidebar';

const routeTitles = {
  '/admin': 'Dashboard',
  '/admin/bookings': 'Bookings',
  '/admin/users': 'Users',
  '/admin/payment': 'Payments',
  '/admin/analytics': 'Analytics',
  '/admin/offers': 'Offers',
  '/admin/profile': 'Profile',
  '/admin/reviews': 'Reviews',
  '/admin/settings': 'Settings',
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, x: 16 },
  enter: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 280, damping: 28 } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.18, ease: 'easeIn' } },
};

const AdminLayout = () => {
  const location = useLocation();
  const title = routeTitles[location.pathname] || 'Admin';

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const initials = storedUser?.firstName?.charAt(0)?.toUpperCase() || 'A';
  const userName = storedUser?.firstName
    ? storedUser.firstName.charAt(0).toUpperCase() + storedUser.firstName.slice(1)
    : 'Admin';

  return (
    // h-screen + overflow-hidden on root → sidebar and main fill exactly the viewport
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar />

      {/* Right column — header + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Glassmorphism sticky header ── */}
        <header className="flex-shrink-0 bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm z-30">
          <div className="flex items-center justify-between px-6 h-14 gap-4">

            {/* Animated page title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={title}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-bold text-gray-900 hidden sm:block flex-shrink-0"
              >
                {title}
              </motion.h1>
            </AnimatePresence>

            {/* Search */}
            <div className="flex-1 max-w-sm relative">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <MdOutlineNotifications size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <MdOutlineSettings size={20} className="text-gray-600" />
              </button>
              <div className="flex items-center gap-2 pl-1">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-blue-700 transition-colors">
                  {initials}
                </div>
                <span className="text-sm font-semibold text-gray-700 hidden lg:block">{userName}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Scrollable page content with route transition ── */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
