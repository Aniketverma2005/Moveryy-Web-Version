import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MdOutlineDirectionsCar, MdOutlineCheckCircle,
  MdOutlineCancel, MdOutlineRefresh, MdOutlineAdd, MdClose,
  MdOutlineEdit, MdOutlineDelete,
} from 'react-icons/md';
import { api } from '../../services/api';

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusBadge = (status) => {
  const map = {
    available:   'bg-green-100 text-green-700',
    unavailable: 'bg-red-100 text-red-700',
    maintenance: 'bg-yellow-100 text-yellow-700',
  };
  return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-500';
};

const activeBadge = (isActive) =>
  isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400';

// ── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <Icon size={24} className={color} />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

// ── Empty form state ──────────────────────────────────────────────────────────
const emptyForm = {
  vehicleName: '',
  registrationNumber: '',
  manufacturer: '',
  vehicleType: '',
  capacityValue: '',
  capacityUnit: '',
  serviceType: '',
  registrarName: '',
  chassisNumber: '',
};

// ── Client-side validation ────────────────────────────────────────────────────
const validate = (form) => {
  const errs = {};
  if (!form.vehicleName.trim() || form.vehicleName.trim().length < 3)
    errs.vehicleName = 'Vehicle name is required (min 3 characters)';
  if (!form.registrationNumber.trim())
    errs.registrationNumber = 'Registration number is required';
  if (!form.manufacturer.trim() || form.manufacturer.trim().length < 3)
    errs.manufacturer = 'Manufacturer is required (min 3 characters)';
  if (!form.vehicleType.trim() || form.vehicleType.trim().length < 3)
    errs.vehicleType = 'Vehicle type is required (min 3 characters)';
  if (!form.capacityValue || isNaN(Number(form.capacityValue)))
    errs.capacityValue = 'Capacity value must be a number';
  if (!['bhk', 'tons', 'cubic_meters'].includes(form.capacityUnit))
    errs.capacityUnit = 'Select a valid capacity unit';
  if (!['houseshift', 'vehicletransport', 'officeshift'].includes(form.serviceType))
    errs.serviceType = 'Select a valid service type';
  if (!form.registrarName.trim() || form.registrarName.trim().length < 3)
    errs.registrarName = 'Registrar name is required (min 3 characters)';
  if (!form.chassisNumber.trim())
    errs.chassisNumber = 'Chassis number is required';
  return errs;
};

