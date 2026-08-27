import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlinePerson, MdClose, MdArrowBack, MdSearch, MdLocationOn,
  MdMyLocation, MdOutlineDirectionsCar, MdOutlineFilterList,
  MdOutlineStar as MdStar, MdOutlineInfo, MdOutlineKeyboardArrowDown,
  MdHistory, MdSecurity,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { cardVariants, containerVariants, pageVariants } from '../../utils/animations';
import logo from '../../assets/logo2.png';

// ── helpers ───────────────────────────────────────────────────────────────────
const getInitials = () => {
  try {
    const u = JSON.parse(localStorage.getItem('moveryy_user'));
    if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
    if (u?.name)      return u.name.charAt(0).toUpperCase();
  } catch { }
  return null;
};

// ── LocationSearchOverlay — exact same as House_Moving / MoveryyGo ────────────
const LocationSearchOverlay = ({ type, onSelect, onClose }) => {
  const [query,      setQuery]      = useState('');
  const [results,    setResults]    = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const inputRef    = useRef(null);
  const debounceRef = useRef(null);
  const isPickup    = type === 'pickup';

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 100); }, []);

  const searchLocations = useCallback(async (q) => {
    if (!q.trim() || q.trim().length < 2) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&addressdetails=1&limit=6&countrycodes=in`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      setResults(data.map(item => ({
        id:   item.place_id,
        name: item.display_name.split(',').slice(0, 2).join(', '),
        full: item.display_name,
      })));
    } catch { setResults([]); }
    finally   { setLoading(false); }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchLocations(val), 350);
  };

  const handleGPS = () => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          onSelect(data.display_name?.split(',').slice(0, 3).join(', ') || 'Current Location');
        } catch { onSelect('Current Location'); }
        finally   { setGpsLoading(false); }
      },
      () => setGpsLoading(false),
      { timeout: 8000 }
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <MdArrowBack size={20} className="text-gray-600" />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2.5">
          <MdSearch size={17} className="text-gray-400 flex-shrink-0" />
          <input ref={inputRef} type="text" value={query} onChange={handleChange}
            placeholder={isPickup ? 'Search pickup location…' : 'Search drop location…'}
            className="flex-1 bg-transparent text-gray-800 text-sm outline-none placeholder:text-gray-400" />
          {query && <button onClick={() => { setQuery(''); setResults([]); }}><MdClose size={15} className="text-gray-400" /></button>}
        </div>
      </div>
      <div className="flex items-center gap-2.5 px-5 py-2 bg-gray-50 border-b border-gray-100">
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: isPickup ? '#22C55E' : '#EF4444' }} />
        <span className="text-xs text-gray-500 font-medium">{isPickup ? 'Pickup Location' : 'Drop Location'}</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        <button onClick={handleGPS} disabled={gpsLoading}
          className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
            {gpsLoading
              ? <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              : <MdMyLocation size={18} className="text-blue-600" />}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-800">Use Current Location</p>
            <p className="text-xs text-gray-400">Using GPS</p>
          </div>
        </button>
        {loading && (
          <div className="flex flex-col items-center py-14 gap-3">
            <span className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Searching locations…</p>
          </div>
        )}
        {!loading && results.length > 0 && results.map(r => (
          <button key={r.id} onClick={() => onSelect(r.name)}
            className="w-full flex items-start gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 text-left">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MdLocationOn size={16} className="text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{r.name}</p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{r.full}</p>
            </div>
          </button>
        ))}
        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="flex flex-col items-center py-14 gap-2">
            <MdSearch size={36} className="text-gray-200" />
            <p className="text-sm text-gray-400">No results for "{query}"</p>
          </div>
        )}
        {!loading && query.length < 2 && (
          <div className="px-5 pt-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Popular Cities</p>
            {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'].map(city => (
              <button key={city} onClick={() => { setQuery(city); searchLocations(city); }}
                className="w-full flex items-center gap-3 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left">
                <MdHistory size={15} className="text-gray-300 flex-shrink-0" />
                <span className="text-sm text-gray-600">{city}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ── Transporter data — unchanged ──────────────────────────────────────────────
const transporters = [
  { name: 'AutoMove Express',   rating: 4.8, reviews: 160, distance: '1.6 km away', time: '2-3 days', price: '₹800',   tags: ['Reliable Transport', 'Insurance Included', 'Door to Door'],    color: 'text-green-500'  },
  { name: 'SafeCar Transport',  rating: 4.7, reviews: 210, distance: '2.4 km away', time: '1-2 days', price: '₹950',   tags: ['Live Tracking', '24/7 Support', 'Professional Team'],           color: 'text-orange-500' },
  { name: 'QuickDrive Movers',  rating: 4.6, reviews: 144, distance: '3.2 km away', time: '3-4 days', price: '₹750',   tags: ['Budget Friendly', 'Open Transport', 'Local Expert'],            color: 'text-blue-600'   },
  { name: 'Premium Auto Shift', rating: 4.8, reviews: 178, distance: '2.8 km away', time: '1-2 days', price: '₹1,200', tags: ['Premium Service', 'Enclosed Transport', 'Safety Specialist'],   color: 'text-purple-500' },
];

// ── Transporter card — unchanged ──────────────────────────────────────────────
const TransporterCard = ({ t }) => (
  <motion.div variants={cardVariants} whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineDirectionsCar size={22} className={t.color} />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{t.name}</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5 flex-wrap">
            <MdStar size={12} className="text-yellow-400" />
            <span className="font-semibold">{t.rating}</span>
            <span className="text-gray-300">({t.reviews})</span>
            <span className="text-gray-300">·</span>
            <span>{t.distance}</span>
            <span className="text-gray-300">·</span>
            <span>{t.time}</span>
          </div>
        </div>
      </div>
      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Verified</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-5">
      {t.tags.map(tag => (
        <span key={tag} className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">{tag}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
      <div>
        <p className="text-xl font-bold text-blue-600">{t.price}</p>
        <p className="text-xs text-gray-400">starting from</p>
      </div>
      <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors active:scale-95">
        Book Now
      </button>
    </div>
  </motion.div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const CarTransportSearchPage = () => {
  const initials = getInitials();

  const [pickup,          setPickup]          = useState('');
  const [drop,            setDrop]            = useState('');
  const [locationOverlay, setLocationOverlay] = useState(null);
  const [carOpen,         setCarOpen]         = useState(false);
  const [searching,       setSearching]       = useState(false);

  const handleContinue = () => {
    if (!pickup.trim() || !drop.trim()) return;
    setSearching(true);
    setTimeout(() => setSearching(false), 1200);
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show"
      className="min-h-screen bg-[#F3F4F6] font-sans">

      {/* ── Location overlay ── */}
      <AnimatePresence>
        {locationOverlay && (
          <LocationSearchOverlay
            type={locationOverlay}
            onSelect={val => {
              if (locationOverlay === 'pickup') setPickup(val);
              else setDrop(val);
              setLocationOverlay(null);
            }}
            onClose={() => setLocationOverlay(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Welcome step — EXACT same layout as House_Moving / MoveryyGo ── */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
        className="min-h-[calc(100vh)] bg-white relative overflow-hidden flex flex-col border-b border-gray-200">

        {/* ── Top badge strip — EXACT same as House_Moving ── */}
        <div className="w-full flex items-center justify-center gap-6 py-3 bg-white border-b border-gray-100 relative z-10">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <img src="https://flagcdn.com/w40/in.png" alt="India flag"
              className="w-6 h-4 object-cover rounded-sm" style={{ display: 'inline-block' }} />
            Made for India
          </span>
          <span className="w-px h-5 bg-gray-200" />
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4444" className="flex-shrink-0">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
            Crafted in Noida
          </span>
        </div>

        {/* ── Decorative left location pin — EXACT same as House_Moving ── */}
        <div className="absolute left-0 bottom-16 pointer-events-none select-none z-0 opacity-[0.07]">
          <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
            <path d="M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100S120 105 120 60C120 26.863 93.137 0 60 0z" fill="#3B82F6"/>
            <circle cx="60" cy="60" r="24" fill="white"/>
          </svg>
        </div>

        {/* ── Decorative right location pin — EXACT same as House_Moving ── */}
        <div className="absolute right-0 top-16 pointer-events-none select-none z-0 opacity-[0.07]">
          <svg width="80" height="110" viewBox="0 0 120 160" fill="none">
            <path d="M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100S120 105 120 60C120 26.863 93.137 0 60 0z" fill="#3B82F6"/>
            <circle cx="60" cy="60" r="24" fill="white"/>
          </svg>
        </div>

        {/* ── City skyline watermark right — EXACT same as House_Moving ── */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 opacity-[0.06]">
          <svg width="320" height="200" viewBox="0 0 320 200" fill="none">
            <rect x="10"  y="100" width="30" height="100" fill="#3B82F6"/>
            <rect x="18"  y="80"  width="14" height="20"  fill="#3B82F6"/>
            <rect x="48"  y="60"  width="28" height="140" fill="#3B82F6"/>
            <rect x="54"  y="40"  width="10" height="20"  fill="#3B82F6"/>
            <rect x="84"  y="80"  width="22" height="120" fill="#3B82F6"/>
            <rect x="114" y="50"  width="36" height="150" fill="#3B82F6"/>
            <rect x="120" y="30"  width="8"  height="20"  fill="#3B82F6"/>
            <rect x="130" y="20"  width="8"  height="30"  fill="#3B82F6"/>
            <rect x="158" y="70"  width="26" height="130" fill="#3B82F6"/>
            <rect x="192" y="90"  width="20" height="110" fill="#3B82F6"/>
            <rect x="220" y="55"  width="32" height="145" fill="#3B82F6"/>
            <rect x="226" y="35"  width="8"  height="20"  fill="#3B82F6"/>
            <rect x="260" y="75"  width="24" height="125" fill="#3B82F6"/>
            <rect x="292" y="95"  width="28" height="105" fill="#3B82F6"/>
            <rect x="16"  y="110" width="6" height="6" fill="white" opacity="0.4"/>
            <rect x="26"  y="110" width="6" height="6" fill="white" opacity="0.4"/>
            <rect x="52"  y="70"  width="5" height="5" fill="white" opacity="0.4"/>
            <rect x="62"  y="70"  width="5" height="5" fill="white" opacity="0.4"/>
            <rect x="118" y="60"  width="6" height="6" fill="white" opacity="0.4"/>
            <rect x="132" y="60"  width="6" height="6" fill="white" opacity="0.4"/>
            <rect x="220" y="65"  width="5" height="5" fill="white" opacity="0.4"/>
            <rect x="232" y="65"  width="5" height="5" fill="white" opacity="0.4"/>
          </svg>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col w-full px-6 md:px-10 pt-8 pb-10 relative z-10">

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome to <span className="text-blue-600">Car Moving!</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8">Professional door-to-door car transport across India</p>

          {/* ── Location fields — EXACT same as House_Moving ── */}
          <div className="w-full relative">
            <div style={{
              position: 'absolute', left: '24px', top: '26px',
              width: '1.5px', height: 'calc(100% - 52px)',
              background: 'repeating-linear-gradient(to bottom,#9CA3AF 0,#9CA3AF 4px,transparent 4px,transparent 9px)',
              zIndex: 1,
            }} />

            {/* Pickup */}
            <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] cursor-pointer hover:bg-[#EAECEE] transition-colors"
              onClick={() => setLocationOverlay('pickup')}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #22C55E', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
              <span className={`flex-1 text-sm select-none ${pickup ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                {pickup || 'Where are you...'}
              </span>
              {pickup && <button onClick={e => { e.stopPropagation(); setPickup(''); }}><MdClose size={14} className="text-gray-400 hover:text-gray-600" /></button>}
            </div>

            {/* Gap */}
            <div className="h-7 bg-white" />

            {/* Drop */}
            <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] cursor-pointer hover:bg-[#EAECEE] transition-colors"
              onClick={() => setLocationOverlay('drop')}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #EF4444', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
              <span className={`flex-1 text-sm select-none ${drop ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                {drop || 'Where are you moving...'}
              </span>
              {drop && <button onClick={e => { e.stopPropagation(); setDrop(''); }}><MdClose size={14} className="text-gray-400 hover:text-gray-600" /></button>}
            </div>
          </div>

          {/* Continue button — EXACT same as MoveryyGo */}
          <button onClick={handleContinue}
            disabled={searching || !pickup.trim() || !drop.trim()}
            className="mt-5 w-full bg-[#7B9FE8] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 text-sm tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2">
            {searching
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching…</>
              : 'CONTINUE'
            }
          </button>

          {/* Shield badge — EXACT same as House_Moving */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <MdSecurity size={20} className="text-blue-400 flex-shrink-0" />
            <p className="text-gray-400 text-sm">Smart ridepooling &amp; sharing</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarTransportSearchPage;
