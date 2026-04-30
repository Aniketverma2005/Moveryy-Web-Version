import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineNotifications, MdOutlinePerson, MdMenu, MdClose,
} from 'react-icons/md';
import logo from '../assets/logo2.png';

const navItems = [
  { name: 'Home', path: '/', end: true },
  { name: 'About Us', path: '/about', end: false },
  { name: 'Services', path: '/services', end: false },
  { name: 'Compare', path: '/profile', end: false },
  { name: 'Bookings', path: '/bookings', end: false },
  { name: 'Contact Us', path: '/contact', end: false },
];

const UserLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const initials = storedUser?.firstName?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Clean Rapido-style header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo Only - Left */}
            <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
              <img src={logo} alt="Moveryy" className="h-12 w-auto object-contain" />
            </div>

            {/* Desktop nav - Simple text links */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(({ name, path, end }) => (
                <NavLink key={path} to={path} end={end}
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }>
                  {name}
                </NavLink>
              ))}
            </nav>

            {/* Right section - Notifications & Profile */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <MdOutlineNotifications size={24} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
                {initials}
              </div>
              <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(v => !v)}>
                {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
              </button>
            </div>
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
                {navItems.map(({ name, path, end }) => (
                  <NavLink key={path} to={path} end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-base font-medium transition-all ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }>
                    {name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Page content */}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
