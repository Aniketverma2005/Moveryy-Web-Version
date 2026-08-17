
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineStar, MdLocationOn, MdOutlinePerson, MdOutlineMyLocation,
  MdOutlineDirectionsCar, MdCheck, MdOutlineAccessTime,
  MdOutlineVerified, MdOutlineAddCircleOutline,
  MdCalendarToday, MdClose, MdArrowBack, MdSearch, MdMyLocation, MdHistory,
  MdSecurity,
} from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
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

// ── Location Search Overlay ───────────────────────────────────────────────────
const LocationSearchOverlay = ({ type, onSelect, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const isPickup = type === 'pickup';

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
        id: item.place_id,
        name: item.display_name.split(',').slice(0, 2).join(', '),
        full: item.display_name,
      })));
    } catch { setResults([]); }
    finally { setLoading(false); }
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
        finally { setGpsLoading(false); }
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
            {gpsLoading ? <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
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

// ── Mock rides ────────────────────────────────────────────────────────────────
const MOCK_RIDES = [
  { id: 1, driver: 'Arjun Sharma', avatar: 'A', rating: 4.9, trips: 1240, verified: true, vehicle: 'Swift Dzire', plate: 'DL 4C 2341', from: 'Connaught Place, Delhi', to: 'Sector 62, Noida', date: 'Today', departureTime: '10:30 AM', totalSeats: 4, seatsLeft: 2, pricePerSeat: 120, distance: '28 km', duration: '45 min', amenities: ['AC', 'Music', 'No Smoking'], passengers: [{ name: 'Riya', avatar: 'R' }, { name: 'Karan', avatar: 'K' }] },
  { id: 2, driver: 'Priya Mehta', avatar: 'P', rating: 4.8, trips: 870, verified: true, vehicle: 'Honda City', plate: 'MH 12 AB 9876', from: 'Bandra, Mumbai', to: 'Andheri East, Mumbai', date: 'Today', departureTime: '11:00 AM', totalSeats: 3, seatsLeft: 3, pricePerSeat: 80, distance: '12 km', duration: '30 min', amenities: ['AC', 'No Pets'], passengers: [] },
  { id: 3, driver: 'Rahul Verma', avatar: 'R', rating: 4.7, trips: 620, verified: false, vehicle: 'Maruti Ertiga', plate: 'KA 05 MN 4512', from: 'Koramangala, Bangalore', to: 'Electronic City, Bangalore', date: 'Tomorrow', departureTime: '08:00 AM', totalSeats: 6, seatsLeft: 4, pricePerSeat: 95, distance: '18 km', duration: '40 min', amenities: ['AC', 'Music', 'Luggage Space'], passengers: [{ name: 'Amit', avatar: 'A' }, { name: 'Sneha', avatar: 'S' }] },
  { id: 4, driver: 'Sneha Kapoor', avatar: 'S', rating: 4.6, trips: 430, verified: true, vehicle: 'Hyundai i20', plate: 'UP 32 GH 7823', from: 'Salt Lake, Kolkata', to: 'Park Street, Kolkata', date: 'Today', departureTime: '02:00 PM', totalSeats: 3, seatsLeft: 1, pricePerSeat: 60, distance: '9 km', duration: '25 min', amenities: ['AC'], passengers: [{ name: 'Dev', avatar: 'D' }, { name: 'Pooja', avatar: 'P' }] },
];

// ── Seat Map ──────────────────────────────────────────────────────────────────
const SeatMap = ({ total, left }) => {
  const taken = total - left;
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold border ${i < taken ? 'bg-gray-100 border-gray-200 text-gray-400' : 'bg-blue-600 border-blue-600 text-white'}`}>
          {i < taken ? '✕' : '✓'}
        </div>
      ))}
      <span className="ml-1 text-xs text-gray-500 font-medium">{left} left</span>
    </div>
  );
};

// ── Ride Card ─────────────────────────────────────────────────────────────────
const RideCard = ({ ride, onViewDetails }) => (
  <motion.div variants={cardVariants} layout
    className="bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
    <div className="p-5">
      {/* Route */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex flex-col items-center gap-0.5 mt-1 flex-shrink-0">
          <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #22C55E', backgroundColor: '#fff' }} />
          <div style={{ width: 1.5, height: 28, background: 'repeating-linear-gradient(to bottom,#9CA3AF 0,#9CA3AF 4px,transparent 4px,transparent 8px)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2.5px solid #EF4444', backgroundColor: '#fff' }} />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">From</p>
            <p className="font-semibold text-gray-900 text-sm truncate">{ride.from}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">To</p>
            <p className="font-semibold text-gray-900 text-sm truncate">{ride.to}</p>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xl font-bold text-blue-600">₹{ride.pricePerSeat}</p>
          <p className="text-[10px] text-gray-400">per seat</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {[
          { icon: MdCalendarToday, label: ride.date },
          { icon: MdOutlineAccessTime, label: ride.departureTime },
          { icon: MdOutlineDirectionsCar, label: ride.distance },
        ].map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-md">
            <Icon size={11} className="text-gray-400" />{label}
          </span>
        ))}
      </div>

      {/* Seats */}
      <div className="mb-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Seat Availability</p>
        <SeatMap total={ride.totalSeats} left={ride.seatsLeft} />
      </div>

      {/* Driver + action */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {ride.avatar}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-xs font-semibold text-gray-800">{ride.driver}</p>
              {ride.verified && <MdOutlineVerified size={11} className="text-blue-500" />}
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineStar size={10} className="text-yellow-400" />
              <span className="text-[10px] text-gray-500">{ride.rating}</span>
            </div>
          </div>
          {ride.passengers.length > 0 && (
            <div className="flex items-center ml-1">
              {ride.passengers.slice(0, 3).map((p, i) => (
                <div key={p.name} className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-[9px] font-bold border-2 border-white" style={{ marginLeft: i > 0 ? -6 : 0 }}>
                  {p.avatar}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => onViewDetails(ride)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
          Join Ride →
        </button>
      </div>
    </div>
  </motion.div>
);

// ── Ride Detail Modal ─────────────────────────────────────────────────────────
const RideDetailModal = ({ ride, seats, onSeatsChange, onConfirm, onClose, confirmed }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
    onClick={onClose}>
    <motion.div initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="font-semibold text-gray-900 text-sm">{ride.from}</p>
          <p className="text-xs text-gray-400 mt-0.5">→ {ride.to}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <MdClose size={17} className="text-gray-500" />
        </button>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-base">{ride.avatar}</div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-gray-900 text-sm">{ride.driver}</p>
              {ride.verified && <MdOutlineVerified size={14} className="text-blue-500" />}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MdOutlineStar size={12} className="text-yellow-400" />
              <span className="text-xs text-gray-500">{ride.rating} · {ride.trips} trips</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{ride.vehicle} · {ride.plate}</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 mt-1 flex-shrink-0">
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid #22C55E', backgroundColor: '#fff' }} />
              <div style={{ width: 1, height: 24, backgroundColor: '#D1D5DB' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid #EF4444', backgroundColor: '#fff' }} />
            </div>
            <div className="flex-1 space-y-2.5">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Pickup</p>
                <p className="text-sm font-semibold text-gray-800">{ride.from}</p>
                <p className="text-xs text-blue-600">{ride.date} · {ride.departureTime}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Drop</p>
                <p className="text-sm font-semibold text-gray-800">{ride.to}</p>
                <p className="text-xs text-gray-400">{ride.distance} · ~{ride.duration}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ride.amenities.map(a => (
            <span key={a} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{a}</span>
          ))}
        </div>
        {!confirmed && (
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Seats</p>
            <div className="flex items-center gap-3">
              <button onClick={() => onSeatsChange(Math.max(1, seats - 1))} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 font-bold hover:border-blue-400 transition-colors">−</button>
              <span className="text-xl font-bold text-gray-900 w-6 text-center">{seats}</span>
              <button onClick={() => onSeatsChange(Math.min(ride.seatsLeft, seats + 1))} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 font-bold hover:border-blue-400 transition-colors">+</button>
              <div className="ml-auto text-right">
                <p className="text-lg font-bold text-blue-600">₹{ride.pricePerSeat * seats}</p>
                <p className="text-[10px] text-gray-400">₹{ride.pricePerSeat}/seat</p>
              </div>
            </div>
          </div>
        )}
        {confirmed ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <MdCheck size={22} className="text-white" />
            </div>
            <p className="font-semibold text-green-800">Seat{seats > 1 ? 's' : ''} Booked!</p>
            <p className="text-xs text-green-600 mt-1">{seats} seat{seats > 1 ? 's' : ''} with {ride.driver} · ₹{ride.pricePerSeat * seats}</p>
          </div>
        ) : (
          <button onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            Book {seats} Seat{seats > 1 ? 's' : ''} · ₹{ride.pricePerSeat * seats}
          </button>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// ── Publish Ride Modal ────────────────────────────────────────────────────────
const PublishRideModal = ({ onClose, onPublish }) => {
  const [form, setForm] = useState({ from: '', to: '', date: '', time: '', seats: 2, price: '' });
  const [published, setPublished] = useState(false);
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const valid = form.from.trim() && form.to.trim() && form.date && form.time && form.price;
  const handlePublish = () => {
    if (!valid) return;
    setPublished(true);
    setTimeout(() => { onPublish(form); onClose(); }, 1800);
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-semibold text-gray-900">Offer a Ride</p>
            <p className="text-xs text-gray-400 mt-0.5">Share your journey, split the cost</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <MdClose size={17} className="text-gray-500" />
          </button>
        </div>
        {published ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <MdCheck size={24} className="text-white" />
            </div>
            <p className="font-semibold text-gray-900">Ride Published!</p>
            <p className="text-sm text-gray-500 mt-1">Passengers can now find and join your ride.</p>
          </div>
        ) : (
          <div className="p-5 space-y-3">
            {[{ key: 'from', placeholder: 'From (city / area)', icon: MdOutlineMyLocation }, { key: 'to', placeholder: 'To (city / area)', icon: MdLocationOn }].map(({ key, placeholder, icon: Icon }) => (
              <div key={key} className="relative">
                <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-gray-400" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:ring-2 focus:ring-blue-300 outline-none" />
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)} className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-sm focus:ring-2 focus:ring-blue-300 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500 mb-1.5 font-medium">Seats to offer</p>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                  <button onClick={() => set('seats', Math.max(1, form.seats - 1))} className="text-gray-600 font-bold text-base w-5 text-center">−</button>
                  <span className="flex-1 text-center font-semibold text-gray-900 text-sm">{form.seats}</span>
                  <button onClick={() => set('seats', Math.min(6, form.seats + 1))} className="text-gray-600 font-bold text-base w-5 text-center">+</button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1.5 font-medium">Price / seat (₹)</p>
                <input type="number" placeholder="e.g. 120" value={form.price} onChange={e => set('price', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 text-sm focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-gray-400" />
              </div>
            </div>
            <button onClick={handlePublish} disabled={!valid}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Publish Ride →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const MoveryyGoPage = () => {
  const initials = getInitials();
  const navigate = useNavigate();

  const [step, setStep] = useState('welcome');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [locationOverlay, setLocationOverlay] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [modalSeats, setModalSeats] = useState(1);
  const [confirmedRides, setConfirmedRides] = useState({});
  const [showPublish, setShowPublish] = useState(false);

  const handleContinue = () => {
    if (!pickup.trim() || !drop.trim()) return;
    setSearching(true);
    setTimeout(() => { setResults(MOCK_RIDES); setSearching(false); setStep('results'); }, 1200);
  };

  const handleBack = () => { setStep('welcome'); setResults([]); setSelectedRide(null); };
  const handleViewDetails = (ride) => { setSelectedRide(ride); setModalSeats(1); };
  const handleConfirmBooking = () => setConfirmedRides(prev => ({ ...prev, [selectedRide.id]: true }));

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="min-h-screen bg-[#F3F4F6] font-sans">


      <AnimatePresence mode="wait">

        {/* ── STEP 1: WELCOME ── */}
        {step === 'welcome' && (
          <motion.div key="welcome" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
            className="min-h-[calc(100vh-56px)] bg-white relative overflow-hidden flex flex-col">

            {/* ── Top badge strip ── */}
            <div className="w-full flex items-center justify-center gap-6 py-3 bg-white border-b border-gray-100 relative z-10">
              <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <img
                  src="https://flagcdn.com/w40/in.png"
                  alt="India flag"
                  className="w-6 h-4 object-cover rounded-sm"
                  style={{ display: 'inline-block' }}
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

            {/* ── #MOVERYY watermark — sits in lower half so it doesn't clash with inputs ── */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-4 pointer-events-none select-none z-0 overflow-hidden">
              <span className="text-[10vw] font-black tracking-tighter whitespace-nowrap"
                style={{ color: '#f3f7ff' }}>
                
              </span>
            </div>

            {/* ── Decorative left location pin ── */}
            <div className="absolute left-0 bottom-16 pointer-events-none select-none z-0 opacity-[0.07]">
              <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
                <path d="M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100S120 105 120 60C120 26.863 93.137 0 60 0z" fill="#3B82F6"/>
                <circle cx="60" cy="60" r="24" fill="white"/>
              </svg>
            </div>

            {/* ── Decorative right location pin ── */}
            <div className="absolute right-0 top-16 pointer-events-none select-none z-0 opacity-[0.07]">
              <svg width="80" height="110" viewBox="0 0 120 160" fill="none">
                <path d="M60 0C26.863 0 0 26.863 0 60c0 45 60 100 60 100S120 105 120 60C120 26.863 93.137 0 60 0z" fill="#3B82F6"/>
                <circle cx="60" cy="60" r="24" fill="white"/>
              </svg>
            </div>

            {/* ── City skyline watermark (right side) ── */}
            <div className="absolute right-0 bottom-0 pointer-events-none select-none z-0 opacity-[0.06]">
              <svg width="320" height="200" viewBox="0 0 320 200" fill="none">
                {/* Buildings */}
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
                {/* Windows */}
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
            <div className="flex-1 flex flex-col w-full pt-1 pb-12 relative z-10" style={{ paddingLeft: 15, paddingRight: 15 }}>

              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome to <span className="text-blue-600">Moveryy Go!</span>
              </h1>
              <p className="text-gray-500 text-sm mb-8">Book your hassle-free trip with Moveryy Go</p>

              {/* ── Input fields with dot connector ── */}
              <div className="w-full relative">
                {/* Dotted connector line */}
                <div style={{
                  position: 'absolute', left: '28px', top: '26px',
                  width: '1.5px', height: 'calc(100% - 52px)',
                  background: 'repeating-linear-gradient(to bottom,#9CA3AF 0,#9CA3AF 4px,transparent 4px,transparent 9px)',
                  zIndex: 1,
                }} />

                {/* Pickup row */}
                <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] rounded-md cursor-pointer hover:bg-[#EAECEE] transition-colors"
                  onClick={() => setLocationOverlay('pickup')}>
                  <div style={{ width: 16, height: 16, borderRadius: '70%', border: '4px solid #22C55E', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
                  <span className={`flex-1 text-sm select-none ${pickup ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                    {pickup || 'Where are you...'}
                  </span>
                  {pickup && (
                    <button onClick={e => { e.stopPropagation(); setPickup(''); }}>
                      <MdClose size={14} className="text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Gap with white spacer */}
                <div className="h-7 bg-white" />

                {/* Drop row */}
                <div className="w-full flex items-center gap-4 px-5 py-4 bg-[#F3F4F6] rounded-md cursor-pointer hover:bg-[#EAECEE] transition-colors"
                  onClick={() => setLocationOverlay('drop')}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #EF4444', backgroundColor: '#fff', flexShrink: 0, zIndex: 2 }} />
                  <span className={`flex-1 text-sm select-none ${drop ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                    {drop || 'Where are you moving...'}
                  </span>
                  {drop && (
                    <button onClick={e => { e.stopPropagation(); setDrop(''); }}>
                      <MdClose size={14} className="text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* ── Continue button ── */}
              <button
                onClick={handleContinue}
                disabled={searching || !pickup.trim() || !drop.trim()}
                className="mt-5 w-full bg-[#7B9FE8] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 text-sm tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2">
                {searching
                  ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching…</>
                  : 'CONTINUE'}
              </button>

              {/* ── Shield badge ── */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <MdSecurity size={20} className="text-blue-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Smart ridepooling &amp; sharing</p>
              </div>

              {/* ── Driver section ── */}
              <div className="mt-10 text-center">
                <p className="text-gray-400 text-sm mb-2">Are you a driver?</p>
                <button
                  onClick={() => setShowPublish(true)}
                  className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:underline">
                  <MdOutlineAddCircleOutline size={17} /> Offer a Ride
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: RESULTS ── */}
        {step === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
            className="w-full max-w-5xl mx-auto px-6 md:px-10 py-8 pb-16">

            {/* Route bar */}
            <div className="flex items-center gap-3 mb-8">
              <button onClick={handleBack} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 transition-colors flex-shrink-0">
                <MdArrowBack size={18} />
              </button>
              <div className="flex-1 bg-white rounded-xl border border-gray-200 px-4 py-2.5 flex items-center gap-3">
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid #22C55E', backgroundColor: '#fff' }} />
                  <div style={{ width: 1, height: 12, backgroundColor: '#D1D5DB' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid #EF4444', backgroundColor: '#fff' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{pickup}</p>
                  <p className="text-xs text-gray-400 truncate">{drop}</p>
                </div>
                <button onClick={handleBack} className="text-xs text-blue-600 font-semibold hover:underline flex-shrink-0">Edit</button>
              </div>
              <button onClick={() => setShowPublish(true)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors flex-shrink-0">
                <MdOutlineAddCircleOutline size={15} /> Offer Ride
              </button>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Available Rides</h2>
                <div className="w-10 h-0.5 bg-blue-600 rounded-full mt-1" />
              </div>
              <span className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
                {results.length} ride{results.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <MdOutlineDirectionsCar size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-semibold text-gray-700">No rides found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different route, or offer your own ride.</p>
                <button onClick={() => setShowPublish(true)} className="mt-4 bg-blue-600 text-white font-semibold px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors">
                  Offer a Ride
                </button>
              </div>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map(ride => <RideCard key={ride.id} ride={ride} onViewDetails={handleViewDetails} />)}
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      <AnimatePresence>
        {selectedRide && <RideDetailModal ride={selectedRide} seats={modalSeats} onSeatsChange={setModalSeats} onConfirm={handleConfirmBooking} onClose={() => setSelectedRide(null)} confirmed={!!confirmedRides[selectedRide.id]} />}
      </AnimatePresence>
      <AnimatePresence>
        {showPublish && <PublishRideModal onClose={() => setShowPublish(false)} onPublish={() => setShowPublish(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {locationOverlay && (
          <LocationSearchOverlay type={locationOverlay}
            onSelect={(value) => { if (locationOverlay === 'pickup') setPickup(value); else setDrop(value); setLocationOverlay(null); }}
            onClose={() => setLocationOverlay(null)} />
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default MoveryyGoPage;
