import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineFilterList,
  MdOutlineStar, MdOutlineDirectionsCar, MdOutlineInfo, MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const transporters = [
  { name: 'AutoMove Express', rating: 4.8, reviews: 160, distance: '1.6 km away', time: '2-3 days', price: '₹800', tags: ['Reliable Transport', 'Insurance Included', 'Door to Door'], color: 'text-green-500' },
  { name: 'SafeCar Transport', rating: 4.7, reviews: 210, distance: '2.4 km away', time: '1-2 days', price: '₹950', tags: ['Live Tracking', '24/7 Support', 'Professional Team'], color: 'text-orange-500' },
  { name: 'QuickDrive Movers', rating: 4.6, reviews: 144, distance: '3.2 km away', time: '3-4 days', price: '₹750', tags: ['Budget Friendly', 'Open Transport', 'Local Expert'], color: 'text-blue-600' },
  { name: 'Premium Auto Shift', rating: 4.8, reviews: 178, distance: '2.8 km away', time: '1-2 days', price: '₹1,200', tags: ['Premium Service', 'Enclosed Transport', 'Safety Specialist'], color: 'text-purple-500' },
];

const TransporterCard = ({ t }) => (
  <motion.div variants={cardVariants}
    whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineDirectionsCar size={20} className={t.color} />
        </div>
        <div>
          <p className="font-bold text-gray-900">{t.name}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MdOutlineStar size={13} className="text-yellow-400" />
            <span>{t.rating} ({t.reviews})</span>
            <span className="text-gray-300">•</span>
            <span>{t.distance}</span>
            <span className="text-gray-300">•</span>
            <span>{t.time}</span>
          </div>
        </div>
      </div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Verified</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {t.tags.map(tag => (
        <span key={tag} className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">{tag}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
      <div>
        <p className="text-xl font-bold text-blue-600">{t.price}</p>
        <p className="text-xs text-gray-400">starting from</p>
      </div>
      <button className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
        Book Now
      </button>
    </div>
  </motion.div>
);

const CarTransportSearchPage = () => {
  const [carOpen, setCarOpen] = useState(false);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <MdOutlineDirectionsCar size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Safe Car Transportation</h1>
          <p className="text-sm text-gray-500">Professional vehicle moving with door-to-door service</p>
        </div>
      </div>

      {/* Transport details */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Transport Details</h2>
        <div className="flex flex-col gap-4">
          {[
            { placeholder: 'Pickup Location', icon: MdOutlineLocationOn },
            { placeholder: 'Drop Location', icon: MdOutlineLocationOn },
            { placeholder: 'Transport Date', icon: MdOutlineCalendarToday, type: 'date' },
          ].map(({ placeholder, icon: Icon, type = 'text' }) => (
            <div key={placeholder} className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
              <input type={type} placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" />
            </div>
          ))}
          {/* Car details collapsible */}
          <button onClick={() => setCarOpen(v => !v)}
            className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-slate-50 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-2">
              <MdOutlineDirectionsCar size={18} className="text-blue-400" />
              Car Details <span className="text-xs text-gray-400">(for better pricing)</span>
            </div>
            <motion.div animate={{ rotate: carOpen ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300 }}>
              <MdOutlineKeyboardArrowDown size={20} />
            </motion.div>
          </button>
          <AnimatePresence>
            {carOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="overflow-hidden">
                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-gray-100">
                  <input placeholder="Car Make" className="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Car Model" className="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Year" className="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input placeholder="Color" className="p-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-base font-bold text-gray-900">Car Transporters <span className="text-blue-600">({transporters.length})</span></p>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
            <MdOutlineFilterList size={16} /> Filters
          </button>
          <select className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Sort by Price</option>
            <option>Sort by Rating</option>
            <option>Sort by Distance</option>
          </select>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4 mb-6">
        {transporters.map((t, i) => <TransporterCard key={i} t={t} />)}
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-green-50 rounded-2xl p-5 border border-green-100">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
          <MdOutlineInfo size={18} className="text-green-600" /> Car Moving Preparation Tips
        </h3>
        <ul className="text-sm text-gray-600 space-y-1.5 ml-4 list-disc">
          <li>Remove all personal items and valuables from the vehicle.</li>
          <li>Ensure the fuel tank is no more than 1/4 full.</li>
          <li>Keep copies of insurance and registration documents ready.</li>
          <li>Note any existing damage before handover.</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default CarTransportSearchPage;
