import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdClose, MdArrowForward, MdCheckCircle,
  MdChevronLeft, MdChevronRight,
} from 'react-icons/md';

// ── Data ──────────────────────────────────────────────────────────────────────
const WHY_WORK = [
  {
    icon: (
      // Pocket with coin — compensation
      <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Coin circle */}
        <circle cx="32" cy="10" r="7" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2"/>
        <text x="32" y="14" textAnchor="middle" fontSize="8" fill="#2563EB" stroke="none" fontWeight="bold">₹</text>
        {/* Pocket body */}
        <path d="M8 18h26v16a4 4 0 01-4 4H12a4 4 0 01-4-4V18z" fill="#EFF6FF"/>
        <path d="M8 18h26v16a4 4 0 01-4 4H12a4 4 0 01-4-4V18z"/>
        {/* Pocket stitching top */}
        <path d="M8 18h26" strokeDasharray="2 2"/>
        {/* Pocket inner fold */}
        <path d="M14 18v8a4 4 0 004 4h6a4 4 0 004-4v-8"/>
      </svg>
    ),
    title: 'Great Compensation',
    text: 'We reward great work with competitive salaries, bonuses, and equity.',
  },
  {
    icon: (
      // Clock with checkmark — flexible
      <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="22" cy="24" r="14" fill="#EFF6FF"/>
        <path d="M22 16v8l4 3"/>
        {/* Small check badge */}
        <circle cx="34" cy="14" r="7" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2"/>
        <path d="M31 14l2 2 4-3" strokeWidth="2"/>
      </svg>
    ),
    title: 'Flexible & Remote',
    text: 'Flexible hours and work-from-home options. Night owls welcome.',
  },
  {
    icon: (
      // People/team
      <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="16" r="5" fill="#DBEAFE"/>
        <circle cx="30" cy="16" r="5" fill="#DBEAFE"/>
        <circle cx="24" cy="28" r="5" fill="#EFF6FF"/>
        <path d="M8 38c0-5 4-8 10-8M40 38c0-5-4-8-10-8M18 33c1-2 3-3 6-3s5 1 6 3"/>
      </svg>
    ),
    title: 'Diverse Team',
    text: 'Work with talented people from across India and the world.',
  },
  {
    icon: (
      // Graduation cap — learning
      <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="24,10 44,20 24,30 4,20" fill="#DBEAFE"/>
        <path d="M12 24v10c0 4 5 7 12 7s12-3 12-7V24"/>
        <line x1="44" y1="20" x2="44" y2="30"/>
      </svg>
    ),
    title: 'Learning Budget',
    text: '₹30,000/year for courses, books, certifications and conferences.',
  },
  {
    icon: (
      // Shield with heart — health
      <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6L8 12v10c0 9 7 17 16 20 9-3 16-11 16-20V12L24 6z" fill="#EFF6FF"/>
        <path d="M18 22c0-2 1.5-3.5 3-3.5S24 20 24 20s1.5-2.5 3-2.5 3 1.5 3 3.5c0 3-6 7-6 7s-6-4-6-7z" fill="#DBEAFE" stroke="#2563EB"/>
      </svg>
    ),
    title: 'Health Insurance',
    text: 'Comprehensive medical, dental and vision coverage for you and family.',
  },
  {
    icon: (
      // Rocket / growth
      <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6c6 0 14 6 14 18 0 4-1 7-3 10l-4-4a10 10 0 002-6c0-8-5-13-9-14-4 1-9 6-9 14a10 10 0 002 6l-4 4c-2-3-3-6-3-10C10 12 18 6 24 6z" fill="#EFF6FF"/>
        <circle cx="24" cy="22" r="3" fill="#DBEAFE"/>
        <path d="M18 38l2-6h8l2 6"/>
        <path d="M14 34c-2 2-3 5-2 7l5-2M34 34c2 2 3 5 2 7l-5-2"/>
      </svg>
    ),
    title: 'Fast Growth',
    text: 'High ownership, rapid promotions, and real impact from day one.',
  },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Senior Engineer', initials: 'PS', color: 'bg-blue-100 text-blue-700', quote: "Moveryy has been a second home for me. The culture here is unlike anything I've experienced — collaborative, fast-paced, and incredibly rewarding. Every day I learn something new." },
  { name: 'Rahul Mehta', role: 'Operations Lead', initials: 'RM', color: 'bg-indigo-100 text-indigo-700', quote: "Joining Moveryy was the best career decision I made. The team is driven, the mission is real, and the growth opportunities are exceptional. Proud to be a part of this journey." },
  { name: 'Sneha Kapoor', role: 'Product Designer', initials: 'SK', color: 'bg-purple-100 text-purple-700', quote: "The design culture at Moveryy is amazing. You have real ownership over your work and a team that truly respects design as a core business function. Love coming to work every day." },
  { name: 'Arjun Verma', role: 'Growth Manager', initials: 'AV', color: 'bg-cyan-100 text-cyan-700', quote: "Fast growth, smart colleagues, and a product that genuinely helps people. The compensation and flexibility here are top-notch for an early-stage company." },
  { name: 'Divya Nair', role: 'Customer Success', initials: 'DN', color: 'bg-sky-100 text-sky-700', quote: "The leadership here is transparent and supportive. I have grown more in 1 year at Moveryy than in 3 years at my previous company. The sky is the limit here." },
];

