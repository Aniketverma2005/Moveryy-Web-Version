import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineFilterList,
  MdOutlineStar, MdOutlineLocalShipping, MdOutlineInfo, MdOutlineHome
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const movers = [
  { 
    name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km away', price: '₹1,200', 
    theme: 'from-green-50/80 to-green-100/40', border: 'border-green-200',
    iconColor: 'bg-green-500' 
  },
  { 
    name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km away', price: '₹1,150', 
    theme: 'from-orange-50/80 to-orange-100/40', border: 'border-orange-200',
    iconColor: 'bg-orange-500' 
  },
  { 
    name: 'CityMove Pro', rating: 4.6, reviews: 750, distance: '4.2 km away', price: '₹1,350', 
    theme: 'from-pink-50/80 to-pink-100/40', border: 'border-pink-200',
    iconColor: 'bg-pink-500' 
  },
  { 
    name: 'FlexiMove Solutions', rating: 4.5, reviews: 601, distance: '9.1 km away', price: '₹950', 
    theme: 'from-purple-50/80 to-purple-100/40', border: 'border-purple-200',
    iconColor: 'bg-purple-500' 
  },
];

// Random slow drift animation for specific points
const getDriftAnimation = (duration = 15) => ({
  animate: {
    x: [0, Math.random() * 40 - 20, Math.random() * -40 + 20, 0],
    y: [0, Math.random() * 30 - 15, Math.random() * -30 + 15, 0],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
});

const MoverCard = ({ mover, index, hoveredMover, setHoveredMover }) => {
  const isHovered = hoveredMover === index;
  const isAnotherHovered = hoveredMover !== null && hoveredMover !== index;

  return (
    <motion.div
      onMouseEnter={() => setHoveredMover(index)}
      onMouseLeave={() => setHoveredMover(null)}
      animate={{
        scale: isHovered ? 1.01 : isAnotherHovered ? 0.98 : 1,
        opacity: isAnotherHovered ? 0.7 : 1,
      }}
      className={`relative overflow-hidden rounded-3xl p-6 border ${mover.border} bg-gradient-to-br ${mover.theme} shadow-sm transition-all duration-300`}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 ${mover.iconColor} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 ${isHovered ? 'rotate-3 scale-110' : ''}`}>
            <MdOutlineLocalShipping size={30} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-slate-900 text-xl tracking-tight">{mover.name}</p>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-0.5">
              <div className="flex items-center gap-1">
                <MdOutlineStar size={18} className="text-yellow-500" />
                <span className="font-bold text-slate-800">{mover.rating}</span>
              </div>
              <span className="text-slate-400">({mover.reviews} reviews)</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full mx-1"></span>
              <span className="font-semibold text-slate-700">{mover.distance}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-8">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Starting Price</p>
            <p className="text-2xl font-black text-slate-900">{mover.price}</p>
          </div>
          <button className="px-10 py-3.5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 text-sm uppercase tracking-wider">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MoverSearchPage = () => {
  const [hoveredMover, setHoveredMover] = useState(null);

  // Grey-White glass styling
  const bubbleClass = "absolute rounded-full border border-white/20 backdrop-blur-md bg-slate-100/20 shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.05),inset_5px_5px_15px_rgba(255,255,255,0.3)]";

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="bg-[#F8FAFC] min-h-screen px-6 py-10 font-sans">
      
      {/* ── Header Banner (Dark Blue with Grey-White Random Bubbles) ── */}
      <div className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 rounded-[2.5rem] p-12 overflow-hidden shadow-xl mb-12 border border-white/10">
        
        {/* Bubbles System */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Top-Left (Opposite Side 1) */}
          <motion.div {...getDriftAnimation(18)} className={`${bubbleClass} w-16 h-16 top-6 left-8`} />
          
          {/* Bottom-Right (Opposite Side 2) */}
          <motion.div {...getDriftAnimation(20)} className={`${bubbleClass} w-20 h-24 bottom-6 right-8`} />
          
          {/* Left Centre */}
          <motion.div {...getDriftAnimation(22)} className={`${bubbleClass} w-10 h-10 top-[45%] left-[12%]`} />

          {/* Right Centre */}
          <motion.div {...getDriftAnimation(24)} className={`${bubbleClass} w-14 h-14 top-[55%] right-[15%]`} />

          {/* Centre - Diagonal Drift */}
          <motion.div 
            animate={{
              x: [-180, 180, -180],
              y: [-100, 100, -100],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className={`${bubbleClass} w-12 h-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 shadow-2xl`} 
          />
        </div>

        <div className="relative z-10 flex items-center gap-8">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20 shadow-inner">
            <MdOutlineHome size={40} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Hassle-free House Moving</h1>
            <p className="text-blue-100 text-xl font-medium">Reliable partners for a seamless relocation experience</p>
          </div>
        </div>
      </div>

      {/* ── Plan Your Move ── */}
      <motion.div variants={cardVariants}
        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-[2.5rem] p-10 shadow-xl mb-14 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>
        
        <h2 className="text-2xl font-black text-white mb-8 relative z-10">Where are you moving?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {['Pickup Location', 'Drop Location', 'Moving Date'].map((label) => (
            <div key={label} className="relative group">
              <input 
                type={label === 'Moving Date' ? 'date' : 'text'} 
                placeholder={label}
                className="w-full px-6 py-5 bg-white border-none rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-yellow-300 transition-all shadow-lg placeholder:text-slate-400 outline-none" 
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Available Movers ── */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Available Movers</h3>
          <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
        </div>
        <button className="bg-white p-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <MdOutlineFilterList size={24}/>
        </button>
      </div>

      <motion.div variants={containerVariants} className="flex flex-col gap-6 mb-20">
        {movers.map((m, i) => (
          <MoverCard key={i} index={i} mover={m} hoveredMover={hoveredMover} setHoveredMover={setHoveredMover} />
        ))}
      </motion.div>

      {/* ── Expert Tips (Deep Blue Template Restored) ── */}
      <motion.div variants={cardVariants}
        className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 rounded-[3.5rem] p-14 overflow-hidden shadow-2xl border border-white/10">
        
        <div className="absolute -top-12 -left-12 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-1 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg transform -rotate-6">
              <MdOutlineInfo size={32} className="text-slate-900" />
            </div>
            <h3 className="text-4xl font-black text-white tracking-tight">Pro Packing Tips</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Pack non-essentials 2 weeks early.",
              "Label boxes by room & content.",
              "Confirm insurance policies first.",
              "Keep valuables in your personal bag."
            ].map((tip, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/20 transition-all duration-300">
                <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 font-black text-xl mb-8 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  {idx + 1}
                </div>
                <p className="text-white text-xl font-medium leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MoverSearchPage;