import { useState, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineNotifications, MdOutlinePerson, MdMenu, MdClose,
  MdSearch, MdKeyboardArrowDown,
} from 'react-icons/md';
import logo from '../assets/logo2.png';

const navItems = [
  { name: 'Home',       path: '/',         end: true,  sectionId: 'section-home' },
  { name: 'About Us',   path: '/',         end: false, sectionId: 'section-about' },
  { name: 'Services',   path: '/',         end: false, sectionId: 'section-services', hasDropdown: true },
  { name: 'Blog',       path: '/blog',     end: false, sectionId: null },
  { name: 'Careers',    path: '/careers',  end: false, sectionId: null },
  { name: 'Press',      path: '/press',    end: false, sectionId: null },
  { name: 'Contact Us', path: '/',         end: false, sectionId: 'section-contact' },
];

const UserLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const hoverTimer = useRef(null);

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const initials = storedUser?.firstName?.charAt(0)?.toUpperCase() || null;

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm overflow-hidden">

        {/* Dot-pattern left */}
        <div className="absolute left-0 top-0 bottom-0 w-36 pointer-events-none select-none opacity-25"
          style={{ backgroundImage: 'radial-gradient(circle, #93C5FD 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        {/* Dot-pattern right */}
        <div className="absolute right-0 top-0 bottom-0 w-36 pointer-events-none select-none opacity-25"
          style={{ backgroundImage: 'radial-gradient(circle, #93C5FD 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

        <div className="relative w-full px-5 h-16 flex items-center justify-between">

          {/* Logo only — no tagline text */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => {
              if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
              else navigate('/');
            }}
          >
            <img src={logo} alt="Moveryy" className="h-11 w-auto object-contain" />
          </div>

          {/* Desktop nav — all items same style */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onMouseEnter={() => handleHover(item)}
                onMouseLeave={handleHoverEnd}
                onClick={(e) => handleClick(e, item)}
                className={({ isActive }) => {
                  // Only highlight as active if this item has its own unique route (no sectionId)
                  const showActive = !item.sectionId && isActive;
                  return `relative flex items-center gap-0.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    showActive
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`;
                }}
              >
                {({ isActive }) => {
                  const showActive = !item.sectionId && isActive;
                  return (
                    <>
                      {item.name}
                      {item.hasDropdown && <MdKeyboardArrowDown size={14} className="opacity-50 mt-px" />}
                      {showActive && (
                        <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                      )}
                    </>
                  );
                }}
              </NavLink>
            ))}
          </nav>

          {/* Right actions — search + bell + avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <MdSearch size={19} />
            </button>

            {/* Bell with count */}
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
              <MdOutlineNotifications size={21} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px] font-bold leading-none">2</span>
            </button>

            {/* Profile avatar */}
            <NavLink to="/profile">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer flex-shrink-0">
                {storedUser?.avatar ? (
                  <img src={storedUser.avatar} alt="profile" className="w-full h-full rounded-full object-cover" />
                ) : initials ? initials : (
                  <MdOutlinePerson size={20} />
                )}
              </div>
            </NavLink>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-gray-100 px-5 py-3">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                <MdSearch size={17} className="text-gray-400 flex-shrink-0" />
                <input autoFocus type="text" placeholder="Search services, locations..."
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none" />
                <button onClick={() => setSearchOpen(false)}>
                  <MdClose size={15} className="text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white">
              <div className="px-5 py-4 flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.end}
                    onClick={(e) => handleClick(e, item)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
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
