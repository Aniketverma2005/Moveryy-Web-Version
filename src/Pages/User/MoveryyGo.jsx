import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineStar, MdLocationOn, MdOutlinePerson, MdOutlineMyLocation,
  MdOutlineDirectionsCar, MdOutlinePhone, MdCheck, MdOutlineAccessTime,
  MdOutlineVerified, MdOutlineEventSeat, MdOutlineGroups,
  MdOutlineAddCircleOutline, MdCalendarToday, MdClose, MdArrowBack,
} from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { cardVariants, containerVariants, pageVariants, fadeSlideUp } from '../../utils/animations';
import logo from '../../assets/logo2.png';

// ── Helpers ───────────────────────────────────────────────────────────────────
const getInitials = () => {
  try {
    const u = JSON.parse(localStorage.getItem('moveryy_user'));
    if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
    if (u?.name) return u.name.charAt(0).toUpperCase();
  } catch { }
  return null;
};

// ── Mock rides ────────────────────────────────────────────────────────────────
const MOCK_RIDES = [
  {
    id: 1, driver: 'Arjun Sharma', avatar: 'A', avatarColor: 'bg-blue-600',
    rating: 4.9, trips: 1240, verified: true,
    vehicle: 'Swift Dzire', plate: 'DL 4C 2341', vehicleColor: 'White',
    from: 'Connaught Place, Delhi', to: 'Sector 62, Noida',
    date: 'Today', departureTime: '10:30 AM',
    totalSeats: 4, seatsLeft: 2, pricePerSeat: 120,
    distance: '28 km', duration: '45 min',
    amenities: ['AC', 'Music', 'No Smoking'],
    passengers: [{ name: 'Riya', avatar: 'R', color: 'bg-green-600' }, { name: 'Karan', avatar: 'K', color: 'bg-blue-600' }],
  },
  {
    id: 2, driver: 'Priya Mehta', avatar: 'P', avatarColor: 'bg-blue-600',
    rating: 4.8, trips: 870, verified: true,
    vehicle: 'Honda City', plate: 'MH 12 AB 9876', vehicleColor: 'Silver',
    from: 'Bandra, Mumbai', to: 'Andheri East, Mumbai',
    date: 'Today', departureTime: '11:00 AM',
    totalSeats: 3, seatsLeft: 3, pricePerSeat: 80,
    distance: '12 km', duration: '30 min',
    amenities: ['AC', 'No Pets'],
    passengers: [],
  },
  {
    id: 3, driver: 'Rahul Verma', avatar: 'R', avatarColor: 'bg-blue-600',
    rating: 4.7, trips: 620, verified: false,
    vehicle: 'Maruti Ertiga', plate: 'KA 05 MN 4512', vehicleColor: 'Grey',
    from: 'Koramangala, Bangalore', to: 'Electronic City, Bangalore',
    date: 'Tomorrow', departureTime: '08:00 AM',
    totalSeats: 6, seatsLeft: 4, pricePerSeat: 95,
    distance: '18 km', duration: '40 min',
    amenities: ['AC', 'Music', 'Luggage Space'],
    passengers: [{ name: 'Amit', avatar: 'A', color: 'bg-green-600' }, { name: 'Sneha', avatar: 'S', color: 'bg-blue-600' }],
  },
  {
    id: 4, driver: 'Sneha Kapoor', avatar: 'S', avatarColor: 'bg-blue-600',
    rating: 4.6, trips: 430, verified: true,
    vehicle: 'Hyundai i20', plate: 'UP 32 GH 7823', vehicleColor: 'Red',
    from: 'Salt Lake, Kolkata', to: 'Park Street, Kolkata',
    date: 'Today', departureTime: '02:00 PM',
    totalSeats: 3, seatsLeft: 1, pricePerSeat: 60,
    distance: '9 km', duration: '25 min',
    amenities: ['AC'],
    passengers: [{ name: 'Dev', avatar: 'D', color: 'bg-green-600' }, { name: 'Pooja', avatar: 'P', color: 'bg-blue-600' }],
  },
];

