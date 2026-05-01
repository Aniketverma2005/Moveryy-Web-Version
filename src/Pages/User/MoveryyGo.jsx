import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdOutlineStar, MdLocationOn, MdOutlinePerson, MdOutlineMyLocation,
  MdOutlineDirectionsCar, MdOutlinePhone, MdCheck, MdEdit,
  MdOutlineAccessTime, MdOutlineVerified, MdPeople, MdEventSeat,
  MdOutlineInfo, MdArrowForward,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { cardVariants, containerVariants, pageVariants, fadeSlideUp } from '../../utils/animations';
import logo from '../../assets/logo2.png';
import moveryyGoIcon from '../../assets/moveryygo.png';

const getInitials = () => {
  try {
    const u = JSON.parse(localStorage.getItem('moveryy_user'));
    if (u?.firstName) return u.firstName.charAt(0).toUpperCase();
    if (u?.name) return u.name.charAt(0).toUpperCase();
  } catch { }
  return null;
};

// Each ride = a driver going from A to B with N seats, some already taken by co-passengers
const MOCK_RIDES = [
  {
    id: 1, driverName: 'Arjun Sharma', driverAvatar: 'A', driverColor: 'bg-blue-500',
    rating: 4.9, trips: 1240, verified: true,
    vehicle: 'Swift Dzire', plate: 'DL 4C 2341', seats: 4, seatsLeft: 2,
    departure: '08:30 AM', eta: '3 min', distance: '0.8 km',
    pricePerSeat: 120,
    coPassengers: [
      { name: 'Neha', avatar: 'N', color: 'bg-pink-400' },
      { name: 'Karan', avatar: 'K', color: 'bg-green-500' },
    ],
    route: 'Connaught Place → Noida Sector 18',
  },
  {
    id: 2, driverName: 'Priya Mehta', driverAvatar: 'P', driverColor: 'bg-purple-500',
    rating: 4.8, trips: 870, verified: true,
    vehicle: 'Honda City', plate: 'MH 12 AB 9876', seats: 4, seatsLeft: 3,
    departure: '08:45 AM', eta: '5 min', distance: '1.2 km',
    pricePerSeat: 100,
    coPassengers: [
      { name: 'Amit', avatar: 'A', color: 'bg-orange-400' },
    ],
    route: 'Lajpat Nagar → Gurugram Cyber City',
  },
  {
    id: 3, driverName: 'Rahul Verma', driverAvatar: 'R', driverColor: 'bg-green-500',
    rating: 4.7, trips: 620, verified: false,
    vehicle: 'Maruti Ertiga', plate: 'KA 05 MN 4512', seats: 6, seatsLeft: 4,
    departure: '09:00 AM', eta: '7 min', distance: '1.9 km',
    pricePerSeat: 90,
    coPassengers: [
      { name: 'Sonal', avatar: 'S', color: 'bg-cyan-500' },
      { name: 'Dev', avatar: 'D', color: 'bg-red-400' },
    ],
    route: 'Dwarka Sector 10 → Aerocity',
  },
  {
    id: 4, driverName: 'Sneha Kapoor', driverAvatar: 'S', driverColor: 'bg-orange-500',
    rating: 4.6, trips: 430, verified: true,
    vehicle: 'Hyundai i20', plate: 'UP 32 GH 7823', seats: 4, seatsLeft: 1,
    departure: '09:15 AM', eta: '9 min', distance: '2.4 km',
    pricePerSeat: 80,
    coPassengers: [
      { name: 'Raj', avatar: 'R', color: 'bg-blue-400' },
      { name: 'Meera', avatar: 'M', color: 'bg-yellow-500' },
      { name: 'Vivek', avatar: 'V', color: 'bg-indigo-400' },
    ],
    route: 'Rohini West → Karol Bagh',
  },
];

// Seat dots visualiser
const SeatMap = ({ total, taken }) => (
  <div className="flex items-center gap-1 flex-wrap">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        title={i < taken ? 'Taken' : 'Available'}
        className={`w-5 h-5 rounded-md flex items-center justify-center ${
          i < taken ? 'bg-slate-300' : 'bg-blue-500'
        }`}
      >
        <MdEventSeat size={12} className={i < taken ? 'text-slate-500' : 'text-white'} />
      </div>
    ))}
    <span className="text-xs font-bold text-slate-500 ml-1">{total - taken} left</span>
  </div>
);

