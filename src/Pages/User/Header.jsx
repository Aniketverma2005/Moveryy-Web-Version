import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTruckMoving } from 'react-icons/fa';
import { MdOutlineSearch, MdOutlinePerson } from 'react-icons/md';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Compare', path: '/compare' },
  { name: 'Bookings', path: '/bookings' },
  { name: 'Profile', path: '/profile' },
];

const UserNavbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo and Tagline */}
        <div className="flex items-center space-x-2">
           <img
          src='https://cdn.builder.io/api/v1/image/assets%2Fedfca2118e984450847883734a84c956%2F6c93f3a4f0d042dea632ae436c11d7b1?format=webp&width=800'
          alt="Moverryy Logo"
          className="w-10 h-10 object-contain"
        />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-gray-800">Moverryy</span>
            <span className="text-xs text-gray-500">Your moving partner</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150
                ${isActive
                  ? 'bg-blue-500 text-white' // Active state matches the bright blue button style
                  : 'text-gray-700 hover:text-blue-400'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Search and Profile Icon */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <MdOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search movers, services..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
            />
          </div>

          {/* Profile Icon */}
          <button className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center border-2 border-blue-600 hover:border-blue-700 transition-all duration-200">
            <MdOutlinePerson size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;