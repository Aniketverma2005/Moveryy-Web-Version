import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineStar, MdOutlineLocalShipping, MdOutlineHome, MdOutlineDirectionsCar,
  MdOutlineBusinessCenter, MdOutlineInventory2, MdOutlineCheck, MdOutlineClose,
  MdOutlineInfo, MdOutlineCompareArrows,
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const comparisonData = {
  movers: [
    {
      name: 'QuickMove Express', service: 'House Moving', rating: 4.8, reviews: 1250,
      price: '₹1,200', distance: '2.5 km', color: 'text-blue-500',
      features: { insurance: true, packing: true, tracking: true, reviews: 1250, delivery: 'Same Day', experience: '8 years', verified: true, types: ['House', 'Car', 'Office'] },
    },
    {
      name: 'SafeShift Services', service: 'Car Moving', rating: 4.7, reviews: 980,
      price: '₹1,150', distance: '3.1 km', color: 'text-blue-600',
      features: { insurance: false, packing: true, tracking: true, reviews: 980, delivery: '1-2 Days', experience: '5 years', verified: true, types: ['House', 'Car'] },
    },
    {
      name: 'CityMove Pro', service: 'Office Shifting', rating: 4.6, reviews: 756,
      price: '₹1,350', distance: '4.2 km', color: 'text-blue-700',
      features: { insurance: false, packing: false, tracking: false, reviews: 756, delivery: '2-3 Days', experience: '12 years', verified: false, types: ['House', 'Car', 'Office', 'Storage'] },
    },
  ],
  featureLabels: [
    { key: 'insurance', label: 'Insurance Included', type: 'bool' },
    { key: 'packing', label: 'Packing Services', type: 'bool' },
    { key: 'tracking', label: 'Live Tracking', type: 'bool' },
    { key: 'reviews', label: 'Total Reviews', type: 'text' },
    { key: 'delivery', label: 'Delivery Time', type: 'text' },
    { key: 'experience', label: 'Experience', type: 'text' },
    { key: 'verified', label: 'Verified Mover', type: 'bool' },
  ],
  typeIcons: { House: <MdOutlineHome />, Car: <MdOutlineDirectionsCar />, Office: <MdOutlineBusinessCenter />, Storage: <MdOutlineInventory2 /> },
};

const FeatureCell = ({ value, type }) => type === 'bool'
  ? (value ? <MdOutlineCheck size={20} className="text-green-500 mx-auto" /> : <MdOutlineClose size={20} className="text-red-400 mx-auto" />)
  : <span className="text-sm font-semibold text-blue-900">{value}</span>;

const ComparePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBook, setHoveredBook] = useState(null);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="bg-white min-h-screen px-8 py-8 font-sans">

      {/* ── Custom Styles for Water Flow & Wandering Bubble Animations ── */}
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

        /* Multi-directional wandering bubbles */
        @keyframes floatBubble1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(150px, 70px) scale(1.15); opacity: 0.6; }
          66% { transform: translate(-40px, 120px) scale(0.85); opacity: 0.4; }
        }
        @keyframes floatBubble2 {
          0%, 100% { transform: translate(0, 0) scale(0.9); opacity: 0.4; }
          33% { transform: translate(-100px, 100px) scale(1.25); opacity: 0.6; }
          66% { transform: translate(120px, -50px) scale(1); opacity: 0.3; }
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

      {/* ── Glassmorphism Header Banner with Bubbles ── */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 overflow-hidden shadow-xl mb-10">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        {/* Scattered Bubbles */}
        <div className="ambient-bubble w-28 h-28 top-[-5%] left-[10%]" style={{ animation: 'floatBubble1 14s infinite ease-in-out' }}></div>
        <div className="ambient-bubble w-16 h-16 bottom-[10%] right-[15%]" style={{ animation: 'floatBubble2 12s infinite ease-in-out' }}></div>
        <div className="ambient-bubble w-36 h-36 top-[20%] right-[-5%]" style={{ animation: 'floatBubble1 18s infinite ease-in-out' }}></div>
        <div className="ambient-bubble w-20 h-20 bottom-[-10%] left-[40%]" style={{ animation: 'floatBubble2 16s infinite ease-in-out' }}></div>

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
            <MdOutlineCompareArrows size={30} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Compare Movers</h1>
            <p className="text-blue-100 mt-1 text-lg">Side-by-side comparison to find your perfect fit</p>
          </div>
        </div>
      </div>

      {/* ── Mover Cards Grid with Dimming Effect ── */}
      <motion.div variants={containerVariants} initial="hidden" animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {comparisonData.movers.map((m, i) => {
          const isHovered = hoveredCard === i;
          const isAnotherHovered = hoveredCard !== null && hoveredCard !== i;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              animate={{
                scale: isHovered ? 1.05 : isAnotherHovered ? 0.97 : 1,
                opacity: isAnotherHovered ? 0.6 : 1,
                y: isHovered ? -8 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="water-flow-card rounded-3xl p-6 cursor-pointer"
            >
              <div className="water-flow-content">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm border border-blue-100">
                    <MdOutlineLocalShipping size={24} className={m.color} />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900 text-lg leading-tight">{m.name}</p>
                    <p className="text-sm text-blue-500 font-medium">{m.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-3 bg-slate-50 w-fit px-3 py-1 rounded-lg border border-slate-100">
                  <MdOutlineStar size={16} className="text-yellow-500" />
                  <span className="text-sm font-bold text-blue-900">{m.rating}</span>
                  <span className="text-xs text-gray-400 font-medium">({m.reviews} reviews)</span>
                </div>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Starting at</p>
                    <p className="text-3xl font-extrabold text-blue-600">{m.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Distance</p>
                    <p className="text-sm font-bold text-gray-700">{m.distance}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Feature Comparison Table ── */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-white rounded-3xl border border-blue-100 shadow-md mb-10 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white px-8 py-5 border-b border-blue-100">
          <h2 className="text-xl font-bold text-blue-900">Feature Comparison</h2>
          <p className="text-sm text-blue-600 mt-1 font-medium">Compare services and features side by side</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-white border-b border-blue-100">
                <th className="px-8 py-4 text-left text-sm font-bold text-gray-400 uppercase tracking-wider">Features</th>
                {comparisonData.movers.map((m, i) => (
                  <th key={i} className="px-4 py-4 text-center text-sm font-bold text-blue-900 w-1/4">{m.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.featureLabels.map((f, i) => (
                <tr key={i} className={`border-b border-blue-50 transition-colors hover:bg-blue-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                  <td className="px-8 py-4 text-sm font-semibold text-gray-600">{f.label}</td>
                  {comparisonData.movers.map((m, j) => (
                    <td key={j} className="px-4 py-4 text-center">
                      <FeatureCell value={m.features[f.key]} type={f.type} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-white hover:bg-blue-50/50 transition-colors">
                <td className="px-8 py-5 text-sm font-semibold text-gray-600">Service Types</td>
                {comparisonData.movers.map((m, i) => (
                  <td key={i} className="px-4 py-5">
                    <div className="flex justify-center gap-3 text-blue-500">
                      {m.features.types.map((t, j) => (
                        <span key={j} title={t} className="bg-blue-50 p-2 rounded-lg border border-blue-100 shadow-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-help">
                          {comparisonData.typeIcons[t]}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Bottom Section: Tips & Booking ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Tips */}
        <motion.div variants={cardVariants} initial="hidden" animate="show"
          className="lg:col-span-1 relative bg-gradient-to-b from-blue-50 to-blue-100/50 rounded-3xl p-8 border border-blue-200 shadow-sm overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-10 -translate-y-10"></div>
          <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-5 relative z-10">
            <MdOutlineInfo size={24} className="text-blue-600" /> Comparison Tips
          </h3>
          <ul className="text-sm text-blue-800 space-y-3 relative z-10 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
              Check if insurance and packing services are included in the base price.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
              Compare total reviews and experience for peace of mind.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
              Verify if the mover provides live tracking.
            </li>
          </ul>
        </motion.div>

        {/* Book section with Dimming & Water Flow */}
        <motion.div variants={cardVariants} initial="hidden" animate="show"
          className="lg:col-span-2 bg-white rounded-3xl p-8 border border-blue-100 shadow-md">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Ready to Book?</h2>
          <div className="flex flex-col gap-4">
            {comparisonData.movers.map((m, i) => {
              const isHovered = hoveredBook === i;
              const isAnotherHovered = hoveredBook !== null && hoveredBook !== i;

              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredBook(i)}
                  onMouseLeave={() => setHoveredBook(null)}
                  animate={{
                    scale: isHovered ? 1.02 : isAnotherHovered ? 0.98 : 1,
                    opacity: isAnotherHovered ? 0.5 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="water-flow-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group"
                >
                  <div className="water-flow-content flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-colors">
                      <MdOutlineLocalShipping size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-blue-900">{m.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-extrabold text-blue-600">{m.price}</span>
                        <span className="text-xs text-gray-500 font-medium">starting price</span>
                      </div>
                    </div>
                  </div>
                  <button className="water-flow-content px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-800 rounded-xl transition-colors shadow-md hover:shadow-lg">
                    Book Now
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ComparePage;