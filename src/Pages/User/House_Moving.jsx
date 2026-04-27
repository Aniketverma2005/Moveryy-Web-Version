import { motion } from 'framer-motion';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineFilterList,
  MdOutlineStar, MdOutlineLocalShipping, MdOutlineInfo, MdOutlineHome,
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const movers = [
  { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km away', price: '₹1,200', tags: ['Insurance Included', 'Packing Service', '24/7 Support'], color: 'text-green-500' },
  { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km away', price: '₹1,150', tags: ['Professional Team', 'Quick Service', 'Insured'], color: 'text-orange-500' },
  { name: 'CityMove Pro', rating: 4.6, reviews: 750, distance: '4.2 km away', price: '₹1,350', tags: ['Premium Service', 'Storage Options', 'Fragile Care'], color: 'text-blue-600' },
  { name: 'FlexiMove Solutions', rating: 4.5, reviews: 601, distance: '9.1 km away', price: '₹950', tags: ['Budget Friendly', 'Local Expert', 'Quick Response'], color: 'text-cyan-500' },
];

const MoverCard = ({ mover }) => (
  <motion.div variants={cardVariants}
    whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineLocalShipping size={20} className={mover.color} />
        </div>
        <div>
          <p className="font-bold text-gray-900">{mover.name}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MdOutlineStar size={13} className="text-yellow-400" />
            <span>{mover.rating} ({mover.reviews})</span>
            <span className="text-gray-300">•</span>
            <span>{mover.distance}</span>
          </div>
        </div>
      </div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Verified</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {mover.tags.map(t => (
        <span key={t} className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">{t}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
      <div>
        <p className="text-xl font-bold text-blue-600">{mover.price}</p>
        <p className="text-xs text-gray-400">starting from</p>
      </div>
      <button className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
        Book Now
      </button>
    </div>
  </motion.div>
);

const MoverSearchPage = () => (
  <motion.div variants={pageVariants} initial="hidden" animate="show">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
        <MdOutlineHome size={20} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hassle-free House Moving</h1>
        <p className="text-sm text-gray-500">Professional packers & movers for your complete home relocation</p>
      </div>
    </div>

    {/* Plan your move */}
    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      <h2 className="text-base font-bold text-gray-900 mb-4">Plan Your Move</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { placeholder: 'Pickup Location', icon: MdOutlineLocationOn },
          { placeholder: 'Drop Location', icon: MdOutlineLocationOn },
          { placeholder: 'Moving Date', icon: MdOutlineCalendarToday, type: 'date' },
        ].map(({ placeholder, icon: Icon, type = 'text' }) => (
          <div key={placeholder} className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
            <input type={type} placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 transition-all" />
          </div>
        ))}
      </div>
    </motion.div>

    {/* Filters row */}
    <div className="flex items-center justify-between mb-5">
      <p className="text-base font-bold text-gray-900">Available Movers <span className="text-blue-600">({movers.length})</span></p>
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

    {/* Mover cards */}
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4 mb-6">
      {movers.map((m, i) => <MoverCard key={i} mover={m} />)}
    </motion.div>

    {/* Tips */}
    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
      <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
        <MdOutlineInfo size={18} className="text-blue-600" /> House Moving Tips
      </h3>
      <ul className="text-sm text-gray-600 space-y-1.5 ml-4 list-disc">
        <li>Start packing non-essential items 2 weeks before moving.</li>
        <li>Label boxes clearly with contents and destination room.</li>
        <li>Confirm insurance and service policies before packing.</li>
        <li>Keep important documents and valuables with you.</li>
      </ul>
    </motion.div>
  </motion.div>
);

export default MoverSearchPage;
