import { motion } from 'framer-motion';
import {
  MdOutlineLocationOn, MdOutlineCalendarToday, MdOutlineFilterList,
  MdOutlineStar, MdOutlineApartment, MdOutlineInfo, MdOutlineKeyboardArrowDown,
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const movers = [
  { name: 'Corporate Move Pro', rating: 4.8, reviews: 142, distance: '1.2 km away', time: '1-2 days', price: '₹3,500', tags: ['Legal Offices', 'IT Equipment', 'Secure Documents', 'Weekend Service'], color: 'text-blue-600' },
  { name: 'BizShift Solutions', rating: 4.8, reviews: 107, distance: '2.1 km away', time: '2-3 days', price: '₹2,800', tags: ['Small Offices', 'Quick Setup', 'Budget Friendly', 'Insurance Included'], color: 'text-red-500' },
  { name: 'Enterprise Relocators', rating: 4.7, reviews: 189, distance: '3.6 km away', time: '1 day', price: '₹4,200', tags: ['Large Offices', 'High Value Removal', 'Premium Service', 'Same Day'], color: 'text-green-500' },
  { name: 'StartupMove Express', rating: 4.6, reviews: 152, distance: '2.8 km away', time: '2-3 days', price: '₹2,200', tags: ['Co-working Spaces', 'Quick Moves', 'Startup Friendly', 'Flexible Timing'], color: 'text-purple-500' },
];

const specialReqs = ['Fragile equipment handling', 'IT setup assistance', 'Furniture assembly/disassembly', 'Secure document handling'];

const MoverCard = ({ m }) => (
  <motion.div variants={cardVariants}
    whileHover={{ scale: 1.01, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineApartment size={20} className={m.color} />
        </div>
        <div>
          <p className="font-bold text-gray-900">{m.name}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MdOutlineStar size={13} className="text-yellow-400" />
            <span>{m.rating} ({m.reviews})</span>
            <span className="text-gray-300">•</span>
            <span>{m.distance}</span>
            <span className="text-gray-300">•</span>
            <span>{m.time}</span>
          </div>
        </div>
      </div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Verified</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {m.tags.map(t => (
        <span key={t} className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">{t}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
      <div>
        <p className="text-xl font-bold text-blue-600">{m.price}</p>
        <p className="text-xs text-gray-400">starting from</p>
      </div>
      <button className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
        Book Now
      </button>
    </div>
  </motion.div>
);

const OfficeRelocationSearchPage = () => (
  <motion.div variants={pageVariants} initial="hidden" animate="show">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
        <MdOutlineApartment size={20} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Professional Office Relocation</h1>
        <p className="text-sm text-gray-500">Secure, efficient office shifting with minimal downtime</p>
      </div>
    </div>

    {/* Office details */}
    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      <h2 className="text-base font-bold text-gray-900 mb-4">Office Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[
          { placeholder: 'Current office location', icon: MdOutlineLocationOn },
          { placeholder: 'New office location', icon: MdOutlineLocationOn },
          { placeholder: 'Moving Date', icon: MdOutlineCalendarToday, type: 'date' },
        ].map(({ placeholder, icon: Icon, type = 'text' }) => (
          <div key={placeholder} className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
            <input type={type} placeholder={placeholder}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 transition-all" />
          </div>
        ))}
        <div className="relative">
          <MdOutlineApartment className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
          <select className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-slate-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Office Size (for accurate quote)</option>
            <option>Small (1-10 employees)</option>
            <option>Medium (11-50 employees)</option>
            <option>Large (50+ employees)</option>
          </select>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Special Requirements</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {specialReqs.map(r => (
            <label key={r} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              {r}
            </label>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Filters */}
    <div className="flex items-center justify-between mb-5">
      <p className="text-base font-bold text-gray-900">Office Movers <span className="text-blue-600">({movers.length})</span></p>
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
      {movers.map((m, i) => <MoverCard key={i} m={m} />)}
    </motion.div>

    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-purple-50 rounded-2xl p-5 border border-purple-100">
      <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
        <MdOutlineInfo size={18} className="text-purple-600" /> Office Relocation Tips
      </h3>
      <ul className="text-sm text-gray-600 space-y-1.5 ml-4 list-disc">
        <li>Start planning at least 6-8 weeks in advance for minimal disruption.</li>
        <li>Assign a dedicated project manager for the move.</li>
        <li>Back up all digital data before disconnecting IT equipment.</li>
        <li>Notify clients, suppliers, and utility companies of the new address.</li>
      </ul>
    </motion.div>
  </motion.div>
);

export default OfficeRelocationSearchPage;
