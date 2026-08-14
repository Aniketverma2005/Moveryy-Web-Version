import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlinePerson, MdClose, MdArrowBack, MdSearch, MdLocationOn,
  MdMyLocation, MdOutlineWarehouse, MdOutlineFilterList,
  MdOutlineStar as MdStar, MdOutlineInfo, MdOutlineKeyboardArrowDown,
  MdOutlineInventory2,
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

// ── LocationSearchOverlay — same as OfficeShift / Rides / MoveryyGo ──────────
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
            placeholder={isPickup ? 'Search pickup location…' : 'Search storage location…'}
            className="flex-1 bg-transparent text-gray-800 text-sm outline-none placeholder:text-gray-400" />
          {query && (
            <button onClick={() => { setQuery(''); setResults([]); }}>
              <MdClose size={15} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2.5 px-5 py-2 bg-gray-50 border-b border-gray-100">
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: isPickup ? '#22C55E' : '#EF4444' }} />
        <span className="text-xs text-gray-500 font-medium">
          {isPickup ? 'Pickup Location' : 'Storage Location'}
        </span>
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
            <MdLocationOn size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">No locations found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ── Storage facility data ─────────────────────────────────────────────────────
const facilities = [
  { name: 'SecureStore Depot',      rating: 4.9, reviews: 198, distance: '1.1 km away', size: '50 sq ft',  price: '₹1,200/mo', tags: ['Climate Controlled', '24/7 Access', 'CCTV Security', 'Insurance Included'], color: 'text-blue-600'   },
  { name: 'SafeKeep Warehouse',     rating: 4.8, reviews: 143, distance: '2.3 km away', size: '100 sq ft', price: '₹2,100/mo', tags: ['Large Units', 'Fork Lift Access', 'Commercial Storage', 'Flexible Tenure'],   color: 'text-green-600'  },
  { name: 'QuickSpace Storage',     rating: 4.7, reviews: 117, distance: '3.0 km away', size: '25 sq ft',  price: '₹700/mo',  tags: ['Mini Units', 'Short Term', 'Budget Friendly', 'Easy Access'],                  color: 'text-orange-500' },
  { name: 'PremiumVault Solutions', rating: 4.8, reviews: 162, distance: '2.7 km away', size: '200 sq ft', price: '₹3,800/mo', tags: ['Premium Facility', 'Humidity Control', 'Luxury Storage', 'Full Insurance'],    color: 'text-purple-500' },
];

// ── Facility card ─────────────────────────────────────────────────────────────
const FacilityCard = ({ f }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
          <MdOutlineWarehouse size={22} className={f.color} />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-sm">{f.name}</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5 flex-wrap">
            <MdStar size={12} className="text-yellow-400" />
            <span className="font-semibold">{f.rating}</span>
            <span className="text-gray-300">({f.reviews})</span>
            <span className="text-gray-300">·</span>
            <span>{f.distance}</span>
            <span className="text-gray-300">·</span>
            <span>{f.size}</span>
          </div>
        </div>
      </div>
      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Verified</span>
    </div>
    <div className="flex flex-wrap gap-2 mb-5">
      {f.tags.map(t => (
        <span key={t} className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">{t}</span>
      ))}
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
      <div>
        <p className="text-xl font-bold text-blue-600">{f.price}</p>
        <p className="text-xs text-gray-400">starting from</p>
      </div>
      <button className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors active:scale-95">
        Book Now
      </button>
    </div>
  </motion.div>
);

// ── Main page ─────────────────────────────────────────────────────────────────
const StoragePage = () => {
  const initials = getInitials();

  const [pickup,          setPickup]          = useState('');
  const [drop,            setDrop]            = useState('');
  const [locationOverlay, setLocationOverlay] = useState(null);
  const [detailsOpen,     setDetailsOpen]     = useState(false);
  const [searching,       setSearching]       = useState(false);

  const handleSearch = () => {
    if (!pickup.trim()) return;
    setSearching(true);
    setTimeout(() => setSearching(false), 1200);
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show"
      className="min-h-screen bg-[#F3F4F6] font-sans">

      {/* ── Navbar — identical to OfficeShift / Rides ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="w-full px-6 md:px-10 h-14 flex items-center justify-between">
          <NavLink to="/"><img src={logo} alt="Moveryy" className="h-9 w-auto object-contain" /></NavLink>
          <NavLink to="/profile">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
              {initials ?? <MdOutlinePerson size={18} />}
            </div>
          </NavLink>
        </div>
      </header>

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

      {/* ── Main content — MoveryyGo / OfficeShift layout ── */}
      <div className="min-h-[calc(100vh-56px)] bg-white">
        <div className="w-full px-6 md:px-10 pt-8 pb-10">

          {/* Heading + subtitle */}
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Storage</h1>
          <p className="text-gray-500 text-sm mb-8">Secure storage units near you — short or long term</p>

          {/* ── Location fields — dotted connector same as OfficeShift ── */}
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
                {pickup || 'Enter pickup location here'}
              </span>
              {pickup && (
                <button onClick={e => { e.stopPropagation(); setPickup(''); }}>
                  <MdClose size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Gap */}
            <div className="h-7 bg-white" />

            {/* Drop */}
            <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] cursor-pointer hover:bg-[#EAECEE] transition-colors"
              onClick={() => setLocationOverlay('drop')}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #EF4444', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
              <span className={`flex-1 text-sm select-none ${drop ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                {drop || 'Enter drop location here'}
              </span>
              {drop && (
                <button onClick={e => { e.stopPropagation(); setDrop(''); }}>
                  <MdClose size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Search button — identical to OfficeShift / Rides */}
          <button onClick={handleSearch}
            disabled={searching || !pickup.trim()}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 text-sm tracking-wide uppercase transition-colors flex items-center justify-center gap-2">
            {searching
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching…</>
              : 'Find Storage Units'
            }
          </button>
          <p className="text-center text-gray-400 text-xs mt-5">
            Secure, affordable storage with 24/7 access &amp; full insurance
          </p>
        </div>
      </div>

    </motion.div>
  );
};

export default StoragePage;
