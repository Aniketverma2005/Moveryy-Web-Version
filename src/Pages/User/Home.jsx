import {
  MdOutlineHome, MdOutlineDirectionsCar, MdOutlineBusinessCenter, MdOutlineInventory2,
  MdOutlineLocationOn, MdOutlineStar, MdOutlineKeyboardArrowRight, MdOutlineLocalShipping,
  MdCheckCircle,
} from 'react-icons/md';
import { Link } from 'react-router-dom';

// ── Data ──────────────────────────────────────────────────────────────────────
const services = [
  { icon: <MdOutlineHome size={36} className="text-[#4285F4]" />, title: 'House Moving', description: 'Complete household relocation', path: '/house-moving' },
  { icon: <MdOutlineDirectionsCar size={36} className="text-green-500" />, title: 'Car Moving', description: 'Safe vehicle transportation', path: '/car-moving' },
  { icon: <MdOutlineBusinessCenter size={36} className="text-purple-500" />, title: 'Office Shifting', description: 'Commercial relocation services', path: '/office-shifting' },
  { icon: <MdOutlineInventory2 size={36} className="text-orange-500" />, title: 'Storage', description: 'Secure storage solutions', path: '' },
];

const recentSearches = [
  { from: 'Koramangala', to: 'Whitefield' },
  { from: 'HSR Layout', to: 'Electronic City' },
  { from: 'Indiranagar', to: 'Marathahalli' },
];

const topMovers = [
  { name: 'QuickMove Express', rating: 4.8, reviews: 1250, distance: '2.5 km away', price: '₹1,200', color: 'text-orange-500' },
  { name: 'SafeShift Services', rating: 4.7, reviews: 980, distance: '3.1 km away', price: '₹1,150', color: 'text-green-500' },
  { name: 'CityMove Pro', rating: 4.6, reviews: 756, distance: '4.2 km away', price: '₹1,350', color: 'text-[#4285F4]' },
];

// ── Components ────────────────────────────────────────────────────────────────
const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer group">
    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-200">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const RecentSearchItem = ({ from, to }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <MdOutlineLocationOn size={20} className="text-[#4285F4]" />
      </div>
      <span className="text-sm font-medium text-gray-700">{from} → {to}</span>
    </div>
    <MdOutlineKeyboardArrowRight size={20} className="text-gray-300 group-hover:text-[#4285F4] transition-colors" />
  </div>
);

const MoverCard = ({ mover }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200 cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <MdOutlineLocalShipping size={22} className={mover.color} />
      </div>
      <div>
        <p className="text-base font-semibold text-gray-800">{mover.name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <MdOutlineStar size={14} className="text-yellow-400" />
          <span className="text-sm text-gray-500">{mover.rating}</span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-sm text-gray-400">({mover.reviews} reviews)</span>
          <span className="text-gray-300 text-xs">•</span>
          <span className="text-sm text-gray-400">{mover.distance}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="text-lg font-bold text-[#4285F4]">{mover.price}</p>
      <p className="text-xs text-gray-400">starting from</p>
    </div>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const HomePage = () => {
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
  })();
  const userName = storedUser?.firstName
    ? storedUser.firstName.charAt(0).toUpperCase() + storedUser.firstName.slice(1)
    : 'there';

  return (
    <div className="bg-gray-50 min-h-screen">

      <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fade-up-1 { animation: fadeUp 0.5s 0.05s ease both; }
                .fade-up-2 { animation: fadeUp 0.5s 0.15s ease both; }
                .fade-up-3 { animation: fadeUp 0.5s 0.25s ease both; }
                .fade-up-4 { animation: fadeUp 0.5s 0.35s ease both; }
            `}</style>

      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">

        {/* ── Welcome banner ── */}
        <div className="fade-up-1">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {userName} 👋
          </h1>
          <p className="text-gray-400 text-base mt-1">Where would you like to move today?</p>
        </div>

        {/* ── Services ── */}
        <div className="fade-up-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, i) => (
              service.path
                ? <Link to={service.path} key={i}><ServiceCard {...service} /></Link>
                : <div key={i}><ServiceCard {...service} /></div>
            ))}
          </div>
        </div>

        {/* ── Recent Searches ── */}
        <div className="fade-up-3">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Searches</h2>
          <div className="flex flex-col gap-3">
            {recentSearches.map((s, i) => (
              <RecentSearchItem key={i} {...s} />
            ))}
          </div>
        </div>

        {/* ── Top Rated Movers ── */}
        <div className="fade-up-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Top Rated Movers</h2>
            <Link to="/compare" className="text-sm text-[#4285F4] hover:text-[#3367D6] font-medium flex items-center gap-1 transition-colors">
              View all <MdOutlineKeyboardArrowRight size={18} />
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {topMovers.map((mover, i) => (
              <MoverCard key={i} mover={mover} />
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div className="bg-[#4285F4] rounded-2xl p-8 flex items-center justify-between shadow-lg fade-up-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Ready to move?</h3>
            <p className="text-blue-100 text-base opacity-90">Get instant quotes from top-rated movers near you.</p>
            <div className="flex items-center gap-4 mt-4">
              {['Verified movers', 'Best prices', '24/7 support'].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <MdCheckCircle size={16} className="text-blue-200" />
                  <span className="text-blue-100 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <Link to="/house-moving"
            className="flex-shrink-0 ml-8 bg-white hover:bg-blue-50 text-[#4285F4] font-bold px-7 py-3.5 rounded-xl transition-colors shadow-sm text-base whitespace-nowrap">
            Get a Quote →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
