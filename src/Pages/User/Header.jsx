import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { MdNotifications, MdOutlinePerson } from 'react-icons/md';
import logo from '../../assets/logo2.png';
import userService from '../../services/userService';

// Map each nav item to the section id it should scroll to on the Home page.
// null means navigate to the route without scrolling.
const navItems = [
  { name: 'Home', path: '/', sectionId: 'section-home' },
  { name: 'About Us', path: '/', sectionId: 'section-about' },
  { name: 'Services', path: '/', sectionId: 'section-services' },
  { name: 'Compare', path: '/compare', sectionId: null },
  { name: 'Bookings', path: '/bookings', sectionId: null },
  { name: 'Blog', path: '/blog', sectionId: null },
  { name: 'Careers', path: '/careers', sectionId: null },
  { name: 'Press', path: '/press', sectionId: null },
  { name: 'Contact Us', path: '/', sectionId: 'section-contact' },
];

const UserNavbar = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  });

  const location = useLocation();
  const navigate = useNavigate();
  const hoverTimerRef = useRef(null);

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

  // Smooth-scroll to a section by id (works whether we're already on '/' or not)
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Called when the cursor enters a nav item
  const handleNavHover = (item) => {
    // Clear any pending timer
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    if (!item.sectionId) return; // No scroll target — do nothing on hover

    hoverTimerRef.current = setTimeout(() => {
      if (location.pathname === '/') {
        // Already on home — just scroll
        scrollToSection(item.sectionId);
      } else {
        // Navigate to home first, then scroll after the page renders
        navigate('/');
        // Give the page a moment to mount before scrolling
        setTimeout(() => scrollToSection(item.sectionId), 300);
      }
    }, 150); // Small delay so accidental passes don't trigger scroll
  };

  const handleNavLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo — click scrolls to top */}
          <div
            className="flex items-center cursor-pointer"
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

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                onMouseEnter={() => handleNavHover(item)}
                onMouseLeave={handleNavLeave}
                onClick={(e) => {
                  // If it's a same-page scroll item and we're already on '/', prevent
                  // full navigation and just scroll
                  if (item.sectionId && location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(item.sectionId);
                  }
                }}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors duration-200 relative group ${isActive
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                {item.name}
                {/* Animated underline on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <MdNotifications size={24} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <NavLink to="/profile">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
                {user?.avatar ? (
                  <img src={user.avatar} alt={displayName} className="w-full h-full rounded-full object-cover" />
                ) : initials !== '?' ? (
                  initials
                ) : (
                  <MdOutlinePerson size={22} />
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
