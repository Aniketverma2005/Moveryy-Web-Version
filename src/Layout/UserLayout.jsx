import { useState, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineNotifications, MdOutlinePerson, MdMenu, MdClose,
} from 'react-icons/md';
import logo from '../assets/logo2.png';

// sectionId = id of the element in Home.jsx to scroll to on hover
// null = normal route navigation, no scroll
const navItems = [
  { name: 'Home', path: '/', end: true, sectionId: 'section-home' },
  { name: 'About Us', path: '/', end: false, sectionId: 'section-about' },
  { name: 'Services', path: '/', end: false, sectionId: 'section-services' },
  { name: 'Compare', path: '/compare', end: false, sectionId: null },
  { name: 'Bookings', path: '/bookings', end: false, sectionId: null },
  { name: 'Contact Us', path: '/', end: false, sectionId: 'section-contact' },
];

const UserLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hoverTimer = useRef(null);

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const initials = storedUser?.firstName?.charAt(0)?.toUpperCase() || 'U';

  // Scroll to a section by id
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // On hover: wait 150ms then scroll (or navigate + scroll)
  const handleHover = (item) => {
    if (!item.sectionId) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      if (location.pathname === '/') {
        scrollToSection(item.sectionId);
      } else {
        navigate('/');
        setTimeout(() => scrollToSection(item.sectionId), 350);
      }
    }, 150);
  };

  const handleHoverEnd = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  // On click: if it's a scroll-target item and we're already on '/', just scroll
  const handleClick = (e, item) => {
    if (item.sectionId && location.pathname === '/') {
      e.preventDefault();
      scrollToSection(item.sectionId);
      setMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer flex-shrink-0"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }}
            >
              <img src={logo} alt="Moveryy" className="h-12 w-auto object-contain" />
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onMouseEnter={() => handleHover(item)}
                  onMouseLeave={handleHoverEnd}
                  onClick={(e) => handleClick(e, item)}
                  className={({ isActive }) =>
                    `relative text-base font-medium transition-colors duration-200 group ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  {item.name}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <MdOutlineNotifications size={24} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <NavLink to="/profile">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
                  {storedUser?.avatar ? (
                    <img src={storedUser.avatar} alt="profile" className="w-full h-full rounded-full object-cover" />
                  ) : initials !== 'U' ? initials : (
                    <MdOutlinePerson size={22} />
                  )}
                </div>
              </NavLink>
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
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.end}
                    onClick={(e) => handleClick(e, item)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.name}
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
