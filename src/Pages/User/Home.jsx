import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdOutlineStar,
  MdOutlineKeyboardArrowRight, MdOutlineLocalShipping,
  MdOutlineSearch
} from 'react-icons/md';
import userService from '../../services/userService';
import houseShiftIcon from '../../assets/houseshift.png'; // Import the house shift icon
import carMovingIcon from '../../assets/carmoving.png'; // Import the car moving icon
import officeShiftIcon from '../../assets/officeshift.png'; // Import the office shift icon
import storageIcon from '../../assets/storage.png'; // Import the storage icon
import moveryyGoIcon from '../../assets/moveryygo.png'; // Import the moveryy go icon
import ridesIcon from '../../assets/rides.png'; // Import the rides icon
import ourServicesImage from '../../assets/ourservicesimage.png'; // Import the our services image
import logo from '../../assets/logo2.png'; // Import the Moveryy logo

// ── Custom SVG Icons (More realistic and attractive) ─────────────────────────
const HouseIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10">
    {/* Shadow */}
    <ellipse cx="50" cy="95" rx="40" ry="3" fill="currentColor" opacity="0.1" />

    {/* Truck body - main container */}
    <rect x="10" y="35" width="80" height="45" rx="3" fill="#60A5FA" />

    {/* Truck cabin top */}
    <rect x="10" y="25" width="80" height="12" rx="2" fill="#93C5FD" />

    {/* Red straps/bands on top */}
    <rect x="25" y="28" width="15" height="6" rx="1" fill="#EF4444" />
    <rect x="60" y="28" width="15" height="6" rx="1" fill="#EF4444" />

    {/* Door opening (darker section) */}
    <rect x="35" y="42" width="30" height="38" fill="#4B5563" />

    {/* Box inside truck */}
    <rect x="40" y="52" width="20" height="20" rx="1" fill="#FCD34D" />
    <rect x="48" y="52" width="4" height="20" fill="#B45309" />

    {/* Up arrows on box */}
    <path d="M45 66L47 64L49 66" stroke="#B45309" strokeWidth="1.5" fill="none" />
    <path d="M51 66L53 64L55 66" stroke="#B45309" strokeWidth="1.5" fill="none" />
    <line x1="44" y1="68" x2="56" y2="68" stroke="#B45309" strokeWidth="1.5" />

    {/* Truck handles/locks - white */}
    <rect x="15" y="45" width="4" height="8" rx="1" fill="white" opacity="0.8" />
    <rect x="81" y="45" width="4" height="8" rx="1" fill="white" opacity="0.8" />
    <rect x="15" y="60" width="4" height="8" rx="1" fill="white" opacity="0.8" />
    <rect x="81" y="60" width="4" height="8" rx="1" fill="white" opacity="0.8" />

    {/* Bottom section with lights */}
    <rect x="10" y="78" width="80" height="8" rx="2" fill="#93C5FD" />

    {/* Tail lights */}
    <rect x="15" y="80" width="8" height="4" rx="1" fill="#FCD34D" />
    <rect x="23" y="80" width="6" height="4" rx="1" fill="#EF4444" />
    <rect x="71" y="80" width="6" height="4" rx="1" fill="#EF4444" />
    <rect x="77" y="80" width="8" height="4" rx="1" fill="#FCD34D" />

    {/* License plate */}
    <rect x="42" y="80" width="16" height="4" rx="1" fill="white" opacity="0.9" />

    {/* Wheels */}
    <circle cx="25" cy="88" r="6" fill="#4B5563" />
    <circle cx="25" cy="88" r="3" fill="#6B7280" />
    <circle cx="45" cy="88" r="6" fill="#4B5563" />
    <circle cx="45" cy="88" r="3" fill="#6B7280" />
    <circle cx="55" cy="88" r="6" fill="#4B5563" />
    <circle cx="55" cy="88" r="3" fill="#6B7280" />
    <circle cx="75" cy="88" r="6" fill="#4B5563" />
    <circle cx="75" cy="88" r="3" fill="#6B7280" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-10 h-10">
    {/* Shadow */}
    <ellipse cx="40" cy="68" rx="30" ry="3" fill="currentColor" opacity="0.1" />

    {/* Car body bottom */}
    <path d="M15 45C15 43 16 42 18 42H62C64 42 65 43 65 45V58C65 60 64 61 62 61H18C16 61 15 60 15 58V45Z"
      fill="currentColor" opacity="0.2" />

    {/* Car body top */}
    <path d="M22 32C23 30 24 29 26 29H54C56 29 57 30 58 32L62 42H18L22 32Z"
      fill="currentColor" />

    {/* Windows */}
    <path d="M24 32L26 35H37V32H24Z" fill="white" opacity="0.6" />
    <path d="M43 32V35H54L56 32H43Z" fill="white" opacity="0.6" />

    {/* Headlight */}
    <circle cx="60" cy="48" r="2" fill="white" opacity="0.9" />

    {/* Wheels */}
    <circle cx="25" cy="61" r="7" fill="currentColor" />
    <circle cx="25" cy="61" r="4" fill="currentColor" opacity="0.4" />
    <circle cx="25" cy="61" r="2" fill="white" opacity="0.8" />

    <circle cx="55" cy="61" r="7" fill="currentColor" />
    <circle cx="55" cy="61" r="4" fill="currentColor" opacity="0.4" />
    <circle cx="55" cy="61" r="2" fill="white" opacity="0.8" />

    {/* Door line */}
    <line x1="40" y1="35" x2="40" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Handle */}
    <rect x="32" y="48" width="4" height="2" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="44" y="48" width="4" height="2" rx="1" fill="currentColor" opacity="0.6" />
  </svg>
);

const OfficeIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-10 h-10">
    {/* Shadow */}
    <rect x="10" y="70" width="60" height="3" rx="1" fill="currentColor" opacity="0.08" />

    {/* Building base */}
    <rect x="15" y="20" width="50" height="50" rx="2" fill="currentColor" opacity="0.15" />

    {/* Building top */}
    <rect x="15" y="15" width="50" height="10" rx="2" fill="currentColor" />

    {/* Antenna */}
    <rect x="38" y="10" width="4" height="8" rx="1" fill="currentColor" opacity="0.8" />
    <circle cx="40" cy="9" r="2" fill="currentColor" />

    {/* Windows - Row 1 */}
    <rect x="20" y="28" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="30" y="28" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="40" y="28" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="50" y="28" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />

    {/* Windows - Row 2 */}
    <rect x="20" y="38" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="30" y="38" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="40" y="38" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="50" y="38" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />

    {/* Windows - Row 3 */}
    <rect x="20" y="48" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="30" y="48" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="40" y="48" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <rect x="50" y="48" width="7" height="6" rx="1" fill="currentColor" opacity="0.6" />

    {/* Entrance */}
    <rect x="32" y="58" width="16" height="12" rx="1" fill="currentColor" opacity="0.9" />
    <rect x="34" y="60" width="5" height="10" rx="0.5" fill="white" opacity="0.3" />
    <rect x="41" y="60" width="5" height="10" rx="0.5" fill="white" opacity="0.3" />

    {/* Window cross lines */}
    <line x1="23.5" y1="28" x2="23.5" y2="34" stroke="white" strokeWidth="0.5" opacity="0.4" />
    <line x1="33.5" y1="28" x2="33.5" y2="34" stroke="white" strokeWidth="0.5" opacity="0.4" />
  </svg>
);

const StorageIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-10 h-10">
    {/* Shadow */}
    <ellipse cx="40" cy="70" rx="28" ry="3" fill="currentColor" opacity="0.08" />

    {/* Box 1 (Back) */}
    <rect x="45" y="25" width="22" height="20" rx="2" fill="currentColor" opacity="0.3" />
    <rect x="45" y="25" width="22" height="5" rx="1" fill="currentColor" opacity="0.5" />
    <line x1="56" y1="30" x2="56" y2="45" stroke="white" strokeWidth="1" opacity="0.3" />
    <circle cx="50" cy="35" r="1.5" fill="white" opacity="0.6" />

    {/* Box 2 (Middle) */}
    <rect x="25" y="35" width="24" height="22" rx="2" fill="currentColor" opacity="0.4" />
    <rect x="25" y="35" width="24" height="6" rx="1" fill="currentColor" opacity="0.6" />
    <line x1="37" y1="41" x2="37" y2="57" stroke="white" strokeWidth="1" opacity="0.3" />
    <circle cx="31" cy="45" r="1.5" fill="white" opacity="0.7" />
    <path d="M40 45L43 47L43 50L40 48V45Z" fill="currentColor" opacity="0.3" />

    {/* Box 3 (Front) */}
    <rect x="13" y="45" width="26" height="24" rx="2" fill="currentColor" />
    <rect x="13" y="45" width="26" height="6" rx="1" fill="currentColor" opacity="0.8" />
    <line x1="26" y1="51" x2="26" y2="69" stroke="white" strokeWidth="1.5" opacity="0.4" />
    <circle cx="19" cy="56" r="2" fill="white" opacity="0.8" />

    {/* Tape on front box */}
    <rect x="15" y="58" width="22" height="2" rx="1" fill="white" opacity="0.2" />

    {/* Labels */}
    <rect x="16" y="62" width="8" height="4" rx="0.5" fill="white" opacity="0.3" />
    <line x1="17" y1="64" x2="23" y2="64" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
  </svg>
);