const DEPARTMENTS = ['All', 'Engineering', 'Operations', 'Marketing', 'Design', 'Sales', 'Support'];

const JOBS = [
  { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'Noida, India', type: 'Full-time', experience: '3–5 yrs', posted: '2 days ago', description: 'Build and scale our customer-facing web platform using React, Redux, and modern tooling.', responsibilities: ['Design and implement new user-facing features', 'Optimize components for performance', 'Collaborate with designers and backend engineers', 'Mentor junior developers'], requirements: ['3+ years of React experience', 'Strong Redux knowledge', 'Experience with REST APIs', 'Good communication skills'] },
  { id: 2, title: 'Node.js Backend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', experience: '2–4 yrs', posted: '5 days ago', description: 'Design and maintain our microservices backend that powers millions of moves every month.', responsibilities: ['Build RESTful APIs', 'Optimize database queries', 'Ensure high availability', 'Write unit tests'], requirements: ['2+ years with Node.js', 'Familiarity with Docker', 'Cloud experience (AWS/GCP)', 'Problem-solving mindset'] },
  { id: 3, title: 'City Operations Manager', department: 'Operations', location: 'Delhi, India', type: 'Full-time', experience: '4–6 yrs', posted: '1 week ago', description: 'Oversee day-to-day logistics operations across Delhi-NCR, ensuring seamless service delivery.', responsibilities: ['Manage 200+ partner vehicles', 'Coordinate with warehouses', 'Resolve escalations', 'Drive weekly ops reviews'], requirements: ['4+ years in logistics', 'Strong analytical skills', 'Proficiency in Excel', "Bachelor's degree"] },
  { id: 4, title: 'Product Designer (UI/UX)', department: 'Design', location: 'Noida, India', type: 'Full-time', experience: '2–4 yrs', posted: '3 days ago', description: "Shape the visual identity and user experience of Moveryy's apps and web platform.", responsibilities: ['Create wireframes and prototypes', 'Conduct user research', 'Maintain design system', 'Collaborate with engineers'], requirements: ['2+ years of design experience', 'Proficiency in Figma', 'Strong portfolio', 'Understanding of accessibility'] },
  { id: 5, title: 'Growth Marketing Manager', department: 'Marketing', location: 'Remote', type: 'Full-time', experience: '3–5 yrs', posted: '1 week ago', description: 'Drive user acquisition and retention campaigns across digital channels for Moveryy.', responsibilities: ['Plan growth campaigns', 'Analyze funnel metrics', 'Manage partnerships', 'Report on KPIs'], requirements: ['3+ years in growth marketing', 'Google & Meta Ads experience', 'Data-driven mindset', 'Strong communication'] },
  { id: 6, title: 'Customer Support Lead', department: 'Support', location: 'Gurugram, India', type: 'Full-time', experience: '2–3 yrs', posted: '4 days ago', description: 'Lead a team of support agents to deliver exceptional customer experiences.', responsibilities: ['Coach support agents', 'Track CSAT and resolution time', 'Develop SOPs', 'Reduce ticket volume'], requirements: ['2+ years in support leadership', 'Experience with Freshdesk/Zendesk', 'Empathy-first mindset', 'Fluent Hindi & English'] },
  { id: 7, title: 'B2B Sales Executive', department: 'Sales', location: 'Mumbai, India', type: 'Full-time', experience: '1–3 yrs', posted: '6 days ago', description: "Acquire and manage corporate clients for Moveryy's business relocation services.", responsibilities: ['Identify and prospect B2B leads', 'Present Moveryy solutions', 'Negotiate and close deals', 'Maintain CRM pipeline'], requirements: ['1+ years B2B sales experience', 'Strong negotiation skills', 'Self-motivated', 'Logistics/SaaS experience is a plus'] },
];

