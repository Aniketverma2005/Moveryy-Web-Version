import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MdOutlineStar, MdLocationOn, MdOutlinePerson, MdOutlineMyLocation,
    MdOutlineDirectionsCar, MdOutlinePhone, MdCheck, MdEdit,
    MdOutlineAccessTime, MdOutlineVerified, MdTwoWheeler,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { cardVariants, containerVariants, pageVariants } from '../../utils/animations';
import logo from '../../assets/logo2.png';
import ridesIcon from '../../assets/rides.png';
import moveryyGoIcon from '../../assets/moveryygo.png';

const getInitials = () => {
    try {
        const u = JSON.parse(localStorage.getItem('moveryy_user'));
        if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
        if (u?.name) return u.name.charAt(0).toUpperCase();
    } catch { }
    return null;
};

const RIDE_TYPES = [
    { id: 'cab', label: 'Cab', icon: 'car', desc: 'Comfortable AC cab', multiplier: 1.0 },
    { id: 'bike', label: 'Bike', icon: 'bike', desc: 'Quick bike ride', multiplier: 0.5 },
    { id: 'auto', label: 'Auto', icon: 'auto', desc: 'Affordable auto rickshaw', multiplier: 0.7 },
];

const MOCK_DRIVERS = [
    { id: 1, name: 'Arjun Sharma', avatar: 'A', color: 'bg-blue-500', rating: 4.9, trips: 1240, verified: true, vehicle: 'Swift Dzire', plate: 'DL 4C 2341', eta: '3 min', distance: '0.8 km', basePrice: { cab: 220, bike: 110, auto: 150 } },
    { id: 2, name: 'Priya Mehta', avatar: 'P', color: 'bg-purple-500', rating: 4.8, trips: 870, verified: true, vehicle: 'Honda Activa', plate: 'MH 12 AB 987', eta: '5 min', distance: '1.2 km', basePrice: { cab: 200, bike: 100, auto: 140 } },
    { id: 3, name: 'Rahul Verma', avatar: 'R', color: 'bg-green-500', rating: 4.7, trips: 620, verified: false, vehicle: 'Bajaj Auto', plate: 'KA 05 MN 451', eta: '7 min', distance: '1.9 km', basePrice: { cab: 180, bike: 90, auto: 130 } },
    { id: 4, name: 'Sneha Kapoor', avatar: 'S', color: 'bg-orange-500', rating: 4.6, trips: 430, verified: true, vehicle: 'Hyundai i20', plate: 'UP 32 GH 782', eta: '9 min', distance: '2.4 km', basePrice: { cab: 160, bike: 80, auto: 120 } },
];