const RideIcon = () => (
  <svg viewBox="0 0 80 80" fill="none" className="w-10 h-10">
    {/* Shadow */}
    <ellipse cx="40" cy="70" rx="32" ry="3" fill="currentColor" opacity="0.08" />

    {/* Car body */}
    <path d="M15 42C15 40 16 39 18 39H62C64 39 65 40 65 42V54C65 56 64 57 62 57H18C16 57 15 56 15 54V42Z"
      fill="currentColor" opacity="0.2" />

    {/* Car top */}
    <path d="M22 30C23 28 24 27 26 27H54C56 27 57 28 58 30L62 39H18L22 30Z"
      fill="currentColor" />

    {/* Windows with people silhouettes */}
    <path d="M24 30L26 33H37V30H24Z" fill="white" opacity="0.5" />
    <path d="M43 30V33H54L56 30H43Z" fill="white" opacity="0.5" />

    {/* Driver (front) */}
    <circle cx="30" cy="31" r="2.5" fill="currentColor" opacity="0.7" />
    <path d="M27 34C27 33 28 32 29 32H31C32 32 33 33 33 34V36H27V34Z"
      fill="currentColor" opacity="0.7" />

    {/* Passenger 1 */}
    <circle cx="48" cy="31" r="2.5" fill="currentColor" opacity="0.7" />
    <path d="M45 34C45 33 46 32 47 32H49C50 32 51 33 51 34V36H45V34Z"
      fill="currentColor" opacity="0.7" />

    {/* Wheels */}
    <circle cx="25" cy="57" r="6" fill="currentColor" />
    <circle cx="25" cy="57" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="25" cy="57" r="1.5" fill="white" />

    <circle cx="55" cy="57" r="6" fill="currentColor" />
    <circle cx="55" cy="57" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="55" cy="57" r="1.5" fill="white" />

    {/* Sharing indicator - connecting dots */}
    <circle cx="30" cy="20" r="3" fill="currentColor" opacity="0.6" />
    <circle cx="40" cy="18" r="3" fill="currentColor" opacity="0.6" />
    <circle cx="50" cy="20" r="3" fill="currentColor" opacity="0.6" />
    <path d="M32 21L38 19M42 19L48 21" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="2 2" />

    {/* Headlight */}
    <circle cx="60" cy="45" r="2" fill="white" opacity="0.8" />
  </svg>
);

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    icon: 'image', // Special flag for image icon
    iconSrc: houseShiftIcon, // Image source
    title: 'House Shift',
    description: 'Move Anywhere You Want',
    path: '/house-moving',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
    hoverBg: 'group-hover:bg-blue-500'
  },
  {
    icon: 'image', // Special flag for image icon
    iconSrc: carMovingIcon, // Image source
    title: 'Car Moving',
    description: 'Safe vehicle transportation',
    path: '/car-moving',
    bgColor: 'bg-indigo-500',
    lightBg: 'bg-indigo-50',
    hoverBg: 'group-hover:bg-indigo-500'
  },
  {
    icon: 'image', // Special flag for image icon
    iconSrc: officeShiftIcon, // Image source
    title: 'Office Shifting',
    description: 'Commercial relocation services',
    path: '/office-shifting',
    bgColor: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    hoverBg: 'group-hover:bg-purple-500'
  },
  {
    icon: 'image', // Special flag for image icon
    iconSrc: storageIcon, // Image source
    title: 'Storage',
    description: 'Secure storage solutions',
    path: '/storage',
    bgColor: 'bg-pink-500',
    lightBg: 'bg-pink-50',
    hoverBg: 'group-hover:bg-pink-500'
  },
  {
    icon: 'image', // Special flag for image icon
    iconSrc: moveryyGoIcon, // Image source
    title: 'Moveryy Go',
    description: 'Smart ridepooling & sharing',
    path: '/moveryy-go',
    bgColor: 'bg-cyan-500',
    lightBg: 'bg-cyan-50',
    hoverBg: 'group-hover:bg-cyan-500'
  },
  {
    icon: 'image', // Special flag for image icon
    iconSrc: ridesIcon, // Image source
    title: 'Rides',
    description: 'Cab, Bike & Auto rides',
    path: '/rides',
    bgColor: 'bg-green-500',
    lightBg: 'bg-green-50',
    hoverBg: 'group-hover:bg-green-500',
    iconSize: 'w-18 h-18' // Custom smaller size for rides icon
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  });

  useEffect(() => {
    userService.getCurrentUser().then(u => { if (u) setUser(u); }).catch(() => { });
  }, []);

  const userName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
    : 'there';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Scroll anchors */}
      <div id="section-home" style={{ scrollMarginTop: '72px' }} />

      {/* Hero Section - Optimized */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Simplified decorative background elements - removed blur for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                  India's #1 Moving Platform
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                Welcome back,<br />
                <span className="text-yellow-400">{userName}! 👋</span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Quick, reliable moving services at your doorstep.<br />
                What would you like to move today?
              </p>

              {/* Search Bar - Removed motion for performance */}
              <div className="bg-white rounded-2xl shadow-2xl p-2">
                <div className="flex items-center gap-3 px-4">
                  <MdOutlineSearch size={24} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for moving services, locations..."
                    className="flex-1 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* Quick stats - Removed motion for performance */}
              <div className="mt-8 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <MdOutlineStar size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">4.8★</p>
                    <p className="text-sm text-blue-200">Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                    <MdOutlineLocalShipping size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5000+</p>
                    <p className="text-sm text-blue-200">Partners</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Simplified preview cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Simplified decorative card - removed backdrop-blur for performance */}
                <div className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Service preview cards - removed hover scale for performance */}
                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center p-2">
                          <img src={houseShiftIcon} alt="House Moving" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">House Moving</p>
                          <p className="text-sm text-gray-600">Complete relocation</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-50 rounded-xl flex items-center justify-center p-2">
                          <img src={carMovingIcon} alt="Car Moving" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Car Moving</p>
                          <p className="text-sm text-gray-600">Safe transportation</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center p-2">
                          <img src={officeShiftIcon} alt="Office Shifting" className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">Office Shifting</p>
                          <p className="text-sm text-gray-600">Business relocation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full shadow-xl transform rotate-12">
                  Trusted by 50K+
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      {/* Scroll anchor for Services — offset accounts for sticky navbar height */}
      <div id="section-services" style={{ scrollMarginTop: '72px' }} />

      <div className="w-full py-10" style={{ paddingLeft: 20, paddingRight: 20 }}>
        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Services</h2>
              <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            <Link to="/services" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
              View All
              <MdOutlineKeyboardArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link to={service.path} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 group cursor-pointer h-[180px] flex items-center justify-between overflow-hidden"
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${service.bgColor} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Content wrapper */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    {/* Text content on left */}
                    <div className="flex-1 pr-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {service.description}
                      </p>

                      {/* Arrow indicator */}
                      <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                        <span className="text-sm font-semibold mr-1">Learn more</span>
                        <MdOutlineKeyboardArrowRight size={18} />
                      </div>
                    </div>

                    {/* Icon on right - larger and more prominent */}
                    <div className="flex-shrink-0">
                      <div className={`${service.iconSize || 'w-20 h-20'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {service.icon === 'image' ? (
                          // Render image icon with subtle shadow
                          <div className="relative">
                            <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-300" />
                            <img
                              src={service.iconSrc}
                              alt={service.title}
                              className="relative w-full h-full object-contain drop-shadow-lg"
                            />
                          </div>
                        ) : (
                          // Render SVG component icon
                          <div className={`text-${service.bgColor.split('-')[1]}-600 drop-shadow-md`}>
                            <service.icon />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Moveryy Section */}
        {/* Scroll anchor with navbar offset */}
        <div id="section-about" style={{ scrollMarginTop: '72px' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose Moveryy?</h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              India's first platform offering complete relocation solutions at unbeatable prices with premium service quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 - Best Prices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cheapest Prices</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Get the most competitive rates in the market. We guarantee the lowest prices without compromising on quality.
              </p>
            </motion.div>

            {/* Feature 2 - Complete Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All-in-One Platform</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                From house shifting to car transport, office relocation to storage - everything you need in one place.
              </p>
            </motion.div>

            {/* Feature 3 - Premium Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Best-in-class service with trained professionals, modern equipment, and complete safety assurance.
              </p>
            </motion.div>

            {/* Feature 4 - Trusted Network */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">5000+ Partners</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Verified and trusted network of professional movers across India, ready to serve you 24/7.
              </p>
            </motion.div>
          </div>

          {/* Special Offer Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl p-8 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

            <div className="relative z-10">
              <div className="inline-block bg-white text-yellow-600 text-sm font-bold px-4 py-2 rounded-full mb-4">
                🎉 SPECIAL OFFER
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                India's #1 Moving Platform
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl mx-auto">
                Be the first to experience seamless relocation from anywhere to anywhere at the <span className="font-bold underline">cheapest prices</span> with <span className="font-bold underline">best-in-class service</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/house-moving">
                  <button className="bg-white text-yellow-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                    Book Now
                  </button>
                </Link>
                <Link to="/compare">
                  <button className="bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-700 transition-colors border-2 border-white">
                    Compare Prices
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* What We Offer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16"
        >
          {/* Section Title */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              What Moveryy Offers
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
          </div>

          {/* Three Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Card 1 - Quick Pickup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="group h-full"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Driver illustration */}
                    <div className="relative w-full h-full flex items-center justify-center p-8">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {/* Steering wheel */}
                        <circle cx="100" cy="120" r="40" fill="#1F2937" opacity="0.2" />
                        <circle cx="100" cy="120" r="30" fill="none" stroke="#1F2937" strokeWidth="4" />
                        <line x1="100" y1="90" x2="100" y2="110" stroke="#1F2937" strokeWidth="3" />
                        <line x1="70" y1="120" x2="90" y2="120" stroke="#1F2937" strokeWidth="3" />

                        {/* Driver hands */}
                        <circle cx="75" cy="115" r="8" fill="#FCD34D" />
                        <circle cx="125" cy="115" r="8" fill="#FCD34D" />

                        {/* Person in background */}
                        <circle cx="140" cy="60" r="12" fill="#EC4899" />
                        <rect x="128" y="72" width="24" height="30" rx="4" fill="#EC4899" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Pickup</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pickups within minutes that help you save time on every ride. A Moveryy is always nearby when you need to get moving.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Best Fares */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="group h-full"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Phone with fare illustration */}
                    <div className="relative w-32 h-56 bg-gray-900 rounded-3xl shadow-2xl p-2">
                      <div className="w-full h-full bg-white rounded-2xl p-4 flex flex-col items-center justify-center">
                        <div className="text-center mb-4">
                          <div className="text-xs text-gray-500 mb-1">Your fare</div>
                          <div className="text-3xl font-bold text-gray-900">₹281</div>
                        </div>
                        <div className="w-full h-2 bg-green-500 rounded-full mb-2"></div>
                        <div className="w-full h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                          <div className="text-xs font-bold text-gray-900">Book Now</div>
                        </div>
                      </div>
                    </div>
                    {/* People in background */}
                    <div className="absolute top-8 left-8">
                      <div className="w-12 h-16 bg-blue-600 rounded-lg opacity-40"></div>
                    </div>
                    <div className="absolute bottom-8 right-8">
                      <div className="w-12 h-16 bg-purple-600 rounded-lg opacity-40"></div>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Best Fares</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Affordable prices designed for everyday rides. Travel more, spend less without compromising on comfort.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Never Too Far */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="group h-full"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* Image */}
                <div className="relative h-64 bg-gradient-to-br from-yellow-100 to-orange-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Bike with riders illustration */}
                    <div className="relative">
                      <svg viewBox="0 0 200 150" className="w-48 h-36">
                        {/* Bike */}
                        <ellipse cx="50" cy="120" rx="20" ry="20" fill="#1F2937" />
                        <ellipse cx="50" cy="120" rx="12" ry="12" fill="#4B5563" />
                        <ellipse cx="150" cy="120" rx="20" ry="20" fill="#1F2937" />
                        <ellipse cx="150" cy="120" rx="12" ry="12" fill="#4B5563" />

                        {/* Bike body */}
                        <path d="M50 120 L80 80 L120 80 L150 120" stroke="#2563EB" strokeWidth="4" fill="none" />
                        <rect x="75" y="75" width="50" height="30" rx="4" fill="#3B82F6" />

                        {/* Riders */}
                        <circle cx="85" cy="60" r="10" fill="#1E40AF" />
                        <rect x="78" y="70" width="14" height="20" rx="3" fill="#1E40AF" />

                        <circle cx="115" cy="60" r="10" fill="#EC4899" />
                        <rect x="108" y="70" width="14" height="20" rx="3" fill="#EC4899" />

                        {/* Helmets */}
                        <path d="M80 55 Q85 45 90 55" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
                        <path d="M110 55 Q115 45 120 55" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1" />
                      </svg>

                      {/* Bus in background */}
                      <div className="absolute top-0 right-0 w-20 h-12 bg-yellow-500 rounded-lg opacity-30"></div>
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Never Too Far</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Present across 400+ cities and counting. Wherever you go, find a Moveryy ride close by.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Earn with Moveryy + Stats — full width with 16px side gap */}
      <div style={{ paddingLeft: 20, paddingRight: 20 }} className="mt-10 space-y-6">

          {/* Earn with Moveryy Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-[#2B5AA0] rounded-3xl overflow-hidden shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12 md:p-16">
              {/* Left side - Image without border */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="relative"
              >
                <motion.img
                  src={ourServicesImage}
                  alt="Moveryy Services - Auto, Bike, and Car"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Right side - Content with animations */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="space-y-7"
              >
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight"
                  >
                    Earn with Moveryy
                  </motion.h2>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "7rem" }}
                    transition={{ duration: 0.6, delay: 1.7 }}
                    className="h-1.5 bg-yellow-400 rounded-full"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                  className="text-xl text-white leading-relaxed font-normal"
                >
                  Become a Moveryy Captain. Ride when you want, work how you want, and earn on your own terms.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.9 }}
                >
                  <Link to="/signup/business">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-yellow-300 transition-colors shadow-xl flex items-center gap-3 group mt-8"
                    >
                      Start Earning
                      <motion.svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">5000+</p>
              <p className="text-blue-100">Trusted Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50,000+</p>
              <p className="text-blue-100">Successful Moves</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.8★</p>
              <p className="text-blue-100">Average Rating</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      {/* Scroll anchor for Contact Us */}
      <div id="section-contact" style={{ scrollMarginTop: '72px' }} />

      {/* ── Made for India branding section ── */}
      <div className="w-full mb-0" style={{ paddingLeft: 20, paddingRight: 20 }}>
        <div className="p-8 text-center relative overflow-hidden">
          {/* Watermark */}
          <p className="absolute inset-0 flex items-center justify-center text-7xl font-black text-gray-100 select-none pointer-events-none tracking-tighter opacity-60">
            #Moveryy
          </p>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India Flag"
                className="w-8 h-auto rounded-sm shadow-sm"
              />
              <h3 className="text-2xl font-black text-blue-700">Made for India</h3>
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span className="text-lg">❤️</span>
              <p className="text-base font-bold text-gray-700">Crafted in Noida</p>
            </div>
            <p className="text-sm text-gray-400 mb-6">India's #1 Moving Platform</p>
            <div className="flex items-center justify-center gap-12">
              <div>
                <p className="text-3xl font-black text-gray-900">5000+</p>
                <p className="text-xs text-gray-500 mt-1">Happy Users</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <p className="text-3xl font-black text-yellow-500">4.8★</p>
                <p className="text-xs text-gray-500 mt-1">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-100 mt-20">
        {/* Main footer content */}
        <div className="w-full py-12" style={{ paddingLeft: 20, paddingRight: 20 }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Col 1 — Logo + contact */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Moveryy</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                India's #1 Moving Platform. Your trusted partner for all relocation needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  +91 97764 93069
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  moveryyy@gmail.com
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                    </svg>
                  </div>
                  www.moveryy.com
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  Gurugram, Haryana, India
                </li>
              </ul>
            </div>

            {/* Col 2 — Company */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Company</h3>
              </div>
              <div className="w-8 h-0.5 bg-blue-500 rounded-full mb-5 ml-10" />
              <ul className="space-y-3">
                {['About Us','Careers','Safety','Blog','News & Media'].map(item => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase().replace(/\s+/g,'-')}`} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Services */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Services</h3>
              </div>
              <div className="w-8 h-0.5 bg-green-500 rounded-full mb-5 ml-10" />
              <ul className="space-y-3">
                {[
                  { label: 'House Shift',       path: '/house-moving' },
                  { label: 'Car Moving',         path: '/car-moving' },
                  { label: 'Office Shifting',    path: '/office-shifting' },
                  { label: 'Rides',              path: '/rides' },
                  { label: 'Packing Services',   path: '/packing' },
                  { label: 'Storage Solutions',  path: '/storage' },
                ].map(s => (
                  <li key={s.label}>
                    <Link to={s.path} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Legal */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Legal</h3>
              </div>
              <div className="w-8 h-0.5 bg-purple-400 rounded-full mb-5 ml-10" />
              <ul className="space-y-3">
                {[
                  { label: 'Terms & Conditions',  path: '/terms' },
                  { label: 'Privacy Policy',       path: '/privacy' },
                  { label: 'Cancellation Policy',  path: '/cancellation' },
                  { label: 'Contact Us',           path: '/contact' },
                ].map(l => (
                  <li key={l.label}>
                    <Link to={l.path} className="text-gray-500 hover:text-blue-600 text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom dark bar */}
        <div className="bg-[#1A2340] w-full">
          <div className="w-full py-5 flex flex-col md:flex-row items-center justify-between gap-4" style={{ paddingLeft: 20, paddingRight: 20 }}>

            {/* Left — shield + safety text */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700/40 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Your Safety, Our Priority</p>
                <p className="text-blue-300 text-xs">Verified partners. Safe relocation.</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/10" />

            {/* Center — copyright */}
            <p className="text-gray-400 text-sm text-center">
              © 2024 Moveryy Transportation.<br className="md:hidden" /> All rights reserved.
            </p>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-white/10" />

            {/* Right — Follow Us + icons */}
            <div className="flex items-center gap-3">
              <span className="text-gray-300 text-sm font-medium">Follow Us</span>
              {/* Instagram */}
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-pink-500/60 flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-red-500/60 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              {/* X */}
              <a href="#" aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full border border-gray-500/60 flex items-center justify-center text-gray-400 hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
