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
      price: '₹1,200', distance: '2.5 km', color: 'text-orange-500',
      features: { insurance: true, packing: true, tracking: true, reviews: 1250, delivery: 'Same Day', experience: '8 years', verified: true, types: ['House', 'Car', 'Office'] },
    },
    {
      name: 'SafeShift Services', service: 'Car Moving', rating: 4.7, reviews: 980,
      price: '₹1,150', distance: '3.1 km', color: 'text-green-500',
      features: { insurance: false, packing: true, tracking: true, reviews: 980, delivery: '1-2 Days', experience: '5 years', verified: true, types: ['House', 'Car'] },
    },
    {
      name: 'CityMove Pro', service: 'Office Shifting', rating: 4.6, reviews: 756,
      price: '₹1,350', distance: '4.2 km', color: 'text-blue-600',
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
  ? (value ? <MdOutlineCheck size={18} className="text-green-500 mx-auto" /> : <MdOutlineClose size={18} className="text-red-400 mx-auto" />)
  : <span className="text-sm text-gray-700">{value}</span>;

const ComparePage = () => (
  <motion.div variants={pageVariants} initial="hidden" animate="show">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
        <MdOutlineCompareArrows size={20} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compare Movers</h1>
        <p className="text-sm text-gray-500">Side-by-side comparison to find the best fit</p>
      </div>
    </div>

    {/* Mover cards */}
    <motion.div variants={containerVariants} initial="hidden" animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {comparisonData.movers.map((m, i) => (
        <motion.div key={i} variants={cardVariants}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <MdOutlineLocalShipping size={20} className={m.color} />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{m.name}</p>
              <p className="text-xs text-gray-500">{m.service}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <MdOutlineStar size={14} className="text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">{m.rating}</span>
            <span className="text-xs text-gray-400">({m.reviews})</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{m.price}</p>
          <p className="text-xs text-gray-400">{m.distance}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* Feature comparison table */}
    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Feature Comparison</h2>
        <p className="text-sm text-gray-500">Compare services and features side by side</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Features</th>
              {comparisonData.movers.map((m, i) => (
                <th key={i} className="px-4 py-3 text-center text-xs font-bold text-gray-700">{m.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData.featureLabels.map((f, i) => (
              <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className="px-6 py-3.5 text-sm font-medium text-gray-700">{f.label}</td>
                {comparisonData.movers.map((m, j) => (
                  <td key={j} className="px-4 py-3.5 text-center">
                    <FeatureCell value={m.features[f.key]} type={f.type} />
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-gray-50 bg-white">
              <td className="px-6 py-3.5 text-sm font-medium text-gray-700">Service Types</td>
              {comparisonData.movers.map((m, i) => (
                <td key={i} className="px-4 py-3.5">
                  <div className="flex justify-center gap-2 text-gray-500">
                    {m.features.types.map((t, j) => (
                      <span key={j} title={t}>{comparisonData.typeIcons[t]}</span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>

    {/* Book section */}
    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Ready to Book?</h2>
      <div className="flex flex-col gap-3">
        {comparisonData.movers.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <MdOutlineLocalShipping size={22} className={m.color} />
              <div>
                <p className="text-sm font-bold text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-500">{m.price} starting from</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </motion.div>

    {/* Tips */}
    <motion.div variants={cardVariants} initial="hidden" animate="show"
      className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
      <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-3">
        <MdOutlineInfo size={20} className="text-blue-600" /> Comparison Tips
      </h3>
      <ul className="text-sm text-gray-600 space-y-1.5 ml-4 list-disc">
        <li>Check if insurance and packing services are included in the base price.</li>
        <li>Compare total reviews and experience for peace of mind.</li>
        <li>Verify if the mover provides live tracking.</li>
      </ul>
    </motion.div>
  </motion.div>
);

export default ComparePage;
