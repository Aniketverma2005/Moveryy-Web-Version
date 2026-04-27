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
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Glassmorphism sticky header ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <img src={logo} alt="Moveryy" className="h-9 w-auto object-contain" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-bold text-gray-900">Moverryy</span>
              <span className="text-[10px] text-gray-400">Your moving partner</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ name, path, icon: Icon, end }) => (
              <NavLink key={path} to={path} end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }>
                <Icon size={16} />
                {name}
              </NavLink>
            ))}
          </nav>

          {/* Search + profile */}
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search movers, services..."
                className="w-56 pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <MdOutlineNotifications size={20} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-blue-700 transition-colors">
              {initials}
            </div>
            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-xl hover:bg-slate-100" onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
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
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-md"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {navItems.map(({ name, path, icon: Icon, end }) => (
                  <NavLink key={path} to={path} end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`
                    }>
                    <Icon size={18} />
                    {name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
