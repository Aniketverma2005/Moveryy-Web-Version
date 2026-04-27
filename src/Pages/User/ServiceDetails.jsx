import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineBusinessCenter,
  MdOutlineInventory2, MdOutlineArrowBack, MdOutlineStar,
  MdOutlineCheck, MdOutlineLocalShipping,
} from 'react-icons/md';
import { containerVariants, cardVariants, pageVariants } from '../../utils/animations';

const serviceData = {
  'house-moving': {
    title: 'House Moving', icon: MdOutlineHome, color: 'text-blue-600',
    description: 'Complete household relocation with professional packing, safe transportation, and timely delivery.',
    features: ['Professional packing & unpacking', 'Furniture disassembly & assembly', 'Insurance coverage', 'Real-time tracking', '24/7 customer support', 'Damage-free guarantee'],
    startingPrice: '₹1,200',
    movers: [
      { name: 'QuickMove Express', rating: 4.8, reviews: 1250, price: '₹1,200', tags: ['Insurance', 'Packing'] },
      { name: 'SafeShift Services', rating: 4.7, reviews: 980, price: '₹1,150', tags: ['Professional', 'Quick'] },
      { name: 'CityMove Pro', rating: 4.6, reviews: 750, price: '₹1,350', tags: ['Premium', 'Storage'] },
    ],
  },
  'car-moving': {
    title: 'Car Moving', icon: MdOutlineDirectionsCar, color: 'text-green-600',
    description: 'Safe and reliable vehicle transportation with door-to-door service and full insurance coverage.',
    features: ['Door-to-door delivery', 'Full insurance coverage', 'GPS tracking', 'Enclosed transport option', 'Damage inspection report', 'Professional drivers'],
    startingPrice: '₹750',
    movers: [
      { name: 'AutoMove Express', rating: 4.8, reviews: 160, price: '₹800', tags: ['Insurance', 'Door-to-Door'] },
      { name: 'SafeCar Transport', rating: 4.7, reviews: 210, price: '₹950', tags: ['Live Tracking', '24/7'] },
      { name: 'Premium Auto Shift', rating: 4.8, reviews: 178, price: '₹1,200', tags: ['Enclosed', 'Premium'] },
    ],
  },
  'office-shifting': {
    title: 'Office Shifting', icon: MdOutlineBusinessCenter, color: 'text-purple-600',
    description: 'Efficient office relocation with minimal downtime, IT setup assistance, and secure document handling.',
    features: ['IT equipment handling', 'Furniture assembly', 'Secure document transport', 'Minimal business disruption', 'Weekend service available', 'Project manager assigned'],
    startingPrice: '₹2,200',
    movers: [
      { name: 'Corporate Move Pro', rating: 4.8, reviews: 142, price: '₹3,500', tags: ['IT Setup', 'Secure'] },
      { name: 'BizShift Solutions', rating: 4.8, reviews: 107, price: '₹2,800', tags: ['Budget', 'Quick'] },
      { name: 'Enterprise Relocators', rating: 4.7, reviews: 189, price: '₹4,200', tags: ['Premium', 'Same Day'] },
    ],
  },
};

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = serviceData[id];

  if (!service) return (
    <div className="text-center py-20">
      <p className="text-gray-500 text-lg">Service not found.</p>
      <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold">
        Go Home
      </button>
    </div>
  );

  const Icon = service.icon;

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show">
      {/* Back */}
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 mb-6 transition-colors">
        <MdOutlineArrowBack size={18} /> Back
      </button>

      {/* Hero */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <Icon size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{service.title}</h1>
            <p className="text-blue-100 text-base mt-1">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <div className="bg-white/20 rounded-xl px-4 py-2">
            <p className="text-xs text-blue-200">Starting from</p>
            <p className="text-2xl font-bold">{service.startingPrice}</p>
          </div>
          <button onClick={() => navigate(`/${id}`)}
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
            Find Movers →
          </button>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">What's Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.features.map(f => (
            <div key={f} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MdOutlineCheck size={14} className="text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{f}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top movers */}
      <motion.div variants={cardVariants} initial="hidden" animate="show"
        className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Top Movers for {service.title}</h2>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-3">
          {service.movers.map((m, i) => (
            <motion.div key={i} variants={cardVariants}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <MdOutlineLocalShipping size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{m.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MdOutlineStar size={12} className="text-yellow-400" />
                    <span>{m.rating} ({m.reviews})</span>
                    <span className="mx-1 text-gray-300">•</span>
                    {m.tags.map(t => (
                      <span key={t} className="px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded-full text-[10px] font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-bold text-blue-600">{m.price}</p>
                <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetails;
