import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdClose, MdArrowBack, MdSearch, MdLocationOn,
  MdMyLocation, MdOutlineDirectionsCar, MdOutlinePhone, MdCheck, MdEdit,
  MdOutlineAccessTime, MdOutlineVerified, MdSecurity,
  MdOutlineStar as MdStar,
} from 'react-icons/md';
import { cardVariants, containerVariants, pageVariants } from '../../utils/animations';

// ── helpers ───────────────────────────────────────────────────────────────────
const getInitials = () => {
  try {
    const u = JSON.parse(localStorage.getItem('moveryy_user'));
    if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
    if (u?.name)      return u.name.charAt(0).toUpperCase();
  } catch { }
  return null;
};

// ── LocationSearchOverlay — same as OfficeShift / MoveryyGo ──────────────────
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
          {query && (
            <button onClick={() => { setQuery(''); setResults([]); }}>
              <MdClose size={15} className="text-gray-400" />
            </button>
          )}
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
            <MdLocationOn size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">No locations found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ── Ride data — unchanged ─────────────────────────────────────────────────────
const RIDE_TYPES = [
  { id: 'cab',  label: 'Cab',  icon: 'car',  desc: 'Comfortable AC cab',       multiplier: 1.0 },
  { id: 'bike', label: 'Bike', icon: 'bike', desc: 'Quick bike ride',           multiplier: 0.5 },
  { id: 'auto', label: 'Auto', icon: 'auto', desc: 'Affordable auto rickshaw',  multiplier: 0.7 },
];

const MOCK_DRIVERS = [
  { id: 1, name: 'Arjun Sharma',  avatar: 'A', color: 'bg-blue-600', rating: 4.9, trips: 1240, verified: true,  vehicle: 'Swift Dzire',   plate: 'DL 4C 2341',   eta: '3 min', distance: '0.8 km', basePrice: { cab: 220, bike: 110, auto: 150 } },
  { id: 2, name: 'Priya Mehta',   avatar: 'P', color: 'bg-blue-600', rating: 4.8, trips: 870,  verified: true,  vehicle: 'Honda Activa',  plate: 'MH 12 AB 987', eta: '5 min', distance: '1.2 km', basePrice: { cab: 200, bike: 100, auto: 140 } },
  { id: 3, name: 'Rahul Verma',   avatar: 'R', color: 'bg-blue-600', rating: 4.7, trips: 620,  verified: false, vehicle: 'Bajaj Auto',    plate: 'KA 05 MN 451', eta: '7 min', distance: '1.9 km', basePrice: { cab: 180, bike: 90,  auto: 130 } },
  { id: 4, name: 'Sneha Kapoor',  avatar: 'S', color: 'bg-blue-600', rating: 4.6, trips: 430,  verified: true,  vehicle: 'Hyundai i20',  plate: 'UP 32 GH 782', eta: '9 min', distance: '2.4 km', basePrice: { cab: 160, bike: 80,  auto: 120 } },
];