// ── Seat Map ──────────────────────────────────────────────────────────────────
const SeatMap = ({ total, left }) => {
  const taken = total - left;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black ${i < taken ? 'bg-slate-200 text-slate-400' : 'bg-blue-500 text-white shadow-sm'}`}>
          {i < taken ? '✕' : '✓'}
        </div>
      ))}
      <span className="ml-1.5 text-xs font-bold text-slate-500">{left} left</span>
    </div>
  );
};

// ── Ride Detail Modal ─────────────────────────────────────────────────────────
const RideDetailModal = ({ ride, seats, onSeatsChange, onConfirm, onClose, confirmed }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div initial={{ scale: 0.92, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 24 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-white font-black text-lg">{ride.from}</p>
          <p className="text-blue-200 text-xs mt-0.5">→ {ride.to}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <MdClose size={18} className="text-white" />
        </button>
      </div>
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 ${ride.avatarColor} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md`}>{ride.avatar}</div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-black text-slate-900">{ride.driver}</p>
              {ride.verified && <MdOutlineVerified size={16} className="text-blue-500" />}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <MdOutlineStar size={13} className="text-yellow-500" />
              <span className="text-xs font-bold text-slate-600">{ride.rating}</span>
              <span className="text-slate-300 text-xs">·</span>
              <span className="text-xs text-slate-500">{ride.trips} trips</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{ride.vehicle} · {ride.plate} · {ride.vehicleColor}</p>
          </div>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-0.5 h-8 bg-slate-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Pickup</p>
                <p className="text-sm font-bold text-slate-800">{ride.from}</p>
                <p className="text-xs text-blue-600 font-semibold">{ride.date} · {ride.departureTime}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Drop</p>
                <p className="text-sm font-bold text-slate-800">{ride.to}</p>
                <p className="text-xs text-slate-500">{ride.distance} · ~{ride.duration}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {ride.amenities.map(a => (
            <span key={a} className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">{a}</span>
          ))}
        </div>
        {ride.passengers.length > 0 && (
          <div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Already on board</p>
            <div className="flex items-center gap-2">
              {ride.passengers.map(p => (
                <div key={p.name} className={`w-8 h-8 ${p.color} rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm`} title={p.name}>{p.avatar}</div>
              ))}
              <span className="text-xs text-slate-500 ml-1">{ride.passengers.map(p => p.name).join(', ')}</span>
            </div>
          </div>
        )}
        {!confirmed && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">How many seats?</p>
            <div className="flex items-center gap-3">
              <button onClick={() => onSeatsChange(Math.max(1, seats - 1))} className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-black text-lg hover:border-blue-400 transition-colors shadow-sm">−</button>
              <span className="text-2xl font-black text-slate-900 w-8 text-center">{seats}</span>
              <button onClick={() => onSeatsChange(Math.min(ride.seatsLeft, seats + 1))} className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-black text-lg hover:border-blue-400 transition-colors shadow-sm">+</button>
              <div className="ml-auto text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Total</p>
                <p className="text-xl font-black text-blue-600">₹{ride.pricePerSeat * seats}</p>
                <p className="text-[10px] text-slate-400">₹{ride.pricePerSeat}/seat</p>
              </div>
            </div>
          </div>
        )}
        {confirmed ? (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <MdCheck size={28} className="text-green-500" />
            </div>
            <p className="text-white font-black text-base">Seat{seats > 1 ? 's' : ''} Booked!</p>
            <p className="text-green-100 text-xs mt-1">{seats} seat{seats > 1 ? 's' : ''} with {ride.driver} · ₹{ride.pricePerSeat * seats}</p>
            <p className="text-green-200 text-xs mt-0.5">{ride.date} · {ride.departureTime}</p>
          </div>
        ) : (
          <button onClick={onConfirm} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl text-sm tracking-wide transition-all active:scale-95 shadow-lg shadow-blue-200">
            Book {seats} Seat{seats > 1 ? 's' : ''} · ₹{ride.pricePerSeat * seats}
          </button>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// ── Ride Card ─────────────────────────────────────────────────────────────────
const RideCard = ({ ride, onViewDetails }) => (
  <motion.div variants={cardVariants} layout
    className="bg-white rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 shadow-sm overflow-hidden"
  >
    <div className="p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="flex flex-col items-center gap-1 mt-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="w-0.5 h-10 bg-slate-200" />
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">From</p>
            <p className="font-bold text-slate-900 text-sm truncate">{ride.from}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">To</p>
            <p className="font-bold text-slate-900 text-sm truncate">{ride.to}</p>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-2xl font-black text-blue-600">₹{ride.pricePerSeat}</p>
          <p className="text-[10px] text-slate-400 font-semibold">per seat</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-xl">
          <MdCalendarToday size={12} className="text-blue-500" />{ride.date}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-xl">
          <MdOutlineAccessTime size={12} className="text-blue-500" />{ride.departureTime}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-xl">
          <MdOutlineDirectionsCar size={12} className="text-blue-500" />{ride.distance}
        </span>
      </div>
      <div className="mb-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Seat Availability</p>
        <SeatMap total={ride.totalSeats} left={ride.seatsLeft} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-9 h-9 ${ride.avatarColor} rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm`}>{ride.avatar}</div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-xs font-black text-slate-800">{ride.driver}</p>
              {ride.verified && <MdOutlineVerified size={12} className="text-blue-500" />}
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineStar size={11} className="text-yellow-500" />
              <span className="text-[10px] font-bold text-slate-500">{ride.rating}</span>
            </div>
          </div>
          {ride.passengers.length > 0 && (
            <div className="flex items-center ml-2">
              <span className="text-[10px] text-slate-400 mr-1">+</span>
              {ride.passengers.slice(0, 3).map(p => (
                <div key={p.name} className={`w-6 h-6 ${p.color} rounded-full flex items-center justify-center text-white text-[9px] font-black -ml-1 border border-white shadow-sm`} title={p.name}>{p.avatar}</div>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => onViewDetails(ride)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-all active:scale-95 shadow-sm">
          Join Ride →
        </button>
      </div>
    </div>
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.92, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 24 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white font-black text-lg">Offer a Ride</p>
            <p className="text-blue-200 text-xs mt-0.5">Share your journey, split the cost</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
            <MdClose size={18} className="text-white" />
          </button>
        </div>
        {published ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdCheck size={32} className="text-green-500" />
            </div>
            <p className="font-black text-slate-900 text-lg">Ride Published!</p>
            <p className="text-slate-500 text-sm mt-1">Passengers can now find and join your ride.</p>
          </div>
        ) : (
          <div className="p-6 space-y-3">
            {[
              { key: 'from', placeholder: 'From (Pickup city / area)', icon: MdOutlineMyLocation },
              { key: 'to', placeholder: 'To (Drop city / area)', icon: MdLocationOn },
            ].map(({ key, placeholder, icon: Icon }) => (
              <div key={key} className="relative">
                <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-slate-400" />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-semibold text-sm focus:ring-2 focus:ring-blue-300 outline-none" />
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-semibold text-sm focus:ring-2 focus:ring-blue-300 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Seats to offer</p>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5">
                  <button onClick={() => set('seats', Math.max(1, form.seats - 1))} className="text-slate-600 font-black text-lg w-6 text-center">−</button>
                  <span className="flex-1 text-center font-black text-slate-900">{form.seats}</span>
                  <button onClick={() => set('seats', Math.min(6, form.seats + 1))} className="text-slate-600 font-black text-lg w-6 text-center">+</button>
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 mb-2 uppercase tracking-wider">Price / seat (₹)</p>
                <input type="number" placeholder="e.g. 120" value={form.price} onChange={e => set('price', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-slate-400" />
              </div>
            </div>
            <button onClick={handlePublish} disabled={!valid}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl text-sm tracking-wide transition-all active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
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

  // Step: 'welcome' | 'results'
  const [step, setStep] = useState('welcome');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  const [selectedRide, setSelectedRide] = useState(null);
  const [modalSeats, setModalSeats] = useState(1);
  const [confirmedRides, setConfirmedRides] = useState({});
  const [showPublish, setShowPublish] = useState(false);

  const handleContinue = () => {
    if (!pickup.trim() || !drop.trim()) return;
    setSearching(true);
    setTimeout(() => {
      setResults(MOCK_RIDES);
      setSearching(false);
      setStep('results');
    }, 1200);
  };

  const handleBack = () => {
    setStep('welcome');
    setResults([]);
    setSelectedRide(null);
  };

  const handleViewDetails = (ride) => { setSelectedRide(ride); setModalSeats(1); };
  const handleConfirmBooking = () => setConfirmedRides(prev => ({ ...prev, [selectedRide.id]: true }));

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show" className="min-h-screen bg-[#F0F2F5] font-sans">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-8 md:px-14 h-14 flex items-center justify-between">
          <NavLink to="/"><img src={logo} alt="Moveryy" className="h-9 w-auto object-contain" /></NavLink>
          <NavLink to="/profile">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">
              {initials ?? <MdOutlinePerson size={18} />}
            </div>
          </NavLink>
        </div>
      </header>

      <AnimatePresence mode="wait">

        {/* ══════════════════════════════════════════════════════
            STEP 1 — WELCOME SCREEN  (matches the app screenshot)
        ══════════════════════════════════════════════════════ */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-56px)] bg-white"
          >
            {/* Full-width content — no max-width cap on the input card */}
            <div className="w-full px-8 md:px-16 lg:px-24 pt-12 pb-16">

              {/* Title block */}
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 leading-tight">
                Welcome to Moveryy Go!
              </h1>
              <p className="text-slate-500 text-base md:text-lg mb-10">
                Book your hassle-free trip with Moveryy Go
              </p>

              {/* Full-width input card */}
              <div className="w-full border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-md">

                {/* Pickup row */}
                <div className="flex items-center gap-3 px-5 py-5">
                  <MdOutlineMyLocation size={20} style={{ color: '#f1b80a', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Enter pickup location here"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    className="flex-1 text-slate-800 text-base font-medium outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 mx-6" />

                {/* Drop row */}
                <div className="flex items-center gap-3 px-5 py-5">
                  <MdLocationOn size={20} style={{ color: '#22C55E', flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Enter drop location here"
                    value={drop}
                    onChange={e => setDrop(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleContinue()}
                    className="flex-1 text-slate-800 text-base font-medium outline-none placeholder:text-slate-400 bg-transparent"
                  />
                </div>
              </div>

              {/* Continue button — full width */}
              <button
                onClick={handleContinue}
                disabled={searching || !pickup.trim() || !drop.trim()}
                className="mt-6 w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-base tracking-widest uppercase transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg"
              >
                {searching
                  ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Searching…</>
                  : 'Continue'}
              </button>

              {/* Tagline */}
              <p className="text-center text-slate-400 text-sm italic mt-6">Smart ridepooling &amp; sharing</p>

              {/* Offer a ride */}
              <div className="mt-12 text-center">
                <p className="text-slate-500 text-base mb-2">Are you a driver?</p>
                <button onClick={() => setShowPublish(true)} className="inline-flex items-center gap-2 text-blue-600 font-bold text-base hover:underline">
                  <MdOutlineAddCircleOutline size={20} /> Offer a Ride
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            STEP 2 — RESULTS
        ══════════════════════════════════════════════════════ */}
        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-5xl mx-auto px-6 md:px-14 py-10 pb-20"
          >
            {/* Back + route summary */}
            <div className="flex items-center gap-4 mb-8">
              <button onClick={handleBack} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-blue-400 transition-colors shadow-sm flex-shrink-0">
                <MdArrowBack size={20} />
              </button>
              <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-3 flex items-center gap-3">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="w-0.5 h-4 bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{pickup}</p>
                  <p className="text-xs text-slate-500 truncate">{drop}</p>
                </div>
                <button onClick={handleBack} className="text-xs text-blue-600 font-bold hover:underline flex-shrink-0">Edit</button>
              </div>
              <button onClick={() => setShowPublish(true)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm flex-shrink-0">
                <MdOutlineAddCircleOutline size={16} /> Offer Ride
              </button>
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">Available Rides</h2>
                <div className="w-12 h-1 bg-blue-600 rounded-full mt-1" />
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">
                {results.length} ride{results.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdOutlineDirectionsCar size={32} className="text-slate-400" />
                </div>
                <p className="font-black text-slate-700 text-lg">No rides found</p>
                <p className="text-slate-500 text-sm mt-1">Try a different route, or offer your own ride.</p>
                <button onClick={() => setShowPublish(true)} className="mt-5 bg-blue-600 text-white font-bold px-6 py-2.5 rounded-2xl text-sm hover:bg-blue-700 transition-colors">
                  Offer a Ride
                </button>
              </div>
            ) : (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {results.map(ride => <RideCard key={ride.id} ride={ride} onViewDetails={handleViewDetails} />)}
              </motion.div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { label: 'Active Poolers', value: '20K+', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700' },
                { label: 'Seats Shared', value: '50K+', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700' },
                { label: 'Avg. Rating', value: '4.9★', bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-700' },
                { label: 'Cities Covered', value: '200+', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700' },
              ].map(b => (
                <div key={b.label} className={`${b.bg} ${b.border} border rounded-2xl p-5 text-center shadow-sm`}>
                  <p className={`text-2xl font-black ${b.text}`}>{b.value}</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">{b.label}</p>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="mt-12">
              <h3 className="text-xl font-black text-slate-900 mb-1">How it works</h3>
              <div className="w-12 h-1 bg-blue-600 rounded-full mb-7" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">For Passengers</p>
                  <div className="space-y-3">
                    {[
                      { step: '01', title: 'Enter Your Route', desc: 'Add pickup and drop location.', color: 'bg-blue-600' },
                      { step: '02', title: 'Browse Rides', desc: 'See available cars with seats near you.', color: 'bg-blue-500' },
                      { step: '03', title: 'Join & Pay', desc: 'Pick a ride, choose seats and confirm.', color: 'bg-blue-400' },
                    ].map(s => (
                      <div key={s.step} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex gap-4 items-start">
                        <div className={`${s.color} text-white text-xs font-black w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>{s.step}</div>
                        <div>
                          <p className="font-bold text-slate-900 mb-0.5 text-sm">{s.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-orange-500 uppercase tracking-widest mb-4">For Drivers</p>
                  <div className="space-y-3">
                    {[
                      { step: '01', title: 'Publish Your Ride', desc: 'Share your route, date and available seats.', color: 'bg-orange-500' },
                      { step: '02', title: 'Get Passengers', desc: 'Travellers going your way will join.', color: 'bg-orange-400' },
                      { step: '03', title: 'Share & Save', desc: 'Split fuel costs and travel together.', color: 'bg-yellow-500' },
                    ].map(s => (
                      <div key={s.step} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex gap-4 items-start">
                        <div className={`${s.color} text-white text-xs font-black w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>{s.step}</div>
                        <div>
                          <p className="font-bold text-slate-900 mb-0.5 text-sm">{s.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Why Moveryy Go */}
            <motion.div variants={fadeSlideUp} className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h3 className="text-xl font-black text-slate-900 mb-1">Why Moveryy Go?</h3>
              <div className="w-12 h-1 bg-blue-600 rounded-full mb-7" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { title: 'Real Ride Pooling', desc: 'Multiple passengers share one car — just like BlaBlaCar.' },
                  { title: 'Verified Drivers', desc: 'Every driver is background-checked and rated by the community.' },
                  { title: 'Split the Cost', desc: 'Pay only your share. Cheaper than any cab, every time.' },
                  { title: 'Eco-Friendly', desc: 'Fewer cars on the road means less traffic and lower emissions.' },
                ].map(f => (
                  <div key={f.title} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{f.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Ride Detail Modal ── */}
      <AnimatePresence>
        {selectedRide && (
          <RideDetailModal
            ride={selectedRide}
            seats={modalSeats}
            onSeatsChange={setModalSeats}
            onConfirm={handleConfirmBooking}
            onClose={() => setSelectedRide(null)}
            confirmed={!!confirmedRides[selectedRide.id]}
          />
        )}
      </AnimatePresence>

      {/* ── Publish Ride Modal ── */}
      <AnimatePresence>
        {showPublish && (
          <PublishRideModal onClose={() => setShowPublish(false)} onPublish={() => setShowPublish(false)} />
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default MoveryyGoPage;