// Ride card
const RideCard = ({ ride, seats, onSeatsChange, offeredPrice, onPriceChange, onJoin, isJoined }) => {
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceInput, setPriceInput] = useState(String(offeredPrice));
  const takenSeats = ride.seats - ride.seatsLeft;
  const maxCanBook = Math.min(ride.seatsLeft, 4);

  const confirmPrice = () => {
    const v = parseInt(priceInput, 10);
    if (!isNaN(v) && v >= 30) onPriceChange(ride.id, v);
    else setPriceInput(String(offeredPrice));
    setEditingPrice(false);
  };

  const diff = offeredPrice - ride.pricePerSeat;
  const diffLabel = diff === 0 ? null : diff > 0 ? `+₹${diff} above rate` : `₹${Math.abs(diff)} below rate`;
  const diffColor = diff >= 0 ? 'text-green-600' : 'text-red-500';
  const totalFare = offeredPrice * seats;

  return (
    <motion.div
      variants={cardVariants}
      layout
      className={`bg-white rounded-3xl border-2 transition-all duration-300 shadow-sm overflow-hidden ${
        isJoined ? 'border-blue-500 shadow-blue-100 shadow-lg' : 'border-slate-100 hover:border-blue-200 hover:shadow-md'
      }`}
    >
      {isJoined && (
        <div className="bg-blue-600 text-white text-xs font-black text-center py-1.5 tracking-wider">
          ✓ YOU JOINED THIS RIDE
        </div>
      )}

      <div className="p-6">
        {/* Driver row */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 ${ride.driverColor} rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md`}>
            {ride.driverAvatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-black text-slate-900 text-base">{ride.driverName}</p>
              {ride.verified && <MdOutlineVerified size={15} className="text-blue-500" />}
              <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">Driver</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap text-xs text-slate-500">
              <span className="flex items-center gap-1 font-bold text-slate-700">
                <MdOutlineStar size={13} className="text-yellow-500" />{ride.rating}
              </span>
              <span className="text-slate-300">·</span>
              <span>{ride.trips} trips</span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1"><MdOutlineDirectionsCar size={13} />{ride.vehicle} · {ride.plate}</span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-black text-slate-400 uppercase">Per Seat</p>
            <p className="text-xl font-black text-slate-900">₹{ride.pricePerSeat}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 bg-blue-50 rounded-2xl px-4 py-3 mb-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <div className="w-px h-4 bg-blue-300" />
            <div className="w-2 h-2 rounded-full bg-orange-500" />
          </div>
          <p className="text-xs font-semibold text-slate-700 leading-relaxed">{ride.route}</p>
          <div className="ml-auto flex items-center gap-1 text-xs text-blue-600 font-bold flex-shrink-0">
            <MdOutlineAccessTime size={13} />{ride.departure}
          </div>
        </div>

        {/* Seat map */}
        <div className="mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Seat Availability</p>
          <SeatMap total={ride.seats} taken={takenSeats} />
        </div>

        {/* Co-passengers */}
        {ride.coPassengers.length > 0 && (
          <div className="mb-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <MdPeople size={13} /> Co-passengers ({ride.coPassengers.length})
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {ride.coPassengers.map((p, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-full px-3 py-1">
                  <div className={`w-5 h-5 ${p.color} rounded-full flex items-center justify-center text-white text-[9px] font-black`}>
                    {p.avatar}
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{p.name}</span>
                </div>
              ))}
              {isJoined && (
                <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[9px] font-black">
                    You
                  </div>
                  <span className="text-xs font-semibold text-blue-600">You</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Booking controls */}
        <div className="bg-slate-50 rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 mb-4">
          {/* Seats selector */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Seats</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSeatsChange(ride.id, Math.max(1, seats - 1))}
                disabled={seats <= 1 || isJoined}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-black text-slate-700 hover:bg-blue-50 disabled:opacity-40 transition-colors"
              >−</button>
              <span className="text-sm font-black text-slate-900 w-4 text-center">{seats}</span>
              <button
                onClick={() => onSeatsChange(ride.id, Math.min(maxCanBook, seats + 1))}
                disabled={seats >= maxCanBook || isJoined}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-black text-slate-700 hover:bg-blue-50 disabled:opacity-40 transition-colors"
              >+</button>
            </div>
          </div>

          <div className="w-px h-10 bg-slate-200" />

          {/* Offer price */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Offer / Seat</p>
            {editingPrice ? (
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-slate-700">₹</span>
                <input
                  type="number"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  onBlur={confirmPrice}
                  onKeyDown={(e) => e.key === 'Enter' && confirmPrice()}
                  autoFocus
                  className="w-14 text-sm font-black text-slate-900 border-b-2 border-blue-400 outline-none bg-transparent"
                />
              </div>
            ) : (
              <button
                onClick={() => { if (!isJoined) { setPriceInput(String(offeredPrice)); setEditingPrice(true); } }}
                className="flex items-center gap-1 group"
                disabled={isJoined}
              >
                <span className="text-sm font-black text-blue-600">₹{offeredPrice}</span>
                {!isJoined && <MdEdit size={12} className="text-slate-400 group-hover:text-blue-500 transition-colors" />}
              </button>
            )}
            {diffLabel && <p className={`text-[10px] font-semibold mt-0.5 ${diffColor}`}>{diffLabel}</p>}
          </div>

          <div className="w-px h-10 bg-slate-200" />

          {/* Total */}
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Total</p>
            <p className="text-sm font-black text-slate-900">₹{totalFare}</p>
            <p className="text-[10px] text-slate-400">{seats} seat{seats > 1 ? 's' : ''}</p>
          </div>

          {/* ETA */}
          <div className="ml-auto">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">ETA</p>
            <p className="text-sm font-black text-slate-800">{ride.eta}</p>
            <p className="text-[10px] text-slate-400">{ride.distance}</p>
          </div>
        </div>

        {/* Join button */}
        <button
          onClick={() => onJoin(ride.id)}
          disabled={ride.seatsLeft === 0}
          className={`w-full py-3 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 ${
            isJoined
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : ride.seatsLeft === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200'
          }`}
        >
          {isJoined ? (
            <><MdCheck size={16} /> Joined — ₹{totalFare} for {seats} seat{seats > 1 ? 's' : ''}</>
          ) : ride.seatsLeft === 0 ? (
            'Ride Full'
          ) : (
            <>Join This Ride <MdArrowForward size={16} /></>
          )}
        </button>
      </div>
    </motion.div>
  );
};
