import { NavLink } from 'react-router-dom';
import { MdOutlineSearch, MdOutlinePerson } from 'react-icons/md';
import logo from '../../assets/logo2.png';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Compare', path: '/compare' },
  { name: 'Bookings', path: '/bookings' },
  { name: 'Profile', path: '/profile' },
];

const UserNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="w-full px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={logo} alt="Moveryy Logo" className="h-10 w-auto object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-900">Moverryy</span>
            <span className="text-xs text-gray-400">Your moving partner</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-5 py-2 text-base font-semibold rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-[#4285F4] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#4285F4] hover:bg-blue-50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Search + Profile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search movers, services..."
              className="w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all duration-200 bg-gray-50"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-[#4285F4] text-white flex items-center justify-center border-2 border-[#3367D6] hover:bg-[#3367D6] transition-all duration-200 shadow-sm">
            <MdOutlinePerson size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
