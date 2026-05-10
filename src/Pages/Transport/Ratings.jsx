import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineStar, MdCheck } from 'react-icons/md';
import { cardVariants, containerVariants, pageVariants } from '../../utils/animations';

const RATING_LABELS = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };

const PENDING = [
  { name: 'Priya Sharma', orderId: 'ORD-2046', route: 'Sector 15, Gurugram → DLF Phase 2' },
  { name: 'Rohit Gupta', orderId: 'ORD-2047', route: 'Connaught Place → Karol Bagh, Delhi' },
];

const HISTORY = [
  { orderId: 'ORD-2045', customer: 'Arjun Mehta', date: '15 Jan 2025', rating: 5, route: 'Dwarka → Vasant Kunj', comment: 'Ekdum perfect service! Saman bilkul safe pahuncha diya. Driver bhi bahut polite tha.' },
  { orderId: 'ORD-2044', customer: 'Kavya Singh', date: '12 Jan 2025', rating: 4, route: 'Gurgaon → Noida', comment: 'Good service overall. Driver was on time and handled everything professionally.' },
  { orderId: 'ORD-2043', customer: 'Vikash Kumar', date: '08 Jan 2025', rating: 5, route: 'Lajpat Nagar → Greater Kailash', comment: 'Excellent work! Helped me move my entire 3BHK without any damage. Highly recommend!' },
  { orderId: 'ORD-2042', customer: 'Sneha Joshi', date: '05 Jan 2025', rating: 3, route: 'Rohini → Pitampura', comment: 'Service was okay but took longer than expected.' },
  { orderId: 'ORD-2041', customer: 'Rajesh Agarwal', date: '02 Jan 2025', rating: 5, route: 'CP → Cyber City', comment: 'Outstanding! Made my office relocation so smooth. Very professional and efficient.' },
];

// ── Star Row ──────────────────────────────────────────────────────────────────
const StarRow = ({ value, onChange, disabled, size = 24 }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} type="button"
          disabled={disabled}
          onClick={() => !disabled && onChange(s)}
          onMouseEnter={() => !disabled && setHovered(s)}
          onMouseLeave={() => !disabled && setHovered(0)}
          className={`transition-transform ${!disabled ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
        >
          <MdOutlineStar size={size}
            className={s <= (hovered || value) ? 'text-yellow-400' : 'text-gray-200'}
          />
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span className="ml-1.5 text-xs text-gray-500 font-medium">
          {RATING_LABELS[hovered || value]}
        </span>
      )}
    </div>
  );
};

// ── Pending Rating Card ───────────────────────────────────────────────────────
const PendingCard = ({ item }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!rating) return;
    setSubmitted(true);
  };

  return (
    <motion.div variants={cardVariants}
      className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{item.orderId} · {item.route}</p>
        </div>
        {submitted
          ? <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
            <MdCheck size={12} /> Submitted
          </span>
          : <StarRow value={rating} onChange={setRating} disabled={submitted} />
        }
      </div>

      {!submitted && (
        <>
          <textarea
            value={comment}
            onChange={e => e.target.value.length <= 500 && setComment(e.target.value)}
            placeholder={`Share your experience with ${item.name.split(' ')[0]}… (optional)`}
            rows={3}
            className="w-full text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-gray-400 mt-3"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">{comment.length}/500</span>
            <button onClick={handleSubmit} disabled={!rating}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${rating ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}>
              Submit {rating > 0 && `· ${rating}★`}
            </button>
          </div>
        </>
      )}

      {submitted && (
        <div className="mt-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-2">
          <MdCheck size={16} className="text-green-500 flex-shrink-0" />
          <p className="text-sm text-green-700 font-medium">Rating submitted — thank you!</p>
        </div>
      )}
    </motion.div>
  );
};

// ── History Card ──────────────────────────────────────────────────────────────
const HistoryCard = ({ item }) => (
  <motion.div variants={cardVariants}
    className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-200">
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{item.orderId}</span>
          <span className="text-xs text-gray-400">{item.date}</span>
        </div>
        <p className="font-semibold text-gray-900">{item.customer}</p>
        <p className="text-xs text-gray-400 mt-0.5">{item.route}</p>
      </div>
      <div className="text-right flex-shrink-0 ml-4">
        <StarRow value={item.rating} onChange={() => { }} disabled size={18} />
        <p className="text-xs text-gray-400 mt-1">
          {item.rating >= 4 ? 'Great job 👏' : item.rating >= 3 ? 'Good work 👍' : 'Room to improve'}
        </p>
      </div>
    </div>
    {item.comment && (
      <div className="bg-gray-50 border-l-2 border-blue-200 rounded-r-xl px-4 py-3 mt-2">
        <p className="text-sm text-gray-600 italic">"{item.comment}"</p>
      </div>
    )}
  </motion.div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const TransportRatings = () => {
  const [search, setSearch] = useState('');

  const avgRating = (HISTORY.reduce((s, h) => s + h.rating, 0) / HISTORY.length).toFixed(1);
  const filtered = HISTORY.filter(h =>
    !search || h.date.toLowerCase().includes(search.toLowerCase()) || h.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="show"
      className="p-6 max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Your Rating</h1>
            <div className="w-10 h-0.5 bg-blue-600 rounded-full mt-1" />
            <p className="text-sm text-gray-500 mt-2">Rate your recent customers and view feedback</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end">
              <MdOutlineStar size={22} className="text-yellow-400" />
              <span className="text-3xl font-bold text-gray-900">{avgRating}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{HISTORY.length} reviews</p>
          </div>
        </div>

        {/* Rating distribution */}
        <div className="mt-4 space-y-1.5">
          {[5, 4, 3, 2, 1].map(star => {
            const count = HISTORY.filter(h => h.rating === star).length;
            const pct = Math.round((count / HISTORY.length) * 100);
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 w-4">{star}</span>
                <MdOutlineStar size={12} className="text-yellow-400 flex-shrink-0" />
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending ratings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Rate Recent Customers</h2>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
            {PENDING.length} pending
          </span>
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
          {PENDING.map(p => <PendingCard key={p.orderId} item={p} />)}
        </motion.div>
      </div>

      {/* History */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900">Rating History</h2>
          <input
            type="text"
            placeholder="Search by name or date…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-xs bg-white border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none placeholder:text-gray-400 w-44"
          />
        </div>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <MdOutlineStar size={32} className="text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No results found</p>
            </div>
          ) : (
            filtered.map(h => <HistoryCard key={h.orderId} item={h} />)
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransportRatings;