// ── Driver card — unchanged ───────────────────────────────────────────────────
const DriverCard = ({ driver, rideType, offeredPrice, onPriceChange, onSelect, isSelected }) => {
  const [editing,  setEditing]  = useState(false);
  const [inputVal, setInputVal] = useState(String(offeredPrice));

  const handleConfirm = () => {
    const parsed = parseInt(inputVal, 10);
    if (!isNaN(parsed) && parsed >= 30) onPriceChange(driver.id, parsed);
    else setInputVal(String(offeredPrice));
    setEditing(false);
  };

  const base       = driver.basePrice[rideType];
  const diff       = offeredPrice - base;
  const diffLabel  = diff === 0 ? null : diff > 0 ? `+₹${diff} above estimate` : `₹${Math.abs(diff)} below estimate`;
  const diffColor  = diff >= 0 ? 'text-green-600' : 'text-red-500';

  return (
    <motion.div variants={cardVariants} layout
      className={`relative bg-white rounded-2xl border-2 transition-all duration-300 shadow-sm overflow-hidden ${
        isSelected ? 'border-blue-500 shadow-blue-100 shadow-lg' : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
          <MdCheck size={16} className="text-white" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-12 h-12 ${driver.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md`}>
            {driver.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-gray-900 text-base">{driver.name}</p>
              {driver.verified && <MdOutlineVerified size={16} className="text-blue-500 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-xs font-bold text-gray-600">
                <MdStar size={14} className="text-yellow-500" />{driver.rating}
              </span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-xs text-gray-500">{driver.trips} trips</span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-xs text-gray-500">{driver.distance}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <MdOutlineDirectionsCar size={14} className="text-gray-400" />
              <p className="text-xs text-gray-500 truncate">{driver.vehicle} · {driver.plate}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 bg-gray-50 rounded-xl px-4 py-4">
          <div className="flex items-center gap-2">
            <MdOutlineAccessTime size={16} className="text-blue-500" />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">ETA</p>
              <p className="text-sm font-bold text-gray-800">{driver.eta}</p>
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimate</p>
            <p className="text-sm font-bold text-gray-800">₹{base}</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Your Offer</p>
            {editing ? (
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-700">₹</span>
                <input type="number" value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onBlur={handleConfirm}
                  onKeyDown={e => e.key === 'Enter' && handleConfirm()}
                  autoFocus
                  className="w-14 text-sm font-bold text-gray-900 border-b-2 border-blue-400 outline-none bg-transparent"
                />
              </div>
            ) : (
              <button onClick={() => { setInputVal(String(offeredPrice)); setEditing(true); }} className="flex items-center gap-1.5 group">
                <span className="text-sm font-bold text-blue-600">₹{offeredPrice}</span>
                <MdEdit size={13} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
              </button>
            )}
            {diffLabel && <p className={`text-[10px] font-semibold mt-0.5 ${diffColor}`}>{diffLabel}</p>}
          </div>
        </div>

        <button onClick={() => onSelect(driver.id)}
          className={`mt-4 w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all active:scale-95 ${
            isSelected
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200'
          }`}
        >
          {isSelected ? '✓ Driver Selected' : 'Select This Driver'}
        </button>
      </div>
    </motion.div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
const RidesPage = () => {
  const [pickup,          setPickup]          = useState('');
  const [drop,            setDrop]            = useState('');
  const [locationOverlay, setLocationOverlay] = useState(null);
  const [rideType,        setRideType]        = useState('cab');
  const [searched,        setSearched]        = useState(false);
  const [searching,       setSearching]       = useState(false);
  const [offeredPrices,   setOfferedPrices]   = useState({});
  const [selectedDriver,  setSelectedDriver]  = useState(null);
  const [booked,          setBooked]          = useState(false);

  const handleSearch = () => {
    if (!pickup.trim() || !drop.trim()) return;
    setSearching(true); setSearched(false); setSelectedDriver(null); setBooked(false);
    const prices = {};
    MOCK_DRIVERS.forEach(d => { prices[d.id] = d.basePrice[rideType]; });
    setOfferedPrices(prices);
    setTimeout(() => { setSearching(false); setSearched(true); }, 1400);
  };

  const handlePriceChange = (id, price) => setOfferedPrices(prev => ({ ...prev, [id]: price }));
  const handleSelect      = (id) => setSelectedDriver(prev => prev === id ? null : id);
  const selectedData      = MOCK_DRIVERS.find(d => d.id === selectedDriver);

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

      {/* ── Welcome panel — same design as MoveryyGo ── */}
      <div className="min-h-[calc(100vh-56px)] bg-white relative overflow-hidden flex flex-col">

        {/* Top badge strip */}
        <div className="w-full flex items-center justify-center gap-6 py-3 bg-white border-b border-gray-100 relative z-10">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <img
              src="https://flagcdn.com/w40/in.png"
              alt="India flag"
              className="w-6 h-4 object-cover rounded-sm"
            />
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

        {/* #MOVERYY watermark removed */}

        {/* Decorative left location pin */}
        <div className="absolute left-0 bottom-16 pointer-events-none select-none z-0 opacity-[0.07]">
          <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
            <path d="M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100S120 105 120 60C120 26.863 93.137 0 60 0z" fill="#3B82F6"/>
            <circle cx="60" cy="60" r="24" fill="white"/>
          </svg>
        </div>

        {/* Decorative right location pin */}
        <div className="absolute right-0 top-16 pointer-events-none select-none z-0 opacity-[0.07]">
          <svg width="80" height="110" viewBox="0 0 120 160" fill="none">
            <path d="M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100S120 105 120 60C120 26.863 93.137 0 60 0z" fill="#3B82F6"/>
            <circle cx="60" cy="60" r="24" fill="white"/>
          </svg>
        </div>

        {/* City skyline watermark */}
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

        {/* Main content */}
        <div className="flex-1 flex flex-col w-full pt-3 pb-12 relative z-10" style={{ paddingLeft: 15, paddingRight: 15 }}>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome to <span className="text-blue-600">Moveryy Rides!</span>
          </h1>
          <p className="text-gray-500 text-sm mb-8">Book a cab, bike or auto — negotiate your fare</p>

          {/* Location fields with dotted connector */}
          <div className="w-full relative">
            <div style={{
              position: 'absolute', left: '28px', top: '26px',
              width: '1.5px', height: 'calc(100% - 52px)',
              background: 'repeating-linear-gradient(to bottom,#9CA3AF 0,#9CA3AF 4px,transparent 4px,transparent 9px)',
              zIndex: 1,
            }} />

            {/* Pickup */}
            <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] rounded-md cursor-pointer hover:bg-[#EAECEE] transition-colors"
              onClick={() => setLocationOverlay('pickup')}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #22C55E', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
              <span className={`flex-1 text-sm select-none ${pickup ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                {pickup || 'Enter pickup location here'}
              </span>
              {pickup && (
                <button onClick={e => { e.stopPropagation(); setPickup(''); setSearched(false); }}>
                  <MdClose size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Gap */}
            <div className="h-7 bg-white" />

            {/* Drop */}
            <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] rounded-md cursor-pointer hover:bg-[#EAECEE] transition-colors"
              onClick={() => setLocationOverlay('drop')}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #EF4444', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
              <span className={`flex-1 text-sm select-none ${drop ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                {drop || 'Enter drop location here'}
              </span>
              {drop && (
                <button onClick={e => { e.stopPropagation(); setDrop(''); setSearched(false); }}>
                  <MdClose size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Search button — same periwinkle style as MoveryyGo */}
          <button onClick={handleSearch}
            disabled={searching || !pickup.trim() || !drop.trim()}
            className="mt-5 w-full bg-[#7B9FE8] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 text-sm tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2">
            {searching
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching…</>
              : 'SEARCH DRIVERS'
            }
          </button>

          {/* Shield badge */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <MdSecurity size={20} className="text-blue-400 flex-shrink-0" />
            <p className="text-gray-400 text-sm">Safe, fast &amp; affordable rides</p>
          </div>
        </div>
      </div>

      {/* ── Driver results section ── */}
      <div className="w-full pb-20" style={{ paddingLeft: 15, paddingRight: 15 }}>

        {/* Driver results — all logic unchanged */}
        <AnimatePresence>
          {searched && (
            <motion.div key="results"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
              className="mt-10">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Available Drivers</h3>
                  <div className="w-10 h-1 bg-yellow-400 rounded-full mt-1" />
                </div>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  {MOCK_DRIVERS.length} nearby · {RIDE_TYPES.find(r => r.id === rideType)?.label}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6 mt-2">
                Tap <span className="font-bold text-blue-600">✏ edit</span> on the offer price to negotiate your fare.
              </p>
              <motion.div variants={containerVariants} initial="hidden" animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MOCK_DRIVERS.map(driver => (
                  <DriverCard key={driver.id} driver={driver} rideType={rideType}
                    offeredPrice={offeredPrices[driver.id] ?? driver.basePrice[rideType]}
                    onPriceChange={handlePriceChange}
                    onSelect={handleSelect}
                    isSelected={selectedDriver === driver.id}
                  />
                ))}
              </motion.div>

              {/* Confirm bar — unchanged */}
              <AnimatePresence>
                {selectedDriver && !booked && (
                  <motion.div key="bar"
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                    className="mt-8 bg-gray-900 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xl">
                    <div>
                      <p className="text-white font-bold text-base">
                        {selectedData?.name}<span className="text-yellow-400 ml-2">· ₹{offeredPrices[selectedDriver]}</span>
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{selectedData?.vehicle} · {selectedData?.plate}</p>
                      <p className="text-gray-400 text-xs">{selectedData?.eta} · {selectedData?.distance}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <a href="tel:+919999999999"
                        className="flex items-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">
                        <MdOutlinePhone size={16} /> Call
                      </a>
                      <button onClick={() => setBooked(true)}
                        className="bg-yellow-400 text-gray-900 px-7 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-300 active:scale-95 transition-all shadow-lg">
                        Confirm Ride
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Booked state — unchanged */}
              <AnimatePresence>
                {booked && (
                  <motion.div key="booked"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <MdCheck size={36} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">Ride Confirmed!</h3>
                    <p className="text-green-100 text-sm mb-1">{selectedData?.name} is on the way</p>
                    <p className="text-white font-bold text-lg">₹{offeredPrices[selectedDriver]} · {selectedData?.eta}</p>
                    <p className="text-green-200 text-xs mt-2">{selectedData?.vehicle} · {selectedData?.plate}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RidesPage;
