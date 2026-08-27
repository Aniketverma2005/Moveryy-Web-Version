import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  MdOutlineVerified, MdOutlineStar, MdOutlinePeople,
  MdOutlineAccessTime, MdOutlineAttachMoney, MdOutlineAddLocation,
  MdOutlinePhone, MdOutlineEmail, MdOutlineLanguage, MdOutlineCategory,
  MdOutlineLocationOn, MdOutlineBusiness,
} from 'react-icons/md';
import { api } from '../../services/api';
import officeIcon from '../../assets/office.png';

// ── Helpers ───────────────────────────────────────────────────────────────────
const cap = (str) => {
  if (!str) return str;
  return String(str).replace(/\b\w/g, c => c.toUpperCase());
};

const InfoRow = ({ icon: Icon, imgSrc, label, value }) => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
      {imgSrc
        ? <img src={imgSrc} alt={label} className="w-5 h-5 object-contain" style={{ filter: 'invert(31%) sepia(98%) saturate(1200%) hue-rotate(200deg) brightness(95%)' }} />
        : <Icon size={16} className="text-blue-600" />
      }
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800 break-words">{value || '—'}</p>
    </div>
  </div>
);

const RatingBar = ({ stars, percentage }) => (
  <div className="flex items-center gap-3 mb-2">
    <span className="text-xs text-gray-500 w-10 flex-shrink-0">{stars} ★</span>
    <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-blue-500 h-2 rounded-full"
      />
    </div>
    <span className="text-xs text-gray-400 w-8 text-right flex-shrink-0">{percentage}%</span>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const selectedOrg         = useSelector((state) => state.users.organization);
  const [org, setOrg]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Always fetch fresh org data from backend — ensures status is up to date after switch
    const orgId = selectedOrg?.organizationId ?? selectedOrg?.id ?? null;

    if (orgId) {
      // Fetch the specific org by fetching all and finding the selected one
      api.get('/api/v1/organizations/all')
        .then(res => {
          const list     = res?.organizations ?? res?.data ?? [];
          const fresh    = list.find(o => (o.organizationId ?? o.id) == orgId) ?? selectedOrg;
          setOrg(fresh);
        })
        .catch(() => setOrg(selectedOrg)) // fallback to Redux if fetch fails
        .finally(() => setLoading(false));
    } else {
      // No selected org in Redux — fetch first available
      api.get('/api/v1/organizations/all')
        .then(res => {
          const list = res?.organizations ?? res?.data ?? [];
          if (list.length > 0) setOrg(list[0]);
        })
        .catch(err => console.error('❌ Fetch org error:', err))
        .finally(() => setLoading(false));
    }
  }, [selectedOrg?.organizationId]);

  const orgName     = cap(org?.organizationName || org?.businessName || 'Organisation');
  const businessName = cap(org?.businessName || '—');
  const about       = cap(org?.about || '—');
  const phone       = org?.phone || '—';
  const email       = org?.email || '—';
  const domain      = org?.domain || '—';
  const status      = cap(org?.status || '—');
  const orgType     = cap(org?.organizationType || '—');
  const city        = cap(org?.city || '');
  const state       = cap(org?.state || '');
  const country     = cap(org?.country || '');
  const pincode     = org?.pincode || '';
  const addr1       = cap(org?.addressLine1 || '');
  const addr2       = cap(org?.addressLine2 || '');
  const fullAddress = [addr1, addr2, city, state, pincode, country].filter(Boolean).join(', ') || '—';
  const createdYear = org?.createdAt ? new Date(org.createdAt).getFullYear() : null;
  const yearsInBiz  = createdYear ? `${new Date().getFullYear() - createdYear}+` : '—';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 space-y-6">

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
      >
        {/* Subtle gradient accent bar at top */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 w-full" />

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Logo / Avatar */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 border border-blue-100">
            <img src={officeIcon} alt="Organisation" className="w-10 h-10 object-contain" style={{ filter: 'invert(31%) sepia(98%) saturate(1200%) hue-rotate(200deg) brightness(95%)' }} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{orgName}</h1>
              {status.toLowerCase() === 'active' && (
                <MdOutlineVerified size={22} className="text-blue-500" />
              )}
            </div>
            <p className="text-gray-500 text-sm mt-1">
              {createdYear ? `Since ${createdYear}` : ''}
              {createdYear && status ? ' · ' : ''}
              {status}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {city    && <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full border border-blue-100 font-medium">{city}</span>}
              {state   && <span className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full border border-indigo-100 font-medium">{state}</span>}
              {country && <span className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full border border-purple-100 font-medium">{country}</span>}
            </div>
          </div>

          {/* Status badge */}
          <div className="flex-shrink-0">
            <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              status.toLowerCase() === 'active'
                ? 'bg-green-50 text-green-600 border border-green-100'
                : 'bg-gray-50 text-gray-500 border border-gray-100'
            }`}>
              {status}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left Column ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Company Information</h2>
            </div>
            <div className="px-6 py-2 grid grid-cols-1 sm:grid-cols-2">
              <InfoRow imgSrc={officeIcon}         label="Organisation Name"  value={orgName} />
              <InfoRow imgSrc={officeIcon}         label="Business Name"      value={businessName} />
              <div className="sm:col-span-2">
                <InfoRow icon={MdOutlineLocationOn} label="Business Address" value={fullAddress} />
              </div>
              <InfoRow icon={MdOutlinePhone}     label="Contact Number"    value={phone} />
              <InfoRow icon={MdOutlineEmail}     label="Email Address"     value={email} />
              <InfoRow icon={MdOutlineLanguage}  label="Domain"            value={domain} />
              <InfoRow icon={MdOutlineCategory}  label="Organisation Type" value={orgType} />
            </div>
          </motion.div>

          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-3">About Us</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{about}</p>
          </motion.div>

          {/* Operating Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Operating Hours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Weekdays (Mon – Fri)', value: '9:00 AM – 6:00 PM', from: 'from-blue-50', to: 'to-indigo-50', text: 'text-blue-700', border: 'border-blue-100' },
                { label: 'Weekends (Sat – Sun)', value: '10:00 AM – 4:00 PM', from: 'from-purple-50', to: 'to-pink-50', text: 'text-purple-700', border: 'border-purple-100' },
              ].map(({ label, value, from, to, text, border }) => (
                <div key={label} className={`bg-gradient-to-br ${from} ${to} rounded-xl p-4 border ${border}`}>
                  <p className="text-xs text-gray-500 font-medium mb-1">{label}</p>
                  <p className={`text-sm font-bold ${text}`}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Pricing Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Local Moving (Within City)', min: '2,000', max: '8,000' },
                { title: 'Inter-City Moving',          min: '5,000', max: '25,000' },
              ].map(({ title, min, max }) => (
                <div key={title} className="border border-gray-100 rounded-xl p-5 hover:shadow-sm transition-shadow">
                  <p className="text-sm font-semibold text-gray-800 mb-3">{title}</p>
                  <div className="flex justify-between gap-3">
                    <div className="flex-1 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 text-center border border-green-100">
                      <p className="text-xs text-green-600 mb-1">Min Price</p>
                      <p className="text-base font-bold text-green-700">₹{min}</p>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 text-center border border-blue-100">
                      <p className="text-xs text-blue-600 mb-1">Max Price</p>
                      <p className="text-base font-bold text-blue-700">₹{max}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right Column ── */}
        <div className="space-y-6">

          {/* Customer Ratings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Customer Ratings</h2>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-4xl font-black text-gray-900">4.3</span>
              <div>
                <div className="flex text-yellow-400 gap-0.5">
                  {[1,2,3,4,5].map(s => <MdOutlineStar key={s} size={18} />)}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Based on 127 reviews</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <RatingBar stars="5" percentage={85} />
              <RatingBar stars="4" percentage={26} />
              <RatingBar stars="3" percentage={8}  />
              <RatingBar stars="2" percentage={2}  />
              <RatingBar stars="1" percentage={0}  />
            </div>
          </motion.div>

          {/* Business Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Business Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Total Completed',  value: '898',       icon: MdOutlineVerified,    bg: 'bg-blue-50',   color: 'text-blue-600'   },
                { label: 'Active Customers', value: '234',       icon: MdOutlinePeople,      bg: 'bg-green-50',  color: 'text-green-600'  },
                { label: 'Years in Business',value: yearsInBiz,  icon: MdOutlineAccessTime,  bg: 'bg-purple-50', color: 'text-purple-600' },
              ].map(({ label, value, icon: Icon, bg, color }) => (
                <div key={label} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: MdOutlineStar,          label: 'View All Reviews'     },
                { icon: MdOutlineAttachMoney,    label: 'Update Pricing'       },
                { icon: MdOutlineAddLocation,    label: 'Manage Service Areas' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors text-left"
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
