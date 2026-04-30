import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineBusinessCenter,
  MdOutlineInventory2, MdOutlineLocationOn, MdOutlineStar,
  MdOutlineKeyboardArrowRight, MdOutlineLocalShipping,
  MdOutlineCommute
} from 'react-icons/md';
import userService from '../../services/userService';

// ── Animation variants ────────────────────────────────────────────────────────
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

// ── Services — Added Moveryy Go ──────────────────────────────────────────────
const services = [
  { icon: MdOutlineHome, title: 'House Moving', description: 'Complete household relocation', path: '/house-moving' },
  { icon: MdOutlineDirectionsCar, title: 'Car Moving', description: 'Safe vehicle transportation', path: '/car-moving' },
  { icon: MdOutlineBusinessCenter, title: 'Office Shifting', description: 'Commercial relocation services', path: '/office-shifting' },
  { icon: MdOutlineInventory2, title: 'Storage', description: 'Secure storage solutions', path: '/storage' },
  { icon: MdOutlineCommute, title: 'Moveryy Go', description: 'Smart ridepooling & sharing', path: '/moveryy-go' },
];

const recentSearches = [
  { from: 'Koramangala', to: 'Whitefield' },
  { from: 'HSR Layout', to: 'Electronic City' },
  { from: 'Indiranagar', to: 'Marathahalli' },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  });
  const [vehicles, setVehicles] = useState([]);
  const [vehicleLoad, setVehicleLoad] = useState(true);

  // State to track which service card is hovered for the smooth pop-out effect
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    userService.getCurrentUser().then(u => { if (u) setUser(u); }).catch(() => { });
  }, []);

  useEffect(() => {
    userService.getAvailableVehicles({ serviceType: 'houseshift', capacityValue: 2, capacityUnit: 'bhk', distance: 10 })
      .then(d => setVehicles(Array.isArray(d) ? d : []))
      .catch(() => { })
      .finally(() => setVehicleLoad(false));
  }, []);

  const userName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
    : 'there';

  const fallbackMovers = [
    { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km', price: '₹1,200' },
    { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km', price: '₹1,150' },
    { name: 'CityMove Pro', rating: 4.6, reviews: 756, distance: '4.2 km', price: '₹1,350' },
  ];

  return (
    <div className="bg-white min-h-screen px-8 py-8 font-sans">
      {/* ── Custom Styles for Water Flow & Wandering Bubble Animations ── */}
      <style>{`
        /* Water flow for bottom cards */
        @keyframes waterFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .water-flow-card {
          position: relative;
          overflow: hidden;
          background-color: #eff6ff; 
          border: 1px solid #bfdbfe; 
          transition: all 0.3s ease;
        }
        .water-flow-card:hover {
          border-color: #60a5fa; 
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.15);
          transform: translateY(-2px);
        }
        .water-flow-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.25), transparent);
          width: 100%;
          animation: waterFlow 2.5s infinite linear;
          pointer-events: none;
          z-index: 0;
        }
        .water-flow-content {
          position: relative;
          z-index: 10;
        }

        /* Multi-directional wandering bubbles for the Services Banner */
        @keyframes floatBubble1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(180px, 90px) scale(1.15); opacity: 0.6; }
          66% { transform: translate(-60px, 160px) scale(0.85); opacity: 0.4; }
        }
        @keyframes floatBubble2 {
          0%, 100% { transform: translate(0, 0) scale(0.9); opacity: 0.4; }
          33% { transform: translate(-120px, 140px) scale(1.25); opacity: 0.6; }
          66% { transform: translate(140px, -70px) scale(1); opacity: 0.3; }
        }
        @keyframes floatBubble3 {
          0%, 100% { transform: translate(0, 0) scale(1.1); opacity: 0.2; }
          33% { transform: translate(90px, -170px) scale(0.9); opacity: 0.5; }
          66% { transform: translate(-150px, -90px) scale(1.2); opacity: 0.3; }
        }
        .ambient-bubble {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.02));
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          backdrop-filter: blur(3px); /* Glassy distortion effect */
        }
      `}</style>

      {/* ── Welcome ── */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome back, {userName} 👋</h1>
        <p className="text-gray-500 text-lg mt-2">What would you like to move today?</p>
      </motion.div>

      {/* ── Glassmorphism Services Banner with Ambient Bubbles ── */}
      <motion.div variants={container} initial="hidden" animate="show" className="mb-12 relative">
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl">

          {/* Static Decorative Blur Elements */}
          <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

          {/* Scattered, Wandering Ambient Bubbles */}
          <div className="ambient-bubble w-32 h-32 top-[-10%] left-[-5%]" style={{ animation: 'floatBubble1 16s infinite ease-in-out' }}></div>
          <div className="ambient-bubble w-20 h-20 top-[5%] right-[10%]" style={{ animation: 'floatBubble2 14s infinite ease-in-out' }}></div>
          <div className="ambient-bubble w-40 h-40 bottom-[-15%] right-[-5%]" style={{ animation: 'floatBubble3 18s infinite ease-in-out' }}></div>
          <div className="ambient-bubble w-24 h-24 bottom-[15%] left-[10%]" style={{ animation: 'floatBubble2 20s infinite ease-in-out' }}></div>
          <div className="ambient-bubble w-16 h-16 top-[-5%] left-[45%]" style={{ animation: 'floatBubble3 12s infinite ease-in-out' }}></div>
          <div className="ambient-bubble w-28 h-28 bottom-[-10%] left-[40%]" style={{ animation: 'floatBubble1 19s infinite ease-in-out' }}></div>

          <h2 className="text-3xl font-extrabold text-white mb-8 relative z-10">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
            {services.map(({ icon: Icon, title, description, path }, i) => {
              const isHovered = hoveredService === i;
              const isAnotherHovered = hoveredService !== null && hoveredService !== i;

              const inner = (
                <motion.div
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  animate={{
                    scale: isHovered ? 1.05 : isAnotherHovered ? 0.96 : 1,
                    opacity: isAnotherHovered ? 0.6 : 1,
                    y: isHovered ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`bg-white/10 backdrop-blur-xl border rounded-3xl p-7 flex flex-col items-center text-center cursor-pointer h-full transition-colors duration-300 ${isHovered
                    ? 'border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)] bg-white/20'
                    : 'border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${isHovered ? 'bg-white shadow-lg scale-110' : 'bg-white/20 shadow-inner'}`}>
                    <Icon size={34} className={isHovered ? 'text-blue-600' : 'text-white'} />
                  </div>
                  <p className="text-lg font-bold text-white">{title}</p>
                  <p className="text-blue-50 text-sm mt-2 leading-relaxed opacity-90">{description}</p>
                  <div className={`mt-5 h-1 rounded-full transition-all duration-300 ${isHovered ? 'w-16 bg-white' : 'w-0 bg-white/60'}`} />
                </motion.div>
              );
              return path
                ? <Link to={path} key={i} className="block group h-full">{inner}</Link>
                : <div key={i} className="opacity-70 h-full">{inner}</div>;
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Bottom row ── */}
      <motion.div variants={container} initial="hidden" animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Searches (Blue theme with water flow) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Searches</h2>
          <div className="flex flex-col gap-4">
            {recentSearches.map(({ from, to }, i) => (
              <div key={i} className="water-flow-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group">
                <div className="water-flow-content flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <MdOutlineLocationOn size={20} className="text-white" />
                  </div>
                  <span className="text-base font-bold text-blue-900">{from} → {to}</span>
                </div>
                <MdOutlineKeyboardArrowRight size={24} className="text-blue-400 group-hover:text-blue-700 transition-colors water-flow-content" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Available Movers (Blue theme with water flow) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {vehicles.length > 0 ? 'Available Movers' : 'Top Rated Movers'}
            </h2>
            <Link to="/compare" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
              View all →
            </Link>
          </div>

          {vehicleLoad && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!vehicleLoad && (
            <div className="flex flex-col gap-4">
              {(vehicles.length > 0 ? vehicles.slice(0, 3) : fallbackMovers).map((v, i) => {
                const name = v?.organizationName || v?.name || 'Mover';
                const rating = v?.rating ?? 4.5;
                const reviews = v?.reviews ?? v?.totalReviews ?? 0;
                const distance = v?.distance ? `${v.distance} km` : v?.distance || '—';
                const price = v?.price ?? (v?.basePrice ? `₹${Number(v.basePrice).toLocaleString('en-IN')}` : '₹1,200');

                return (
                  <div key={i} className="water-flow-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group">
                    <div className="water-flow-content flex items-center gap-4">
                      <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <MdOutlineLocalShipping size={22} className="text-white" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-blue-900">{name}</p>
                        <div className="flex items-center gap-1.5 text-sm text-blue-600 mt-0.5">
                          <MdOutlineStar size={16} className="text-yellow-500" />
                          <span className="font-semibold text-blue-800">{rating}</span>
                          {reviews > 0 && <span className="opacity-80">({reviews})</span>}
                          <span className="opacity-60">•</span>
                          <span className="font-medium">{distance}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xl font-extrabold text-blue-700 water-flow-content">{price}</span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>

    </div>
  );
};

export default HomePage;