// ── Apply Modal ───────────────────────────────────────────────────────────────
const ApplyModal = ({ job, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', resume: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const valid = form.name.trim() && form.email.trim() && form.phone.trim();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-gray-900">{job.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{job.department} · {job.location}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <MdClose size={18} className="text-gray-500" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdCheckCircle size={36} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-500 text-sm">
              Thanks <span className="font-semibold text-gray-700">{form.name}</span>! We will review your application and reach out within 5–7 business days.
            </p>
            <button onClick={onClose}
              className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (valid) setSubmitted(true); }} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Full Name *</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Phone *</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone', e.target.value)} required
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Email *</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Resume / Portfolio Link</label>
              <input type="url" placeholder="https://drive.google.com/..." value={form.resume} onChange={e => set('resume', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Why Moveryy?</label>
              <textarea rows={3} placeholder="Tell us about yourself..." value={form.message} onChange={e => set('message', e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 resize-none" />
            </div>
            <button type="submit" disabled={!valid}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              Submit Application <MdArrowForward size={16} />
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const CareersPage = () => {
  const [applyJob, setApplyJob]     = useState(null);
  const [testiIdx, setTestiIdx]     = useState(0);

  const testiPairs = [];
  for (let i = 0; i < TESTIMONIALS.length; i += 2) testiPairs.push(TESTIMONIALS.slice(i, i + 2));

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── SECTION 1: Hero ── */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 px-6 md:px-20 min-h-[420px] flex items-center">

        {/* Blue blob shape — top right (like the reference) */}
        <div className="absolute right-0 top-0 w-[500px] h-[460px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #EFF6FF 60%, transparent 100%)',
            borderRadius: '0 0 0 60%',
          }} />
        {/* Second smaller blob */}
        <div className="absolute right-16 top-8 w-72 h-72 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] bg-blue-50 pointer-events-none" />
        {/* Blue pill accent — matches yellow pill in reference */}
        <div className="absolute right-48 bottom-12 w-8 h-20 bg-blue-600 rounded-full pointer-events-none opacity-70" />

        {/* Left content */}
        <div className="relative z-10 max-w-lg">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block border border-gray-300 text-gray-500 text-[11px] font-semibold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
            We're Hiring
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5 whitespace-nowrap">
            Be a part of our team.
          </motion.h1>

          {/* Thin divider line — matches the reference */}
          <div className="w-40 h-px bg-gray-200 mb-5" />

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
            We are so glad you want to join us in exploring a world of endless{' '}
            <span className="text-blue-600">opportunities</span> at Moveryy. Let's find a spot for you.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <a href="#open-roles">
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors shadow-md shadow-blue-200">
                View Jobs <MdArrowForward size={16} />
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: Why work with us ── */}
      <section className="py-20 bg-white" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <div className="w-full">
          <h2 className="text-4xl font-bold text-gray-900 mb-1">Why work with us</h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_WORK.map((w, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg rounded-2xl p-7 transition-all duration-300 cursor-default">
                {/* Icon box — small white square, top left */}
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {w.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Employee Testimonials ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#ECEEF2' }}>

        {/* Dot grid — top left (large, dense, gray) */}
        <div className="absolute left-0 top-0 pointer-events-none select-none"
          style={{
            width: 220, height: 220,
            backgroundImage: 'radial-gradient(circle, #9CA3AF 1.2px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            opacity: 0.5,
          }} />

        {/* Dot grid — bottom right (large, dense, blue) */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none"
          style={{
            width: 220, height: 220,
            backgroundImage: 'radial-gradient(circle, #3B82F6 1.2px, transparent 1.2px)',
            backgroundSize: '14px 14px',
            opacity: 0.25,
          }} />

        {/* Large white rounded rectangle — right side curving inward */}
        <div className="absolute right-0 top-8 bottom-8 pointer-events-none"
          style={{
            width: '45%',
            background: 'white',
            borderRadius: '60% 0 0 60%',
            opacity: 0.55,
          }} />

        <div className="relative z-10 w-full" style={{ paddingLeft: 30, paddingRight: 30 }}>

          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">What our employees say</h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
          </div>

          {/* Carousel */}
          <div className="flex items-center gap-4">

            {/* Prev button */}
            <button
              onClick={() => setTestiIdx(v => Math.max(0, v - 1))}
              disabled={testiIdx === 0}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors disabled:opacity-30">
              <MdChevronLeft size={22} />
            </button>

            {/* Cards */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={testiIdx}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {testiPairs[testiIdx]?.map((t, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[180px]">
                      {/* Top — avatar + quote side by side */}
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-xl ${t.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                          {t.initials}
                        </div>
                        {/* Name + role + quote */}
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-sm leading-tight">{t.name}</p>
                          <p className="text-xs text-gray-400 mb-3">{t.role}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">"{t.quote}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              onClick={() => setTestiIdx(v => Math.min(testiPairs.length - 1, v + 1))}
              disabled={testiIdx === testiPairs.length - 1}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 transition-colors disabled:opacity-30">
              <MdChevronRight size={22} />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testiPairs.map((_, i) => (
              <button key={i} onClick={() => setTestiIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === testiIdx ? 'w-6 h-2.5 bg-blue-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`} />
            ))}
          </div>

        </div>
      </section>


      {/* ── Footer ── */}
      <footer className="bg-[#1A1A2E] text-white">

        {/* Top white spacer strip with dot decoration */}
        <div className="relative bg-white py-10 overflow-hidden">
          <div className="absolute right-8 top-4 pointer-events-none select-none"
            style={{ width: 160, height: 100, backgroundImage: 'radial-gradient(circle, #3B82F6 1.2px, transparent 1.2px)', backgroundSize: '12px 12px', opacity: 0.2 }} />
          <div className="flex justify-center">
            <div className="w-10 h-1 bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Main footer dark section */}
        <div className="w-full py-12" style={{ paddingLeft: 30, paddingRight: 30 }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">

            {/* Col 1 — Customer app */}
            <div>
              <p className="font-semibold text-gray-300 text-sm mb-5">Customer app</p>
              <div className="space-y-3">
                {/* Google Play */}
                <a href="#" className="flex items-center gap-2 bg-black border border-gray-700 hover:border-blue-500 rounded-xl px-3 py-2 transition-colors w-40">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3.5L13.5 12 3 20.5V3.5z" fill="#4FC3F7"/>
                    <path d="M3 3.5l10.5 8.5-4 4L3 20.5V3.5z" fill="#81C784"/>
                    <path d="M13.5 12l4.5-4.5 2.5 1.5-7 3z" fill="#FFD54F"/>
                    <path d="M13.5 12l-4 4 4.5 4.5 2.5-1.5-3-7z" fill="#FF8A65"/>
                  </svg>
                  <div>
                    <p className="text-[9px] text-gray-400 leading-none">GET IT ON</p>
                    <p className="text-xs font-semibold text-white leading-tight">Google Play</p>
                  </div>
                </a>
                {/* App Store */}
                <a href="#" className="flex items-center gap-2 bg-black border border-gray-700 hover:border-blue-500 rounded-xl px-3 py-2 transition-colors w-40">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <p className="text-[9px] text-gray-400 leading-none">Download on the</p>
                    <p className="text-xs font-semibold text-white leading-tight">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Col 2 — Captain app */}
            <div>
              <p className="font-semibold text-gray-300 text-sm mb-5">Captain app</p>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 bg-black border border-gray-700 hover:border-blue-500 rounded-xl px-3 py-2 transition-colors w-40">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3.5L13.5 12 3 20.5V3.5z" fill="#4FC3F7"/>
                    <path d="M3 3.5l10.5 8.5-4 4L3 20.5V3.5z" fill="#81C784"/>
                    <path d="M13.5 12l4.5-4.5 2.5 1.5-7 3z" fill="#FFD54F"/>
                    <path d="M13.5 12l-4 4 4.5 4.5 2.5-1.5-3-7z" fill="#FF8A65"/>
                  </svg>
                  <div>
                    <p className="text-[9px] text-gray-400 leading-none">GET IT ON</p>
                    <p className="text-xs font-semibold text-white leading-tight">Google Play</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-black border border-gray-700 hover:border-blue-500 rounded-xl px-3 py-2 transition-colors w-40">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <p className="text-[9px] text-gray-400 leading-none">Download on the</p>
                    <p className="text-xs font-semibold text-white leading-tight">App Store</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Col 3 — Links */}
            <div>
              <ul className="space-y-3 mt-8">
                {['Home','About Us','Careers','Safety','Blog','Press','Privacy Policy'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Legal */}
            <div>
              <ul className="space-y-3 mt-8">
                {['Terms & Conditions','Privacy Policy','Cancellation Policy','Corporate Affairs','Captain Terms','Contact Us'].map(l => (
                  <li key={l}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5 — Follow Us */}
            <div>
              <p className="font-semibold text-gray-300 text-sm mb-5 mt-8">Follow Us</p>
              <div className="flex items-center gap-4">
                {/* Facebook */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 py-5 text-center" style={{ paddingLeft: 30, paddingRight: 30 }}>
          <p className="text-gray-500 text-sm">
            © 2024 Moveryy Transportation. <span className="text-blue-400">All rights reserved.</span>
          </p>
        </div>
      </footer>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CareersPage;