// ── Add Vehicle Modal ─────────────────────────────────────────────────────────
const AddVehicleModal = ({ onClose, onSuccess }) => {
  const [form, setForm]         = useState(emptyForm);
  const [fieldErrs, setFieldErrs] = useState({});
  const [saving, setSaving]     = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess]   = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrs[name]) setFieldErrs(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setFieldErrs(errs); return; }

    setSaving(true);
    try {
      const payload = {
        vehicleName:        form.vehicleName.trim(),
        registrationNumber: form.registrationNumber.trim(),
        manufacturer:       form.manufacturer.trim(),
        vehicleType:        form.vehicleType.trim(),
        capacityValue:      Number(form.capacityValue),
        capacityUnit:       form.capacityUnit,
        serviceType:        form.serviceType,
        registrarName:      form.registrarName.trim(),
        chassisNumber:      form.chassisNumber.trim(),
      };
      const res = await api.post('/api/v1/vehicles/register', payload);
      if (res?.success) {
        setSuccess(`"${res.data?.vehicleName}" registered successfully!`);
        setTimeout(() => { onSuccess(); onClose(); }, 1500);
      } else {
        throw new Error(res?.message || 'Registration failed');
      }
    } catch (err) {
      setApiError(err.message || 'Failed to register vehicle');
    } finally {
      setSaving(false);
    }
  };

  // Helper: input class based on error state
  const inputCls = (name) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
      fieldErrs[name]
        ? 'border-red-400 focus:ring-red-400 bg-red-50'
        : 'border-gray-200 focus:ring-blue-500'
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Register New Vehicle</h2>
            <p className="text-sm text-gray-500 mt-0.5">Add a vehicle to your organisation fleet</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
            <MdClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>

          {/* Row 1: Vehicle Name + Registration Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Name <span className="text-red-500">*</span>
              </label>
              <input name="vehicleName" value={form.vehicleName} onChange={handleChange}
                placeholder="e.g. Tata Ace" className={inputCls('vehicleName')} />
              {fieldErrs.vehicleName && <p className="text-xs text-red-500 mt-1">{fieldErrs.vehicleName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number <span className="text-red-500">*</span>
              </label>
              <input name="registrationNumber" value={form.registrationNumber} onChange={handleChange}
                placeholder="e.g. DL1AB1234" className={inputCls('registrationNumber')} />
              {fieldErrs.registrationNumber && <p className="text-xs text-red-500 mt-1">{fieldErrs.registrationNumber}</p>}
            </div>
          </div>

          {/* Row 2: Manufacturer + Vehicle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer <span className="text-red-500">*</span>
              </label>
              <input name="manufacturer" value={form.manufacturer} onChange={handleChange}
                placeholder="e.g. Tata Motors" className={inputCls('manufacturer')} />
              {fieldErrs.manufacturer && <p className="text-xs text-red-500 mt-1">{fieldErrs.manufacturer}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Type <span className="text-red-500">*</span>
              </label>
              <input name="vehicleType" value={form.vehicleType} onChange={handleChange}
                placeholder="e.g. truck, 6-wheeler" className={inputCls('vehicleType')} />
              {fieldErrs.vehicleType && <p className="text-xs text-red-500 mt-1">{fieldErrs.vehicleType}</p>}
            </div>
          </div>

          {/* Row 3: Capacity Value + Capacity Unit + Service Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity Value <span className="text-red-500">*</span>
              </label>
              <input type="number" name="capacityValue" value={form.capacityValue} onChange={handleChange}
                placeholder="e.g. 2" min="0" className={inputCls('capacityValue')} />
              {fieldErrs.capacityValue && <p className="text-xs text-red-500 mt-1">{fieldErrs.capacityValue}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity Unit <span className="text-red-500">*</span>
              </label>
              <select name="capacityUnit" value={form.capacityUnit} onChange={handleChange}
                className={inputCls('capacityUnit')}>
                <option value="">Select unit</option>
                <option value="bhk">bhk</option>
                <option value="tons">tons</option>
                <option value="cubic_meters">cubic_meters</option>
              </select>
              {fieldErrs.capacityUnit && <p className="text-xs text-red-500 mt-1">{fieldErrs.capacityUnit}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select name="serviceType" value={form.serviceType} onChange={handleChange}
                className={inputCls('serviceType')}>
                <option value="">Select service</option>
                <option value="houseshift">House Shift</option>
                <option value="vehicletransport">Vehicle Transport</option>
                <option value="officeshift">Office Shift</option>
              </select>
              {fieldErrs.serviceType && <p className="text-xs text-red-500 mt-1">{fieldErrs.serviceType}</p>}
            </div>
          </div>

          {/* Row 4: Registrar Name + Chassis Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registrar Name <span className="text-red-500">*</span>
              </label>
              <input name="registrarName" value={form.registrarName} onChange={handleChange}
                placeholder="e.g. Ravi Kumar" className={inputCls('registrarName')} />
              {fieldErrs.registrarName && <p className="text-xs text-red-500 mt-1">{fieldErrs.registrarName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chassis Number <span className="text-red-500">*</span>
              </label>
              <input name="chassisNumber" value={form.chassisNumber} onChange={handleChange}
                placeholder="e.g. MA3T1234567890123" className={inputCls('chassisNumber')} />
              {fieldErrs.chassisNumber && <p className="text-xs text-red-500 mt-1">{fieldErrs.chassisNumber}</p>}
            </div>
          </div>

          {/* API feedback */}
          {apiError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{apiError}</p>}
          {success  && <p className="text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">✅ {success}</p>}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center gap-2">
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {saving ? 'Registering...' : 'Register Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Vehicle Detail Panel (slide-in from right) ───────────────────────────────
const VehicleDetailPanel = ({ vehicle: v, onClose }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={onClose}>
    <div
      className="bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-blue-600">
        <div>
          <h2 className="text-xl font-bold text-white">{v.vehicleName}</h2>
          <p className="text-blue-200 text-sm mt-0.5 uppercase">{v.serviceType}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-blue-700 text-white transition-colors">
          <MdClose size={22} />
        </button>
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${statusBadge(v.status)}`}>
          {v.status || '—'}
        </span>
        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${activeBadge(v.isActive)}`}>
          {v.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {[
          { label: 'Vehicle Name',        value: v.vehicleName },
          { label: 'Registration Number', value: v.registrationNumber },
          { label: 'Manufacturer',        value: v.manufacturer },
          { label: 'Vehicle Type',        value: v.vehicleType },
          { label: 'Capacity',            value: v.capacityValue != null ? `${v.capacityValue} ${v.capacityUnit?.toUpperCase() || ''}` : '—' },
          { label: 'Service Type',        value: v.serviceType?.toUpperCase() },
          { label: 'Registrar Name',      value: v.registrarName },
          { label: 'Chassis Number',      value: v.chassisNumber },
          { label: 'Created At',          value: v.createdAt ? new Date(v.createdAt).toLocaleString() : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-4 py-3 border-b border-gray-50">
            <span className="text-sm text-gray-500 flex-shrink-0 w-40">{label}</span>
            <span className="text-sm font-medium text-gray-900 text-right break-all">{value || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ── Edit Vehicle Modal ────────────────────────────────────────────────────────
const EditVehicleModal = ({ vehicle, onClose, onSuccess }) => {
  const [form, setForm]           = useState({
    vehicleName:        vehicle.vehicleName        || '',
    registrationNumber: vehicle.registrationNumber || '',
    manufacturer:       vehicle.manufacturer       || '',
    vehicleType:        vehicle.vehicleType        || '',
    capacityValue:      vehicle.capacityValue      ?? '',
    capacityUnit:       vehicle.capacityUnit       || '',
    serviceType:        vehicle.serviceType        || '',
    registrarName:      vehicle.registrarName      || '',
    chassisNumber:      vehicle.chassisNumber      || '',
  });
  const [fieldErrs, setFieldErrs] = useState({});
  const [saving, setSaving]       = useState(false);
  const [apiError, setApiError]   = useState(null);
  const [success, setSuccess]     = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrs[name]) setFieldErrs(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setFieldErrs(errs); return; }
    setSaving(true);
    try {
      const payload = {
        vehicleName:        form.vehicleName.trim(),
        registrationNumber: form.registrationNumber.trim(),
        manufacturer:       form.manufacturer.trim(),
        vehicleType:        form.vehicleType.trim(),
        capacityValue:      Number(form.capacityValue),
        capacityUnit:       form.capacityUnit,
        serviceType:        form.serviceType,
        registrarName:      form.registrarName.trim(),
        chassisNumber:      form.chassisNumber.trim(),
      };
      const res = await api.put(`/api/v1/vehicles/${vehicle.vehicleId}`, payload);
      if (res?.success || res?.message) {
        setSuccess('Vehicle updated successfully!');
        setTimeout(() => { onSuccess(); onClose(); }, 1200);
      } else {
        throw new Error(res?.message || 'Update failed');
      }
    } catch (err) {
      setApiError(err.message || 'Failed to update vehicle');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = (name) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all ${
      fieldErrs[name] ? 'border-red-400 focus:ring-red-400 bg-red-50' : 'border-gray-200 focus:ring-blue-500'
    }`;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Vehicle</h2>
            <p className="text-sm text-gray-500 mt-0.5">{vehicle.vehicleName} · {vehicle.registrationNumber}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500"><MdClose size={22} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'vehicleName', label: 'Vehicle Name', placeholder: 'e.g. Tata Ace' },
              { name: 'registrationNumber', label: 'Registration Number', placeholder: 'e.g. DL1AB1234' },
              { name: 'manufacturer', label: 'Manufacturer', placeholder: 'e.g. Tata Motors' },
              { name: 'vehicleType', label: 'Vehicle Type', placeholder: 'e.g. truck, 6-wheeler' },
              { name: 'registrarName', label: 'Registrar Name', placeholder: 'e.g. Ravi Kumar' },
              { name: 'chassisNumber', label: 'Chassis Number', placeholder: 'e.g. MA3T1234...' },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-red-500">*</span></label>
                <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className={inputCls(name)} />
                {fieldErrs[name] && <p className="text-xs text-red-500 mt-1">{fieldErrs[name]}</p>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity Value <span className="text-red-500">*</span></label>
              <input type="number" name="capacityValue" value={form.capacityValue} onChange={handleChange} min="0" className={inputCls('capacityValue')} />
              {fieldErrs.capacityValue && <p className="text-xs text-red-500 mt-1">{fieldErrs.capacityValue}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity Unit <span className="text-red-500">*</span></label>
              <select name="capacityUnit" value={form.capacityUnit} onChange={handleChange} className={inputCls('capacityUnit')}>
                <option value="">Select unit</option>
                <option value="bhk">bhk</option>
                <option value="tons">tons</option>
                <option value="cubic_meters">cubic_meters</option>
              </select>
              {fieldErrs.capacityUnit && <p className="text-xs text-red-500 mt-1">{fieldErrs.capacityUnit}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type <span className="text-red-500">*</span></label>
              <select name="serviceType" value={form.serviceType} onChange={handleChange} className={inputCls('serviceType')}>
                <option value="">Select service</option>
                <option value="houseshift">House Shift</option>
                <option value="vehicletransport">Vehicle Transport</option>
                <option value="officeshift">Office Shift</option>
              </select>
              {fieldErrs.serviceType && <p className="text-xs text-red-500 mt-1">{fieldErrs.serviceType}</p>}
            </div>
          </div>
          {apiError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">{apiError}</p>}
          {success  && <p className="text-sm text-green-600 bg-green-50 px-4 py-3 rounded-xl">✅ {success}</p>}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-60 flex items-center gap-2">
              {saving && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
const DeleteConfirmModal = ({ vehicle, onClose, onSuccess }) => {
  const [deleting, setDeleting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleDelete = async () => {
    setDeleting(true);
    setApiError(null);
    try {
      const res = await api.delete(`/api/v1/vehicles/${vehicle.vehicleId}`);
      if (res?.success || res?.message) {
        onSuccess();
        onClose();
      } else {
        throw new Error(res?.message || 'Delete failed');
      }
    } catch (err) {
      setApiError(err.message || 'Failed to delete vehicle');
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdOutlineDelete size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Vehicle?</h2>
          <p className="text-gray-500 text-sm mb-1">
            Are you sure you want to delete
          </p>
          <p className="font-semibold text-gray-900 mb-1">{vehicle.vehicleName}</p>
          <p className="text-gray-400 text-xs mb-6">{vehicle.registrationNumber}</p>
          <p className="text-red-500 text-xs mb-6">This action cannot be undone.</p>
          {apiError && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl mb-4">{apiError}</p>}
          <div className="flex items-center justify-center gap-3">
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={deleting} className="px-6 py-2.5 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center gap-2">
              {deleting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {deleting ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const Vehicles = () => {
  const [vehicles, setVehicles]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [search, setSearch]             = useState('');
  const [filterType, setFilterType]     = useState('all');
  const [showModal, setShowModal]       = useState(false);
  const [editVehicle, setEditVehicle]   = useState(null);
  const [deleteVehicle, setDeleteVehicle] = useState(null);
  const [detailVehicle, setDetailVehicle] = useState(null); // row click → detail panel

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/v1/vehicles/all');
      // Response: { message: "...", vehicles: [...] }
      const list = res?.vehicles || [];
      setVehicles(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('❌ Fetch vehicles error:', err);
      setError(err.message || 'Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const total     = vehicles.length;
  const available = vehicles.filter(v => v.status?.toLowerCase() === 'available').length;
  const active    = vehicles.filter(v => v.isActive).length;
  const types     = [...new Set(vehicles.map(v => v.vehicleType).filter(Boolean))];

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = vehicles.filter(v => {
    const q = search.toLowerCase();
    const matchSearch =
      v.vehicleName?.toLowerCase().includes(q) ||
      v.registrationNumber?.toLowerCase().includes(q) ||
      v.registrarName?.toLowerCase().includes(q) ||
      v.manufacturer?.toLowerCase().includes(q);
    const matchType = filterType === 'all' || v.vehicleType?.toLowerCase() === filterType;
    return matchSearch && matchType;
  });

  return (
    <>
      {showModal && (
        <AddVehicleModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchVehicles}
        />
      )}
      {editVehicle && (
        <EditVehicleModal
          vehicle={editVehicle}
          onClose={() => setEditVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}
      {deleteVehicle && (
        <DeleteConfirmModal
          vehicle={deleteVehicle}
          onClose={() => setDeleteVehicle(null)}
          onSuccess={fetchVehicles}
        />
      )}
      {detailVehicle && (
        <VehicleDetailPanel
          vehicle={detailVehicle}
          onClose={() => setDetailVehicle(null)}
        />
      )}

      <div className="p-6 space-y-6">
        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fleet Vehicles</h1>
            <p className="text-sm text-gray-500 mt-0.5">All vehicles registered under your organisation</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchVehicles}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <MdOutlineRefresh size={18} />
              Refresh
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              <MdOutlineAdd size={20} />
              Add Vehicle
            </button>
          </div>
        </motion.div>

        {/* ── 3 Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Vehicles', value: total,     Icon: MdOutlineDirectionsCar, color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100'   },
            { label: 'Available',      value: available, Icon: MdOutlineCheckCircle,   color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100'  },
            { label: 'Active',         value: active,    Icon: MdOutlineCheckCircle,   color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className={`bg-white rounded-2xl p-5 border ${card.border} shadow-sm hover:shadow-md transition-shadow flex items-center gap-4`}
            >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Table toolbar */}
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Vehicle List</h2>
              <p className="text-xs text-gray-400 mt-0.5">{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                placeholder="Search vehicles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-4 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-52"
              />
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                {types.map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-500 text-sm">Loading vehicles...</p>
            </div>

          /* Error */
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <MdOutlineCancel size={48} className="text-red-400" />
              <p className="text-gray-700 font-semibold">Failed to load vehicles</p>
              <p className="text-gray-400 text-sm">{error}</p>
              <button
                onClick={fetchVehicles}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700"
              >
                Retry
              </button>
            </div>

          /* Empty */
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <MdOutlineDirectionsCar size={48} className="text-gray-300" />
              <p className="text-gray-500 text-sm">No vehicles found</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-1 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700"
              >
                <MdOutlineAdd size={18} />
                Add your first vehicle
              </button>
            </div>

          /* Table */
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-12">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Vehicle</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Reg. Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Manufacturer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Capacity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Registrar</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Active</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                  {filtered.map((v, i) => (
                    <motion.tr
                      key={v.vehicleId ?? i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                      onClick={() => setDetailVehicle(v)}
                    >
                      <td className="px-4 py-4 text-gray-400 text-xs font-medium">{i + 1}</td>
                      {/* Vehicle Name */}
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">{v.vehicleName || '—'}</p>
                        <p className="text-xs text-gray-400 uppercase">{v.serviceType || ''}</p>
                      </td>
                      <td className="px-4 py-4 font-mono text-gray-700 text-xs">{v.registrationNumber || '—'}</td>
                      <td className="px-4 py-4 text-gray-600">{v.manufacturer || '—'}</td>
                      <td className="px-4 py-4">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium capitalize">
                          {v.vehicleType || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {v.capacityValue != null ? `${v.capacityValue} ${v.capacityUnit?.toUpperCase() || ''}` : '—'}
                      </td>
                      <td className="px-4 py-4 text-gray-700">{v.registrarName || '—'}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusBadge(v.status)}`}>
                          {v.status || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {/* Pulsing dot for active */}
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            {v.isActive && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${v.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          </span>
                          <span className={`text-xs font-semibold ${v.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                            {v.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      {/* Actions — stop row click from firing */}
                      <td className="px-4 py-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditVehicle(v)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <MdOutlineEdit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteVehicle(v)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <MdOutlineDelete size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Vehicles;
