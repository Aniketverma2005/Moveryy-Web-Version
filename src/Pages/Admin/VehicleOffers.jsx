import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  MdOutlineLocalOffer, MdOutlineCheckCircle, MdOutlineCancel,
  MdOutlineRefresh, MdOutlineAdd, MdClose, MdOutlineDelete,
} from 'react-icons/md';
import { fetchVehicleOffers, createVehicleOffer } from '../../features/vehicleOffers/vehicleOffersSlice';
import { fetchVehicles } from '../../features/users/usersSlice';

// ── Discount type mapping ─────────────────────────────────────────────────────
const UI_TO_API = { percentage: 'percentage', value: 'value' };
const API_TO_UI = { percentage: 'percentage', value: 'value', flat: 'value', fixed: 'value' };
const uiToApiDiscountType = (ui)  => UI_TO_API[ui]  ?? ui;
const discountTypeLabel   = (api) =>
  ({ percentage: 'Percentage', value: 'Value', flat: 'Value', fixed: 'Value' }[api] ?? api ?? '—');

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB') : '—';

const statusBadge = (offer) => {
  const now   = new Date();
  const end   = offer.endDate   ? new Date(offer.endDate)   : null;
  const start = offer.startDate ? new Date(offer.startDate) : null;
  if (!offer.isActive)      return 'bg-red-100 text-red-700';
  if (end && end < now)     return 'bg-gray-100 text-gray-500';
  if (start && start > now) return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
};
const statusLabel = (offer) => {
  const now   = new Date();
  const end   = offer.endDate   ? new Date(offer.endDate)   : null;
  const start = offer.startDate ? new Date(offer.startDate) : null;
  if (!offer.isActive)      return 'Inactive';
  if (end && end < now)     return 'Expired';
  if (start && start > now) return 'Scheduled';
  return 'Active';
};

// ── Input class helper ────────────────────────────────────────────────────────
const inputCls = (err) =>
  `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
    err ? 'border-red-400 focus:ring-red-400 bg-red-50' : 'border-gray-200 focus:ring-blue-500'
  }`;

// ── Empty form ────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  vehicleId:     '',
  offerName:     '',
  discountType:  'percentage',
  discountValue: '',
  startDate:     '',
  endDate:       '',
};

// ── Validation ────────────────────────────────────────────────────────────────
const validate = (form) => {
  const e = {};
  if (!form.vehicleId)      e.vehicleId     = 'Select a vehicle';
  if (!form.offerName.trim()) e.offerName   = 'Offer name is required';
  if (!form.discountType)   e.discountType  = 'Discount type is required';
  if (!form.discountValue || isNaN(Number(form.discountValue)) || Number(form.discountValue) <= 0)
    e.discountValue = 'Enter a valid discount value';
  if (form.discountType === 'percentage' && Number(form.discountValue) > 100)
    e.discountValue = 'Percentage cannot exceed 100';
  if (!form.startDate) e.startDate = 'Start date is required';
  if (!form.endDate)   e.endDate   = 'End date is required';
  if (form.startDate && form.endDate && form.endDate < form.startDate)
    e.endDate = 'End date must be after start date';
  return e;
};

