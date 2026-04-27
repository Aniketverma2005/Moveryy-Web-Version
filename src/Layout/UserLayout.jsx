import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineSearch, MdOutlineNotifications, MdOutlineHome,
  MdOutlineCompareArrows, MdOutlineBookmarks, MdOutlinePerson,
  MdMenu, MdClose,
} from 'react-icons/md';
import logo from '../assets/logo2.png';

const navItems = [
  { name: 'Home', path: '/', icon: MdOutlineHome, end: true },
  { name: 'Compare', path: '/compare', icon: MdOutlineCompareArrows, end: false },
  { name: 'Bookings', path: '/bookings', icon: MdOutlineBookmarks, end: false },
  { name: 'Profile', path: '/profile', icon: MdOutlinePerson, end: false },
];

const UserLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const initials = storedUser?.firstName?.charAt(0)?.toUpperCase() || 'U';
  const userName = storedUser?.firstName
    ? storedUser.firstName.charAt(0).toUpperCase() + storedUser.firstName.slice(1)
    : 'User';

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Full-width sticky header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        {/* Full width — no max-w constraint */}
        <div className="w-full px-8 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <img src={logo} alt="Moveryy" className="h-10 w-auto object-contain" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-lg font-bold text-gray-900">Moverryy</span>
              <span className="text-xs text-gray-400">Your moving partner</span>
            </div>
          </div>

          {/* Desktop nav — bigger text, more padding */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {navItems.map(({ name, path, icon: Icon, end }) => (
              <NavLink key={path} to={path} end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-6 py-2.5 rounded-xl text-base font-semibold transition-all duration-200 ${isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }>
                <Icon size={18} />
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Search + profile */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative hidden lg:block">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search movers, services..."
                className="w-64 pl-10 pr-4 py-2.5 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
              <MdOutlineNotifications size={22} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-blue-700 transition-colors">
              {initials}
            </div>
            <button className="md:hidden p-2 rounded-xl hover:bg-slate-100" onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white">
              <div className="px-6 py-4 flex flex-col gap-2">
                {navItems.map(({ name, path, icon: Icon, end }) => (
                  <NavLink key={path} to={path} end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-5 py-3 rounded-xl text-base font-semibold transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`
                    }>
                    <Icon size={20} />
                    {name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content — full width, no max-w, no side margins */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
