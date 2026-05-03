import { motion } from 'framer-motion';
import {
  MdOutlineStar, MdOutlineApartment, MdLocationOn, MdOutlinePerson,
  MdCalendarToday, MdOutlineFilterList, MdOutlineStar as MdStar, MdOutlineInfo, MdOutlineMyLocation,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { cardVariants, containerVariants, pageVariants } from '../../utils/animations';
import logo from '../../assets/logo2.png';

const getInitials = () => {
  try {
    const u = JSON.parse(localStorage.getItem('moveryy_user'));
    if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
    if (u?.name) return u.name.charAt(0).toUpperCase();
  } catch { }
  return null;
};

const movers = [
  { name: 'Corporate Move Pro', rating: 4.8, reviews: 142, distance: '1.2 km away', time: '1-2 days', price: '₹3,500', tags: ['Legal Offices', 'IT Equipment', 'Secure Documents', 'Weekend Service'], color: 'text-blue-600' },
  { name: 'BizShift Solutions', rating: 4.8, reviews: 107, distance: '2.1 km away', time: '2-3 days', price: '₹2,800', tags: ['Small Offices', 'Quick Setup', 'Budget Friendly', 'Insurance Included'], color: 'text-red-500' },
  { name: 'Enterprise Relocators', rating: 4.7, reviews: 189, distance: '3.6 km away', time: '1 day', price: '₹4,200', tags: ['Large Offices', 'High Value Removal', 'Premium Service', 'Same Day'], color: 'text-green-500' },
  { name: 'StartupMove Express', rating: 4.6, reviews: 152, distance: '2.8 km away', time: '2-3 days', price: '₹2,200', tags: ['Co-working Spaces', 'Quick Moves', 'Startup Friendly', 'Flexible Timing'], color: 'text-purple-500' },
];

const specialReqs = ['Fragile equipment handling', 'IT setup assistance', 'Furniture assembly/disassembly', 'Secure document handling'];

const MoverCard = ({ m }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center">
          <MdOutlineApartment size={22} className={m.color} />
        </div>
        <div>
          <p className="font-black text-slate-900">{m.name}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5 flex-wrap">
            <MdStar size={12} className="text-yellow-400" />
            <span className="font-semibold">{m.rating}</span>
            <span className="text-slate-300">({m.reviews})</span>
            <span className="text-slate-300">·</span>
            <span>{m.distance}</span>
            <span className="text-slate-300">·</span>
            <span>{m.time}</span>
          </div>
        </div>
      </div>
      <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Verified</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-5">
      {m.tags.map(t => (
        <span key={t} className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-100">{t}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
      <div>
        <p className="text-2xl font-black text-blue-600">{m.price}</p>
        <p className="text-xs text-slate-400 font-semibold">starting from</p>
      </div>
      <button className="px-6 py-2.5 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-colors shadow-sm active:scale-95">
        Book Now
      </button>
    </div>
  </motion.div>
);

const OfficeRelocationSearchPage = () => {
  const initials = getInitials();

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="bg-[#F8FAFC] min-h-screen font-sans">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-8 md:px-14 h-14 flex items-center justify-between">
          <NavLink to="/"><img src={logo} alt="Moveryy" className="h-9 w-auto object-contain" /></NavLink>
          <NavLink to="/profile">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">
              {initials ?? <MdOutlinePerson size={18} />}
            </div>
          </NavLink>
        </div>
      </header>

      {/* ── Blue Hero ── */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-500 rounded-full opacity-10" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-blue-400 rounded-full opacity-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pt-12 pb-28">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

            {/* Left — text only, no icon */}
            <div className="flex flex-col gap-4 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Seamless<br />
                <span className="text-yellow-400">Office Relocation</span>
              </h1>
              <span className="inline-flex items-center gap-2 bg-blue-500/60 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit shadow-md backdrop-blur-sm">
                <MdOutlineStar className="text-yellow-400" size={16} />
                Trusted Office Shifting
              </span>
              <p className="text-base md:text-lg text-blue-100 leading-relaxed mt-1">
                Secure, efficient office shifting with minimal downtime.
                From small startups to large enterprises — we move it all.
              </p>
            </div>

            {/* Right — stats card */}
            <div className="hidden lg:flex flex-shrink-0">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6 min-w-[240px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-md">
                    <MdOutlineStar size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">4.8★</p>
                    <p className="text-xs text-blue-200">Customer Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center shadow-md">
                    <MdOutlineApartment size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">1500+</p>
                    <p className="text-xs text-blue-200">Office Moves Done</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8FAFC" />
          </svg>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 pb-10">

        {/* Yellow search card */}
        <motion.div variants={cardVariants}
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl px-8 py-10 shadow-2xl relative overflow-hidden mt-10"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16" />

          <h2 className="text-xl font-black text-white mb-6 relative z-10 tracking-wide">Where is your office moving?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="relative">
              <MdOutlineMyLocation size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#EAB308' }} />
              <input type="text" placeholder="Current office location"
                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-800 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md placeholder:text-slate-400 outline-none" />
            </div>
            <div className="relative">
              <MdLocationOn size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#22C55E' }} />
              <input type="text" placeholder="New office location"
                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-800 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md placeholder:text-slate-400 outline-none" />
            </div>
            <div className="relative">
              <MdCalendarToday size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="date"
                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-700 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md outline-none" />
            </div>
            <div className="relative">
              <MdOutlineApartment size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <select className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-700 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md outline-none appearance-none">
                <option value="">Office Size (for accurate quote)</option>
                <option>Small (1–10 employees)</option>
                <option>Medium (11–50 employees)</option>
                <option>Large (50+ employees)</option>
              </select>
            </div>
          </div>

          {/* Special requirements */}
          <div className="relative z-10 mt-4 bg-white/90 rounded-2xl p-5 shadow-md">
            <p className="text-sm font-black text-slate-700 mb-3">Special Requirements</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specialReqs.map(r => (
                <label key={r} className="flex items-center gap-2.5 text-sm text-slate-600 cursor-pointer font-semibold">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-400" />
                  {r}
                </label>
              ))}
            </div>
          </div>

          <button className="mt-6 relative z-10 bg-white text-orange-500 font-black px-9 py-3 rounded-2xl shadow-lg hover:bg-orange-50 active:scale-95 transition-all text-sm tracking-wide">
            Find Office Movers →
          </button>
        </motion.div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: 'Verified Movers', value: '1500+', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700' },
            { label: 'Offices Relocated', value: '10K+', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700' },
            { label: 'Customer Rating', value: '4.8★', bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-700' },
            { label: 'Cities Covered', value: '200+', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700' },
          ].map(b => (
            <div key={b.label} className={`${b.bg} ${b.border} border rounded-2xl p-5 text-center shadow-sm`}>
              <p className={`text-2xl font-black ${b.text}`}>{b.value}</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">{b.label}</p>
            </div>
          ))}
        </div>

        {/* Filters + Results */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-black text-slate-900">Office Movers <span className="text-blue-600">({movers.length})</span></h3>
              <div className="w-12 h-1 bg-yellow-400 rounded-full mt-1" />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-sm">
                <MdOutlineFilterList size={16} /> Filters
              </button>
              <select className="px-4 py-2 text-sm border border-slate-200 rounded-xl bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm">
                <option>Sort by Price</option>
                <option>Sort by Rating</option>
                <option>Sort by Distance</option>
              </select>
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {movers.map((m, i) => <MoverCard key={i} m={m} />)}
          </motion.div>
        </div>

        {/* How it works */}
        <div className="mt-12">
          <h3 className="text-xl font-black text-slate-900 mb-1">How it works</h3>
          <div className="w-12 h-1 bg-yellow-400 rounded-full mb-7" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Enter Details', desc: 'Tell us your current and new office location, date and size.', color: 'bg-blue-600' },
              { step: '02', title: 'Get Quotes', desc: 'Receive instant quotes from verified office movers near you.', color: 'bg-yellow-500' },
              { step: '03', title: 'Move & Settle', desc: 'Book your mover and be operational in your new office fast.', color: 'bg-green-500' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4 items-start">
                <div className={`${s.color} text-white text-xs font-black w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>{s.step}</div>
                <div>
                  <p className="font-bold text-slate-900 mb-1 text-sm">{s.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-2">
            <MdOutlineInfo size={20} className="text-blue-500" /> Office Relocation Tips
          </h3>
          <div className="w-12 h-1 bg-yellow-400 rounded-full mb-7" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: 'Plan 6–8 Weeks Ahead', desc: 'Start planning early for minimal disruption to your business.' },
              { title: 'Assign a Move Manager', desc: 'Dedicate a project manager to coordinate the entire move.' },
              { title: 'Back Up Digital Data', desc: 'Back up all digital data before disconnecting IT equipment.' },
              { title: 'Notify Stakeholders', desc: 'Inform clients, suppliers, and utilities of your new address.' },
            ].map(f => (
              <div key={f.title} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 text-sm">{f.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose us */}
        <div className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          <h3 className="text-xl font-black text-slate-900 mb-1">Why choose Moveryy?</h3>
          <div className="w-12 h-1 bg-yellow-400 rounded-full mb-7" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: 'Minimal Downtime', desc: 'We work around your schedule to keep your business running.' },
              { title: 'IT Equipment Experts', desc: 'Specialized handling for servers, computers and sensitive gear.' },
              { title: 'Secure Document Handling', desc: 'Confidential files and documents handled with full security.' },
              { title: '24/7 Support', desc: 'Our team is always available to assist you.' },
            ].map(f => (
              <div key={f.title} className="flex gap-3 items-start">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 text-sm">{f.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OfficeRelocationSearchPage;
