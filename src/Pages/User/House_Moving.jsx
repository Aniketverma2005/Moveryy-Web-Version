import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineFilterList,
  MdOutlineStar, MdOutlineLocalShipping, MdOutlineInfo, MdOutlineHome,
  MdOutlineCheckCircle
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const movers = [
  { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km away', price: '₹1,200', tags: ['Insurance Included', 'Packing Service', '24/7 Support'], color: 'text-blue-500' },
  { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km away', price: '₹1,150', tags: ['Professional Team', 'Quick Service', 'Insured'], color: 'text-blue-600' },
  { name: 'CityMove Pro', rating: 4.6, reviews: 750, distance: '4.2 km away', price: '₹1,350', tags: ['Premium Service', 'Storage Options', 'Fragile Care'], color: 'text-indigo-500' },
  { name: 'FlexiMove Solutions', rating: 4.5, reviews: 601, distance: '9.1 km away', price: '₹950', tags: ['Budget Friendly', 'Local Expert', 'Quick Response'], color: 'text-blue-400' },
];

const MoverCard = ({ mover, index, hoveredMover, setHoveredMover }) => {
  const isHovered = hoveredMover === index;
  const isAnotherHovered = hoveredMover !== null && hoveredMover !== index;

  return (
    <motion.div
      onMouseEnter={() => setHoveredMover(index)}
      onMouseLeave={() => setHoveredMover(null)}
      animate={{
        scale: isHovered ? 1.02 : isAnotherHovered ? 0.98 : 1,
        opacity: isAnotherHovered ? 0.5 : 1,
        y: isHovered ? -4 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="water-flow-card rounded-3xl p-6 cursor-pointer flex flex-col w-full"
    >
      <div className="water-flow-content">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
              <MdOutlineLocalShipping size={24} className={mover.color} />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-lg leading-tight">{mover.name}</p>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                <MdOutlineStar size={16} className="text-yellow-500" />
                <span className="font-bold text-gray-700">{mover.rating}</span>
                <span className="text-xs">({mover.reviews})</span>
                <span className="text-blue-200 mx-1">•</span>
                <span className="font-semibold text-blue-600">{mover.distance}</span>
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full shadow-sm w-fit">
            <MdOutlineCheckCircle size={14} />
            Verified
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {mover.tags.map(t => (
            <span key={t} className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-blue-50 mt-auto">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Starting from</p>
            <p className="text-2xl font-extrabold text-blue-600">{mover.price}</p>
          </div>
          <button className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-800 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MoverSearchPage = () => {
  const [hoveredMover, setHoveredMover] = useState(null);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="bg-white min-h-screen px-8 py-8 font-sans">

      {/* ── Custom Styles for Water Flow & Ambient Bubbles ── */}
      <style>{`
        @keyframes waterFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .water-flow-card {
          position: relative;
          overflow: hidden;
          background-color: #ffffff;
          border: 1px solid #bfdbfe;
          transition: all 0.3s ease;
        }
        .water-flow-card:hover {
          border-color: #60a5fa;
          box-shadow: 0 12px 32px rgba(37, 99, 235, 0.15);
        }
        .water-flow-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.15), transparent);
          width: 100%;
          animation: waterFlow 2.5s infinite linear;
          pointer-events: none;
          z-index: 0;
        }
        .water-flow-content {
          position: relative;
          z-index: 10;
        }

        /* Ambient multi-directional bubbles */
        @keyframes floatBubble1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(120px, 60px) scale(1.15); opacity: 0.6; }
          66% { transform: translate(-30px, 90px) scale(0.85); opacity: 0.4; }
        }
        @keyframes floatBubble2 {
          0%, 100% { transform: translate(0, 0) scale(0.9); opacity: 0.4; }
          33% { transform: translate(-80px, 80px) scale(1.25); opacity: 0.6; }
          66% { transform: translate(90px, -40px) scale(1); opacity: 0.3; }
        }
        .ambient-bubble {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.02));
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          backdrop-filter: blur(4px);
        }
      `}</style>

      {/* ── Header Banner with Glassmorphism & Bubbles ── */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 overflow-hidden shadow-xl mb-10 flex items-center">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        {/* Scattered Bubbles */}
        <div className="ambient-bubble w-24 h-24 top-[-5%] left-[15%]" style={{ animation: 'floatBubble1 15s infinite ease-in-out' }}></div>
        <div className="ambient-bubble w-14 h-14 bottom-[15%] right-[20%]" style={{ animation: 'floatBubble2 13s infinite ease-in-out' }}></div>
        <div className="ambient-bubble w-32 h-32 top-[10%] right-[-5%]" style={{ animation: 'floatBubble1 17s infinite ease-in-out' }}></div>
        <div className="ambient-bubble w-16 h-16 bottom-[10%] left-[45%]" style={{ animation: 'floatBubble2 11s infinite ease-in-out' }}></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner shrink-0">
            <MdOutlineHome size={30} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Hassle-free House Moving</h1>
            <p className="text-blue-100 mt-1 text-lg font-medium">Professional packers & movers for your complete home relocation</p>
          </div>
        </div>
      </div>

      {/* ── Plan your move ── */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-white rounded-3xl p-8 border border-blue-100 shadow-md mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <h2 className="text-xl font-bold text-blue-900 mb-6 relative z-10">Plan Your Move</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            { placeholder: 'Pickup Location', icon: MdOutlineLocationOn },
            { placeholder: 'Drop Location', icon: MdOutlineLocationOn },
            { placeholder: 'Moving Date', icon: MdOutlineCalendarToday, type: 'date' },
          ].map(({ placeholder, icon: Icon, type = 'text' }) => (
            <div key={placeholder} className="relative group">
              <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input type={type} placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3.5 border border-blue-100 rounded-xl text-sm font-medium text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50 hover:bg-blue-50/30 transition-all shadow-sm placeholder:text-blue-300" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <p className="text-lg font-extrabold text-blue-900 flex items-center gap-2">
          Available Movers
          <span className="text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-md text-sm">{movers.length}</span>
        </p>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-blue-700 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm">
            <MdOutlineFilterList size={18} /> Filters
          </button>
          <div className="relative">
            <select className="appearance-none pl-5 pr-10 py-2.5 text-sm font-bold border border-blue-200 rounded-xl bg-white text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer hover:bg-blue-50 transition-colors">
              <option>Sort by Price</option>
              <option>Sort by Rating</option>
              <option>Sort by Distance</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mover cards list (Full Width) ── */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6 mb-10">
        {movers.map((m, i) => (
          <MoverCard
            key={i}
            index={i}
            mover={m}
            hoveredMover={hoveredMover}
            setHoveredMover={setHoveredMover}
          />
        ))}
      </motion.div>

      {/* ── Tips Bottom Section (Full Width Grid) ── */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="relative bg-gradient-to-b from-blue-50 to-blue-100/50 rounded-3xl p-8 border border-blue-200 shadow-sm overflow-hidden w-full">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-10 -translate-y-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-10 translate-y-10 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 relative z-10 gap-4 border-b border-blue-200/60 pb-6">
          <h3 className="text-xl font-extrabold text-blue-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <MdOutlineInfo size={20} className="text-white" />
            </div>
            House Moving Expert Tips
          </h3>
          <p className="text-blue-700 font-medium text-sm">Follow these steps for a stress-free relocation</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          <li className="flex flex-col gap-3 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white hover:border-blue-300 hover:shadow-md transition-all cursor-default group">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">1</div>
            <p className="text-sm text-blue-900 font-medium leading-relaxed">Start packing non-essential items at least <span className="font-bold text-blue-700">2 weeks</span> before moving day.</p>
          </li>
          <li className="flex flex-col gap-3 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white hover:border-blue-300 hover:shadow-md transition-all cursor-default group">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">2</div>
            <p className="text-sm text-blue-900 font-medium leading-relaxed">Label boxes clearly with their <span className="font-bold text-blue-700">contents and destination</span> room to save time.</p>
          </li>
          <li className="flex flex-col gap-3 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white hover:border-blue-300 hover:shadow-md transition-all cursor-default group">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">3</div>
            <p className="text-sm text-blue-900 font-medium leading-relaxed">Confirm the mover's <span className="font-bold text-blue-700">insurance and service policies</span> before they start packing.</p>
          </li>
          <li className="flex flex-col gap-3 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-white hover:border-blue-300 hover:shadow-md transition-all cursor-default group">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">4</div>
            <p className="text-sm text-blue-900 font-medium leading-relaxed">Always keep your <span className="font-bold text-blue-700">important documents and valuables</span> safely with you.</p>
          </li>
        </ul>
      </motion.div>

    </motion.div>
  );
};

export default MoverSearchPage;