const DriverCard = ({ driver, rideType, offeredPrice, onPriceChange, onSelect, isSelected }) => {
    const [editing, setEditing] = useState(false);
    const [inputVal, setInputVal] = useState(String(offeredPrice));

    const handleConfirm = () => {
        const parsed = parseInt(inputVal, 10);
        if (!isNaN(parsed) && parsed >= 30) onPriceChange(driver.id, parsed);
        else setInputVal(String(offeredPrice));
        setEditing(false);
    };

    const base = driver.basePrice[rideType];
    const diff = offeredPrice - base;
    const diffLabel = diff === 0 ? null : diff > 0 ? `+₹${diff} above estimate` : `₹${Math.abs(diff)} below estimate`;
    const diffColor = diff >= 0 ? 'text-green-600' : 'text-red-500';

    return (
        <motion.div variants={cardVariants} layout
            className={`relative bg-white rounded-3xl border-2 transition-all duration-300 shadow-sm overflow-hidden ${isSelected ? 'border-blue-500 shadow-blue-100 shadow-lg' : 'border-slate-100 hover:border-blue-200 hover:shadow-md'
                }`}
        >
            {isSelected && (
                <div className="absolute top-4 right-4 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                    <MdCheck size={16} className="text-white" />
                </div>
            )}
            <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 ${driver.color} rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md`}>
                        {driver.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-black text-slate-900 text-base">{driver.name}</p>
                            {driver.verified && <MdOutlineVerified size={16} className="text-blue-500 flex-shrink-0" />}
                        </div>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className="flex items-center gap-1 text-xs font-bold text-slate-600">
                                <MdOutlineStar size={14} className="text-yellow-500" />{driver.rating}
                            </span>
                            <span className="text-slate-300 text-xs">·</span>
                            <span className="text-xs text-slate-500">{driver.trips} trips</span>
                            <span className="text-slate-300 text-xs">·</span>
                            <span className="text-xs text-slate-500">{driver.distance}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1.5">
                            <MdOutlineDirectionsCar size={14} className="text-slate-400" />
                            <p className="text-xs text-slate-500 truncate">{driver.vehicle} · {driver.plate}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 bg-slate-50 rounded-2xl px-4 py-4">
                    <div className="flex items-center gap-2">
                        <MdOutlineAccessTime size={16} className="text-blue-500" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">ETA</p>
                            <p className="text-sm font-black text-slate-800">{driver.eta}</p>
                        </div>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Estimate</p>
                        <p className="text-sm font-black text-slate-800">₹{base}</p>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Your Offer</p>
                        {editing ? (
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-black text-slate-700">₹</span>
                                <input type="number" value={inputVal}
                                    onChange={e => setInputVal(e.target.value)}
                                    onBlur={handleConfirm}
                                    onKeyDown={e => e.key === 'Enter' && handleConfirm()}
                                    autoFocus
                                    className="w-14 text-sm font-black text-slate-900 border-b-2 border-blue-400 outline-none bg-transparent"
                                />
                            </div>
                        ) : (
                            <button onClick={() => { setInputVal(String(offeredPrice)); setEditing(true); }} className="flex items-center gap-1.5 group">
                                <span className="text-sm font-black text-blue-600">₹{offeredPrice}</span>
                                <MdEdit size={13} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                            </button>
                        )}
                        {diffLabel && <p className={`text-[10px] font-semibold mt-0.5 ${diffColor}`}>{diffLabel}</p>}
                    </div>
                </div>

                <button onClick={() => onSelect(driver.id)}
                    className={`mt-4 w-full py-3 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-95 ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200'
                        }`}
                >
                    {isSelected ? '✓ Driver Selected' : 'Select This Driver'}
                </button>
            </div>
        </motion.div>
    );
};

const RidesPage = () => {
    const initials = getInitials();
    const [pickup, setPickup] = useState('');
    const [drop, setDrop] = useState('');
    const [rideType, setRideType] = useState('cab');
    const [searched, setSearched] = useState(false);
    const [searching, setSearching] = useState(false);
    const [offeredPrices, setOfferedPrices] = useState({});
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [booked, setBooked] = useState(false);

    const handleSearch = () => {
        if (!pickup.trim() || !drop.trim()) return;
        setSearching(true); setSearched(false); setSelectedDriver(null); setBooked(false);
        const prices = {};
        MOCK_DRIVERS.forEach(d => { prices[d.id] = d.basePrice[rideType]; });
        setOfferedPrices(prices);
        setTimeout(() => { setSearching(false); setSearched(true); }, 1400);
    };

    const handlePriceChange = (id, price) => setOfferedPrices(prev => ({ ...prev, [id]: price }));
    const handleSelect = (id) => setSelectedDriver(prev => prev === id ? null : id);
    const selectedData = MOCK_DRIVERS.find(d => d.id === selectedDriver);

    return (
        <motion.div variants={pageVariants} initial="hidden" animate="show" className="bg-[#F8FAFC] min-h-screen font-sans">

            {/* Navbar */}
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

            {/* Blue Hero */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-500 rounded-full opacity-10" />
                    <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-blue-400 rounded-full opacity-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-5" />
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-14 pt-12 pb-28">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
                        <div className="flex flex-col gap-4 max-w-xl">
                            <div className="w-16 h-16">

                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                                Moveryy Rides<br /><span className="text-yellow-400">Cab, Bike & Auto</span>
                            </h1>
                            <span className="inline-flex items-center gap-2 bg-blue-500/60 border border-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit shadow-md backdrop-blur-sm">
                                <MdOutlineStar className="text-yellow-400" size={16} />
                                Safe, Fast & Affordable Rides
                            </span>
                            <p className="text-base md:text-lg text-blue-100 leading-relaxed mt-1">
                                Book a cab, bike or auto in seconds. Negotiate your fare and ride with verified drivers.
                            </p>
                        </div>
                        <div className="hidden lg:flex flex-shrink-0">
                            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl space-y-6 min-w-[240px]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-md">
                                        <MdOutlineStar size={24} className="text-white" />
                                    </div>
                                    <div><p className="text-xl font-bold text-white">4.9★</p><p className="text-xs text-blue-200">Avg. Driver Rating</p></div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center shadow-md">
                                        <MdOutlineDirectionsCar size={24} className="text-white" />
                                    </div>
                                    <div><p className="text-xl font-bold text-white">15K+</p><p className="text-xs text-blue-200">Active Drivers</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8FAFC" />
                    </svg>
                </div>
            </div>

            {/* Main */}
            <div className="max-w-5xl mx-auto px-6 md:px-14 pb-20">

                {/* Ride type selector */}
                <div className="flex gap-3 mt-10 mb-0">
                    {RIDE_TYPES.map(rt => (
                        <button key={rt.id} onClick={() => { setRideType(rt.id); setSearched(false); setSelectedDriver(null); setBooked(false); }}
                            className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-2xl border-2 font-bold text-sm transition-all ${rideType === rt.id ? 'border-blue-1000 bg-blue-20 text-blue-800 shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
                                }`}
                        >
                            {rt.id === 'cab' && <div className="w-7 h-7"><img src={ridesIcon} alt="Rides" className="w-full h-full object-contain drop-shadow-xl" /></div>}
                            {rt.id === 'bike' && <MdTwoWheeler size={24} className="text-green-700" />}
                            {rt.id === 'auto' && <div className="w-7 h-7"><img src={moveryyGoIcon} alt="Moveryy Go" className="w-full h-full object-contain drop-shadow-xl" /></div>}
                            <span>{rt.label}</span>
                            <span className="text-[10px] font-normal text-slate-400">{rt.desc}</span>
                        </button>
                    ))}
                </div>

                {/* Search card */}
                <motion.div variants={cardVariants}
                    className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl px-8 py-10 shadow-xl relative overflow-hidden mt-10"
                >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16" />
                    <h2 className="text-xl font-black text-white mb-6 relative z-10 tracking-wide">Where are you going?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                        <div className="relative">
                            <MdOutlineMyLocation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Pickup Location" value={pickup} onChange={e => setPickup(e.target.value)}
                                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-800 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md placeholder:text-slate-400 outline-none" />
                        </div>
                        <div className="relative">
                            <MdLocationOn size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Drop Location" value={drop} onChange={e => setDrop(e.target.value)}
                                className="w-full pl-10 pr-5 py-4 bg-white rounded-2xl text-slate-800 font-semibold text-sm focus:ring-4 focus:ring-yellow-300 shadow-md placeholder:text-slate-400 outline-none" />
                        </div>
                    </div>
                    <button onClick={handleSearch} disabled={searching || !pickup.trim() || !drop.trim()}
                        className="mt-6 relative z-10 bg-white text-orange-500 font-black px-9 py-3 rounded-2xl shadow-lg hover:bg-orange-50 active:scale-95 transition-all text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {searching ? (<><span className="w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />Searching…</>) : 'Search Drivers →'}
                    </button>
                </motion.div>

                {/* Results */}
                <AnimatePresence>
                    {searched && (
                        <motion.div key="results" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="mt-10">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">Available Drivers</h3>
                                    <div className="w-12 h-1 bg-yellow-400 rounded-full mt-1" />
                                </div>
                                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                                    {MOCK_DRIVERS.length} nearby · {RIDE_TYPES.find(r => r.id === rideType)?.label}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-6 mt-2">
                                Tap <span className="font-bold text-blue-600">✏ edit</span> on the offer price to negotiate your fare.
                            </p>
                            <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {MOCK_DRIVERS.map(driver => (
                                    <DriverCard key={driver.id} driver={driver} rideType={rideType}
                                        offeredPrice={offeredPrices[driver.id] ?? driver.basePrice[rideType]}
                                        onPriceChange={handlePriceChange} onSelect={handleSelect}
                                        isSelected={selectedDriver === driver.id}
                                    />
                                ))}
                            </motion.div>

                            {/* Confirm bar */}
                            <AnimatePresence>
                                {selectedDriver && !booked && (
                                    <motion.div key="bar" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                                        className="mt-8 bg-slate-900 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xl"
                                    >
                                        <div>
                                            <p className="text-white font-black text-base">{selectedData?.name}<span className="text-yellow-400 ml-2">· ₹{offeredPrices[selectedDriver]}</span></p>
                                            <p className="text-slate-400 text-xs mt-0.5">{selectedData?.vehicle} · {selectedData?.plate}</p>
                                            <p className="text-slate-400 text-xs">{selectedData?.eta} · {selectedData?.distance}</p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <a href="tel:+919999999999" className="flex items-center gap-2 bg-white/10 text-white px-4 py-2.5 rounded-2xl text-sm font-bold hover:bg-white/20 transition-colors">
                                                <MdOutlinePhone size={16} />Call
                                            </a>
                                            <button onClick={() => setBooked(true)}
                                                className="bg-yellow-400 text-slate-900 px-7 py-2.5 rounded-2xl font-black text-sm hover:bg-yellow-300 active:scale-95 transition-all shadow-lg">
                                                Confirm Ride
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Booked */}
                            <AnimatePresence>
                                {booked && (
                                    <motion.div key="booked" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-center shadow-2xl"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <MdCheck size={36} className="text-green-500" />
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-1">Ride Confirmed!</h3>
                                        <p className="text-green-100 text-sm mb-1">{selectedData?.name} is on the way</p>
                                        <p className="text-white font-bold text-lg">₹{offeredPrices[selectedDriver]} · {selectedData?.eta}</p>
                                        <p className="text-green-200 text-xs mt-2">{selectedData?.vehicle} · {selectedData?.plate}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Trust badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {[
                        { label: 'Active Drivers', value: '15K+', bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700' },
                        { label: 'Rides Completed', value: '500K+', bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700' },
                        { label: 'Avg. Rating', value: '4.9★', bg: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-yellow-700' },
                        { label: 'Cities Covered', value: '100+', bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-700' },
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
                    <div className="w-12 h-1 bg-yellow-400 rounded-full mb-7" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {[
                            { step: '01', title: 'Choose Ride Type', desc: 'Pick Cab, Bike or Auto.', color: 'bg-blue-600' },
                            { step: '02', title: 'Enter Route', desc: 'Add pickup and drop location.', color: 'bg-yellow-500' },
                            { step: '03', title: 'Negotiate Fare', desc: 'Edit the offer price to match your budget.', color: 'bg-orange-500' },
                            { step: '04', title: 'Confirm & Ride', desc: 'Select your driver and confirm.', color: 'bg-green-500' },
                        ].map(s => (
                            <div key={s.step} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex gap-4 items-start">
                                <div className={`${s.color} text-white text-xs font-black w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>{s.step}</div>
                                <div>
                                    <p className="font-bold text-slate-900 mb-1 text-sm">{s.title}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Moveryy Rides */}
                <div className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                    <h3 className="text-xl font-black text-slate-900 mb-1">Why Moveryy Rides?</h3>
                    <div className="w-12 h-1 bg-yellow-400 rounded-full mb-7" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            { title: 'Negotiate Your Fare', desc: 'Set your own price — drivers accept or counter.' },
                            { title: 'Verified Drivers Only', desc: 'Every driver is background-checked and verified.' },
                            { title: 'Cab, Bike & Auto', desc: 'Three ride types to suit every need and budget.' },
                            { title: '24/7 Availability', desc: 'Rides available round the clock, every day.' },
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

export default RidesPage;
