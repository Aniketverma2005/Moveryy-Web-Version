import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineDashboard, MdOutlineBook, MdOutlinePeople, MdOutlinePayment,
  MdOutlineInsights, MdOutlineLocalOffer, MdOutlinePerson,
  MdOutlineSettings, MdOutlineStar, MdOutlineLogout, MdMenu, MdClose,
  MdChevronLeft, MdChevronRight, MdOutlineDirectionsCar,
  MdOutlineDiscount,
} from 'react-icons/md';
import logo from '../../assets/logo2.png';
import authService from '../../services/authService folder/authService';

const navItems = [
  { name: 'Dashboard', icon: MdOutlineDashboard, path: '/admin' },
  { name: 'Bookings', icon: MdOutlineBook, path: '/admin/bookings' },
  { name: 'Users', icon: MdOutlinePeople, path: '/admin/users' },
  { name: 'Vehicles', icon: MdOutlineDirectionsCar, path: '/admin/transport' },
  { name: 'Payment', icon: MdOutlinePayment, path: '/admin/payment' },
  { name: 'Analytics', icon: MdOutlineInsights, path: '/admin/analytics' },
  { name: 'Offers',          icon: MdOutlineLocalOffer,   path: '/admin/offers'         },
  { name: 'Vehicle Offers',  icon: MdOutlineDiscount,     path: '/admin/vehicle-offers' },
  { name: 'Profile', icon: MdOutlinePerson, path: '/admin/profile' },
  { name: 'Reviews', icon: MdOutlineStar, path: '/admin/reviews' },
  { name: 'Settings', icon: MdOutlineSettings, path: '/admin/settings' },
];

const sidebarVariants = {
  open: { width: 256, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { width: 72, transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const userName = storedUser?.firstName
    ? storedUser.firstName.charAt(0).toUpperCase() + storedUser.firstName.slice(1)
    : 'Admin';
  const userEmail = storedUser?.email || 'admin@moveryy.com';
  const initials = userName.charAt(0).toUpperCase();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-blue-500/30 ${collapsed && !isMobile ? 'justify-center' : ''}`}>
        <img src={logo} alt="Moveryy" className="h-9 w-auto object-contain flex-shrink-0" />
        <AnimatePresence>
          {(!collapsed || isMobile) && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-white font-bold text-lg whitespace-nowrap overflow-hidden"
            >
              Moveryy
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isEnd = item.path === '/admin';
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={isEnd}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                                ${isActive
                  ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/20'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }
                                ${collapsed && !isMobile ? 'justify-center' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/20 rounded-xl backdrop-blur-sm border border-white/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={20} className="relative z-10 flex-shrink-0" />
                  <AnimatePresence>
                    {(!collapsed || isMobile) && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {/* Tooltip when collapsed */}
                  {collapsed && !isMobile && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div className={`p-3 border-t border-blue-500/30 ${collapsed && !isMobile ? 'flex justify-center' : ''}`}>
        {(!collapsed || isMobile) ? (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/10 mb-2">
            <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-semibold truncate">{userName}</p>
              <p className="text-blue-200 text-xs truncate">{userEmail}</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm mb-2">
            {initials}
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-blue-100 hover:bg-white/10 hover:text-white transition-all text-sm font-medium ${collapsed && !isMobile ? 'justify-center' : ''}`}
        >
          <MdOutlineLogout size={18} className="flex-shrink-0" />
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile header ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Moveryy" className="h-8 w-auto object-contain" />
          <span className="font-bold text-gray-900">Moveryy</span>
        </div>
        <button onClick={() => setMobileOpen(v => !v)} className="p-2 rounded-lg hover:bg-gray-100">
          {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-blue-600 shadow-2xl lg:hidden"
          >
            <SidebarContent isMobile />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ── */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? 'closed' : 'open'}
        className="hidden lg:flex flex-col bg-blue-600 sticky top-0 h-screen overflow-hidden flex-shrink-0 shadow-xl"
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(v => !v)}
          className="absolute top-1/2 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors z-10"
        >
          {collapsed
            ? <MdChevronRight size={14} className="text-blue-600" />
            : <MdChevronLeft size={14} className="text-blue-600" />
          }
        </button>
      </motion.aside>

      {/* Mobile spacer */}
      <div className="h-14 lg:hidden" />
    </>
  );
};

export default Sidebar;
