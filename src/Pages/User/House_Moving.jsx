import { motion } from 'framer-motion';
import { MdOutlineStar, MdOutlineLocalShipping, MdCalendarToday, MdLocationOn, MdOutlinePerson, MdOutlineMyLocation } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { cardVariants, pageVariants } from '../../utils/animations';
import houseShiftIcon from '../../assets/houseshift.png';
import logo from '../../assets/logo2.png';

const getInitials = () => {
  try {
    const u = JSON.parse(localStorage.getItem('moveryy_user'));
    if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
    if (u?.name) return u.name.charAt(0).toUpperCase();
  } catch { /* empty */ }
  return null;
};

const MoverSearchPage = () => {
  const initials = getInitials();

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="bg-[#F8FAFC] min-h-screen font-sans"
    >
      {/* ── White Navbar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-8 md:px-14 h-14 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/">
            <img
              src={logo}
              alt="Moveryy"
              className="h-9 w-auto object-contain"
            />
          </NavLink>

          {/* Profile avatar */}
          <NavLink to="/profile">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">
              {initials ?? <MdOutlinePerson size={18} />}
            </div>
          </NavLink>
        </div>
      </header>

      {/* ── Blue Hero ── */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-500 rounded-full opacity-10" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-blue-400 rounded-full opacity-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pt-12 pb-28">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">

            {/* Left — text content only, no icon above */}
            <div className="flex flex-col gap-4 max-w-xl">
              {/* Heading — house icon removed */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Hassle-free <br />
                <span className="text-yellow-400">House Moving</span>
              </h1>

              {/* Trusted quote badge */}
              <span className="inline-flex items-center gap-2 bg-blue-500/60 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit shadow-md backdrop-blur-sm">
                <MdOutlineStar className="text-yellow-400" size={16} />
                Trusted House Relocation
              </span>

              <p className="text-base md:text-lg text-blue-100 leading-relaxed mt-1">
                Reliable movers, transparent pricing, and seamless relocation
                from door to door — anywhere in India.
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
                    <MdOutlineLocalShipping size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">5000+</p>
                    <p className="text-xs text-blue-200">Verified Movers</p>
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

      {/* ── Main content ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-14 pb-10">

        {/* Where are you moving — pulled up to overlap the wave */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl px-8 py-10 shadow-2xl relative mt-10"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16" />

          <h2 className="text-xl font-black text-white mb-6 relative z-10 tracking-wide">
            Where are you moving?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            <div className="relative">
              <MdLocationOn size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#22C55E' }} />
              <input
                type="text"
                placeholder="Drop Location"
                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-800 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md placeholder:text-slate-400 outline-none"
              />
            </div>
            <div className="relative">
              <MdCalendarToday size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-700 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md outline-none"
              />
            </div>
          </div>

          <button className="mt-6 relative z-10 bg-white text-orange-500 font-black px-9 py-3 rounded-2xl shadow-lg hover:bg-orange-50 active:scale-95 transition-all text-sm tracking-wide">
            Find Movers →
          </button>
        </motion.div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: 'Verified Movers', value: '5000+', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700' },
            { label: 'Moves Completed', value: '50K+', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700' },
            { label: 'Customer Rating', value: '4.8★', bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-700' },
            { label: 'Cities Covered', value: '400+', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700' },
          ].map((b) => (
            <div key={b.label} className={`${b.bg} ${b.border} border rounded-2xl p-5 text-center shadow-sm`}>
              <p className={`text-2xl font-black ${b.text}`}>{b.value}</p>
              <p className="text-xs text-slate-500 font-semibold mt-1">{b.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-12">
          <h3 className="text-xl font-black text-slate-900 mb-1">How it works</h3>
          <div className="w-12 h-1 bg-yellow-400 rounded-full mb-7" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: '01', title: 'Enter Details', desc: 'Tell us your drop location and preferred moving date.', color: 'bg-blue-600' },
              { step: '02', title: 'Get Quotes', desc: 'Receive instant quotes from verified movers near you.', color: 'bg-yellow-500' },
              { step: '03', title: 'Relax & Move', desc: 'Book your mover and let the professionals handle the rest.', color: 'bg-green-500' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-4 items-start">
                <div className={`${s.color} text-white text-xs font-black w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {s.step}
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1 text-sm">{s.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
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
              { title: 'Transparent Pricing', desc: 'No hidden charges. What you see is what you pay.' },
              { title: 'Insured Moves', desc: 'Your belongings are covered throughout the move.' },
              { title: 'Trained Professionals', desc: 'Experienced packers and movers at your service.' },
              { title: '24/7 Support', desc: 'Our team is always available to assist you.' },
            ].map((f) => (
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

export default MoverSearchPage;