// ── Create Modal ──────────────────────────────────────────────────────────────
const CreateVehicleOfferModal = ({ vehicles, vehiclesLoading, onClose, creating, createError }) => {
  const dispatch = useDispatch();
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [fieldErrs,  setFieldErrs]  = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrs[name]) setFieldErrs(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setFieldErrs(errs); return; }

    const payload = {
      vehicleId:     Number(form.vehicleId),
      offerName:     form.offerName.trim(),
      discountType:  uiToApiDiscountType(form.discountType),
      discountValue: String(Number(form.discountValue).toFixed(2)), // "15.00"
      startDate:     form.startDate,
      endDate:       form.endDate,
    };

    const result = await dispatch(createVehicleOffer(payload));
    if (createVehicleOffer.fulfilled.match(result)) {
      setSuccessMsg(`"${payload.offerName}" created successfully!`);
      dispatch(fetchVehicleOffers());
      setTimeout(() => { onClose(); }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Create Vehicle Offer</h2>
            <p className="text-sm text-gray-500 mt-0.5">Add a discount offer for a specific vehicle</p>
          </div>
          <button onClick={onClose} disabled={creating}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors disabled:opacity-40">
            <MdClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>

          {/* Vehicle Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle <span className="text-red-500">*</span>
            </label>
            {vehiclesLoading ? (
              <div className={`${inputCls(false)} text-gray-400`}>Loading vehicles...</div>
            ) : (
              <select name="vehicleId" value={form.vehicleId} onChange={handleChange}
                className={inputCls(fieldErrs.vehicleId)}>
                <option value="">Select a vehicle</option>
                {vehicles.map((v) => (
                  <option key={v.vehicleId} value={v.vehicleId}>
                    {v.vehicleName} — {v.registrationNumber}
                  </option>
                ))}
              </select>
            )}
            {fieldErrs.vehicleId && <p className="text-xs text-red-500 mt-1">{fieldErrs.vehicleId}</p>}
          </div>

          {/* Offer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Offer Name <span className="text-red-500">*</span>
            </label>
            <input name="offerName" value={form.offerName} onChange={handleChange}
              placeholder="e.g. Diwali Transport Discount" className={inputCls(fieldErrs.offerName)} />
            {fieldErrs.offerName && <p className="text-xs text-red-500 mt-1">{fieldErrs.offerName}</p>}
          </div>

          {/* Discount Type + Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type <span className="text-red-500">*</span>
              </label>
              <select name="discountType" value={form.discountType} onChange={handleChange}
                className={inputCls(fieldErrs.discountType)}>
                <option value="percentage">Percentage (%)</option>
                <option value="value">Value (₹)</option>
              </select>
              {fieldErrs.discountType && <p className="text-xs text-red-500 mt-1">{fieldErrs.discountType}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                  {form.discountType === 'percentage' ? '%' : '₹'}
                </span>
                <input name="discountValue" type="number" min="0"
                  max={form.discountType === 'percentage' ? '100' : undefined}
                  value={form.discountValue} onChange={handleChange}
                  placeholder={form.discountType === 'percentage' ? 'Enter percentage' : 'Enter discount value'}
                  className={`${inputCls(fieldErrs.discountValue)} pl-8`} />
              </div>
              {fieldErrs.discountValue && <p className="text-xs text-red-500 mt-1">{fieldErrs.discountValue}</p>}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input type="date" name="startDate" value={form.startDate} onChange={handleChange}
                className={inputCls(fieldErrs.startDate)} />
              {fieldErrs.startDate && <p className="text-xs text-red-500 mt-1">{fieldErrs.startDate}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input type="date" name="endDate" value={form.endDate} onChange={handleChange}
                min={form.startDate || undefined} className={inputCls(fieldErrs.endDate)} />
              {fieldErrs.endDate && <p className="text-xs text-red-500 mt-1">{fieldErrs.endDate}</p>}
            </div>
          </div>

          {/* Feedback */}
          {createError && !successMsg &&
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">⚠ {createError}</p>}
          {successMsg &&
            <p className="text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">✅ {successMsg}</p>}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} disabled={creating}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={creating}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center gap-2">
              {creating && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {creating ? 'Creating...' : 'Create Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const VehicleOffersPage = () => {
  const dispatch = useDispatch();

  const { list, loading, error, creating, createError } =
    useSelector((state) => state.vehicleOffers);

  // vehicles list from users slice (already fetched there)
  const { vehicles, vehiclesLoading } =
    useSelector((state) => state.users);

  const [showCreate, setShowCreate] = useState(false);
  const [search,     setSearch]     = useState('');

  useEffect(() => {
    dispatch(fetchVehicleOffers());
    dispatch(fetchVehicles());
  }, [dispatch]);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const total   = list.length;
  const now     = new Date();
  const active  = list.filter(o => o.isActive).length;
  const expired = list.filter(o => o.endDate && new Date(o.endDate) < now).length;

  // ── Filtered ───────────────────────────────────────────────────────────────
  const filtered = list.filter(o =>
    (o.offerName ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showCreate && (
        <CreateVehicleOfferModal
          vehicles={vehicles}
          vehiclesLoading={vehiclesLoading}
          onClose={() => setShowCreate(false)}
          creating={creating}
          createError={createError}
        />
      )}

      <div className="p-6 space-y-6">

        {/* ── Page Header ── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vehicle Offers</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage discount offers assigned to specific vehicles
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => dispatch(fetchVehicleOffers())}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              <MdOutlineRefresh size={18} />
              Refresh
            </button>
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
              <MdOutlineAdd size={20} />
              New Vehicle Offer
            </button>
          </div>
        </motion.div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Offers', value: total,   Icon: MdOutlineLocalOffer,  color: 'text-blue-600',  bg: 'bg-blue-50',  border: 'border-blue-100'  },
            { label: 'Active',       value: active,  Icon: MdOutlineCheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
            { label: 'Expired',      value: expired, Icon: MdOutlineCancel,      color: 'text-red-500',   bg: 'bg-red-50',   border: 'border-red-100'   },
          ].map((card, i) => (
            <motion.div key={card.label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className={`bg-white rounded-2xl p-5 border ${card.border} shadow-sm hover:shadow-md transition-shadow flex items-center gap-4`}>
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <card.Icon size={24} className={card.color} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Table Card ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Vehicle Offer List</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {filtered.length} offer{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
            <input type="text" placeholder="Search offers..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-4 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-52" />
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Loading vehicle offers...</p>
            </div>

          /* Error */
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <MdOutlineCancel size={48} className="text-red-400" />
              <p className="text-gray-700 font-semibold">Failed to load vehicle offers</p>
              <p className="text-gray-400 text-sm">{error}</p>
              <button onClick={() => dispatch(fetchVehicleOffers())}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700">
                Retry
              </button>
            </div>

          /* Empty */
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <MdOutlineLocalOffer size={48} className="text-gray-300" />
              <p className="text-gray-500 text-sm">No vehicle offers found</p>
              <button onClick={() => setShowCreate(true)}
                className="mt-1 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700">
                <MdOutlineAdd size={18} />
                Create your first vehicle offer
              </button>
            </div>

          /* Table */
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['S.No', 'Offer Name', 'Vehicle', 'Type', 'Discount', 'Start', 'End', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((offer, i) => (
                    <motion.tr key={offer.vehicleOfferId ?? offer.offerId ?? i}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-4 py-4 text-gray-400 text-xs font-medium">{i + 1}</td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">{offer.offerName || '—'}</p>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-xs">
                        {offer.vehicleId ? `#${offer.vehicleId}` : '—'}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {discountTypeLabel(offer.discountType)}
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-800">
                        {offer.discountType === 'percentage'
                          ? `${parseFloat(offer.discountValue ?? 0)}%`
                          : offer.discountValue
                          ? `₹${parseFloat(offer.discountValue).toLocaleString('en-IN')}`
                          : '—'}
                      </td>
                      <td className="px-4 py-4 text-gray-600">{formatDate(offer.startDate)}</td>
                      <td className="px-4 py-4 text-gray-600">{formatDate(offer.endDate)}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(offer)}`}>
                          {statusLabel(offer)}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default VehicleOffersPage;
