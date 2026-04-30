import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MdNotifications, MdOutlinePerson } from 'react-icons/md';
import logo from '../../assets/logo2.png';
import userService from '../../services/userService';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Compare', path: '/compare' },
  { name: 'Bookings', path: '/bookings' },
  { name: 'Contact Us', path: '/contact' },
];

const UserNavbar = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  });

  // Fetch fresh profile on mount
  useEffect(() => {
    userService.getCurrentUser()
      .then(u => { if (u) setUser(u); })
      .catch(() => { });
  }, []);

  const initials = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : user?.name?.charAt(0)?.toUpperCase() || '?';

  const displayName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
    : user?.name || '';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Only - Left */}
          <div className="flex items-center cursor-pointer">
            <img src={logo} alt="Moveryy" className="h-12 w-auto object-contain" />
          </div>

          {/* Navigation Links - Center/Right */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-gray-900 font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section - Notifications & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <MdNotifications size={24} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-full h-full rounded-full object-cover" />
              ) : initials !== '?' ? (
                initials
              ) : (
                <MdOutlinePerson size={22} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
