import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  MdArrowForward, MdOutlineBusiness, MdOutlineLocationOn,
  MdOutlineReceiptLong, MdOutlineCategory, MdOutlinePhone,
  MdOutlineEmail, MdOutlineLanguage, MdOutlineImage,
  MdOutlineApartment, MdOutlineMap, MdOutlinePinDrop,
} from 'react-icons/md';
import { api } from '../../services/api';
import { setOrganization } from '../../features/users/usersSlice';
import logo from '../../assets/logo2.png';

// ── Field ─────────────────────────────────────────────────────────────────────
const Field = ({ label, id, type = 'text', placeholder, value, onChange, error, required = true, icon }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
      <input id={id} name={id} type={type} placeholder={placeholder}
        value={value} onChange={onChange}
        className={`w-full ${icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5 border rounded-xl text-sm
          focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

// ── Org type options ──────────────────────────────────────────────────────────
const ORG_TYPES = [
  'Logistics & Delivery', 'E-Commerce', 'Retail',
  'Manufacturing', 'Healthcare', 'Food & Beverage',
  'Construction', 'Technology', 'Other',
];

// ── Main ──────────────────────────────────────────────────────────────────────
const OrgRegistration = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const logoRef   = useRef(null);

  const [form, setForm] = useState({
    organizationName: '',
    organizationType: '',
    businessName:     '',
    about:            '',
    gstNumber:        '',
    website:          '',
    phone:            '',
    email:            '',
    country:          '',
    state:            '',
    city:             '',
    pincode:          '',
    addressLine1:     '',
    addressLine2:     '',
  });
  const [logoFile,  setLogoFile]  = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [errors,    setErrors]    = useState({});
  const [apiError,  setApiError]  = useState('');
  const [loading,   setLoading]   = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    if (apiError) setApiError('');
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const err = {};
    if (!form.organizationName.trim() || form.organizationName.trim().length < 3)
      err.organizationName = 'Min 3 characters required';
    if (!form.organizationType)
      err.organizationType = 'Please select an organization type';
    if (!form.businessName.trim() || form.businessName.trim().length < 3)
      err.businessName = 'Min 3 characters required';
    if (!form.phone.trim())
      err.phone = 'Phone number is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Valid email is required';
    if (!form.country.trim())  err.country  = 'Country is required';
    if (!form.state.trim())    err.state    = 'State is required';
    if (!form.city.trim())     err.city     = 'City is required';
    if (!form.pincode.trim() || !/^\d+$/.test(form.pincode))
      err.pincode = 'Valid numeric pincode required';
    if (!form.addressLine1.trim()) err.addressLine1 = 'Address Line 1 is required';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      const token = localStorage.getItem('moveryy_token');

      // Guard: if no token, session expired — redirect to login
      if (!token) {
        setApiError('Session expired. Please log in again.');
        setLoading(false);
        navigate('/login');
        return;
      }

      console.log('📋 Token present:', token.substring(0, 30) + '...');

      // Send text fields as urlencoded — avoids multer vs express-fileupload conflict.
      // Both multer and express-fileupload only activate on multipart/form-data.
      // urlencoded bodies go straight through to express.urlencoded → req.body. ✅
      const params = new URLSearchParams();
      params.append('organizationName', form.organizationName.trim());
      params.append('organizationType', form.organizationType);
      params.append('businessName',     form.businessName.trim());
      params.append('phone',            form.phone.trim());
      params.append('email',            form.email.trim().toLowerCase());
      params.append('country',          form.country.trim());
      params.append('state',            form.state.trim());
      params.append('city',             form.city.trim());
      params.append('pincode',          form.pincode.trim());
      params.append('addressLine1',     form.addressLine1.trim());
      if (form.about.trim())        params.append('about',        form.about.trim());
      if (form.gstNumber.trim())    params.append('gstNumber',    form.gstNumber.trim());
      if (form.website.trim())      params.append('website',      form.website.trim());
      if (form.addressLine2.trim()) params.append('addressLine2', form.addressLine2.trim());

      const createRes = await fetch('http://localhost:8000/api/v1/organizations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: params.toString(),
      });

      const createData = await createRes.json();
      if (!createRes.ok) throw new Error(createData?.message || `Error ${createRes.status}`);

      const org = createData?.data ?? createData?.organization ?? createData;
      const orgId = org?.organizationId ?? org?.id;

      // Upload logo separately via /upload-logo/:id (uses express-fileupload ✅)
      if (logoFile && orgId) {
        const logoFd = new FormData();
        logoFd.append('logo', logoFile, logoFile.name);

        const logoRes = await fetch(
          `http://localhost:8000/api/v1/organizations/upload-logo/${orgId}`,
          {
            method: 'PATCH',
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
            body: logoFd,
          }
        );

        if (logoRes.ok) {
          const logoData = await logoRes.json();
          org.logo = logoData?.data?.logo ?? logoData?.logo ?? org.logo;
        } else {
          console.warn('Logo upload failed:', await logoRes.text());
        }
      }

      dispatch(setOrganization(org));
      const stored = localStorage.getItem('moveryy_user');
      if (stored) {
        const user = JSON.parse(stored);
        user.hasOrganization = true;
        user.organizationId  = orgId;
        localStorage.setItem('moveryy_user', JSON.stringify(user));
      }
      navigate('/admin');
    } catch (err) {
      setApiError(err?.message || 'Failed to create organization. Please try again.');
      console.error('Org creation error:', err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob-float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* ── LEFT — Blue panel ── */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-[0.12]"
            style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'blob-float 10s ease-in-out infinite' }} />
          <div className="absolute bottom-12 -left-10 w-48 h-48 rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', animation: 'blob-float 14s ease-in-out infinite reverse' }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="relative z-10">
          <div className="bg-white rounded-xl p-3 inline-block shadow-md mb-8">
            <img src={logo} alt="Moveryy" className="h-12 w-auto object-contain" />
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-5 fade-up">
            Set Up Your<br />
            <span className="text-blue-200">Organization</span>
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed mb-10 opacity-85 max-w-sm fade-up">
            Register your business to unlock the full admin dashboard, manage employees, vehicles, and deliveries.
          </p>
          <div className="space-y-5">
            {['Manage your delivery fleet', 'Track employee performance', 'Access real-time analytics', 'Create and manage offers'].map(text => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-100 text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-blue-300 text-sm opacity-60">Trusted by 500+ delivery partners worldwide</p>
      </div>

      {/* ── RIGHT — Form ── */}
      <div className="w-full lg:w-1/2 bg-white flex items-start justify-center p-8 md:p-12 overflow-y-auto">
        <div className="w-full max-w-lg">

          <div className="mb-8 fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Organization Details</h2>
            <p className="text-gray-400 text-base">Tell us about your business to get started</p>
          </div>

          {apiError && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 fade-up">

            {/* Organization Name */}
            <Field id="organizationName" label="Organization Name"
              placeholder="Moveryy Logistics Pvt. Ltd."
              value={form.organizationName} onChange={handleChange}
              error={errors.organizationName}
              icon={<MdOutlineBusiness size={18} />} />

            {/* Business Name */}
            <Field id="businessName" label="Business Name"
              placeholder="Moveryy Logistics"
              value={form.businessName} onChange={handleChange}
              error={errors.businessName}
              icon={<MdOutlineApartment size={18} />} />

            {/* Organization Type */}
            <div>
              <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1.5">
                Organization Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <MdOutlineCategory size={18} />
                </div>
                <select id="organizationType" name="organizationType"
                  value={form.organizationType} onChange={handleChange}
                  className={`w-full pl-10 pr-3.5 py-2.5 border rounded-xl text-sm bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all
                    ${errors.organizationType ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                  <option value="">Select organization type</option>
                  {ORG_TYPES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              {errors.organizationType && <p className="mt-1 text-xs text-red-500">{errors.organizationType}</p>}
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">About <span className="text-gray-400 text-xs font-normal">(optional)</span></label>
              <textarea name="about" rows={3} placeholder="Brief description of your organization..."
                value={form.about} onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] resize-none" />
            </div>

            {/* Phone + Email */}
            <div className="grid grid-cols-2 gap-4">
              <Field id="phone" label="Phone Number" type="tel"
                placeholder="+919876543210"
                value={form.phone} onChange={handleChange}
                error={errors.phone}
                icon={<MdOutlinePhone size={18} />} />
              <Field id="email" label="Business Email" type="email"
                placeholder="admin@company.com"
                value={form.email} onChange={handleChange}
                error={errors.email}
                icon={<MdOutlineEmail size={18} />} />
            </div>

            {/* GST + Website */}
            <div className="grid grid-cols-2 gap-4">
              <Field id="gstNumber" label="GST Number"
                placeholder="22AAAAA0000A1Z5"
                value={form.gstNumber} onChange={handleChange}
                error={errors.gstNumber} required={false}
                icon={<MdOutlineReceiptLong size={18} />} />
              <Field id="website" label="Website" type="url"
                placeholder="https://yourcompany.com"
                value={form.website} onChange={handleChange}
                error={errors.website} required={false}
                icon={<MdOutlineLanguage size={18} />} />
            </div>

            {/* Address Line 1 */}
            <Field id="addressLine1" label="Address Line 1"
              placeholder="123 Business Park, Sector 5"
              value={form.addressLine1} onChange={handleChange}
              error={errors.addressLine1}
              icon={<MdOutlineLocationOn size={18} />} />

            {/* Address Line 2 */}
            <Field id="addressLine2" label="Address Line 2"
              placeholder="Near Metro Station (optional)"
              value={form.addressLine2} onChange={handleChange}
              error={errors.addressLine2} required={false}
              icon={<MdOutlineLocationOn size={18} />} />

            {/* City + State */}
            <div className="grid grid-cols-2 gap-4">
              <Field id="city" label="City"
                placeholder="Noida"
                value={form.city} onChange={handleChange}
                error={errors.city}
                icon={<MdOutlineMap size={18} />} />
              <Field id="state" label="State"
                placeholder="Uttar Pradesh"
                value={form.state} onChange={handleChange}
                error={errors.state}
                icon={<MdOutlineMap size={18} />} />
            </div>

            {/* Country + Pincode */}
            <div className="grid grid-cols-2 gap-4">
              <Field id="country" label="Country"
                placeholder="India"
                value={form.country} onChange={handleChange}
                error={errors.country}
                icon={<MdOutlineMap size={18} />} />
              <Field id="pincode" label="Pincode"
                placeholder="201301"
                value={form.pincode} onChange={handleChange}
                error={errors.pincode}
                icon={<MdOutlinePinDrop size={18} />} />
            </div>

            {/* Logo upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Organization Logo <span className="text-gray-400 text-xs font-normal">(optional — JPEG/PNG, max 5MB)</span>
              </label>
              <div className="flex items-center gap-4">
                {logoPreview && (
                  <img src={logoPreview} alt="Logo preview"
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200 shadow-sm" />
                )}
                <button type="button"
                  onClick={() => logoRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <MdOutlineImage size={18} className="text-gray-400" />
                  {logoFile ? logoFile.name : 'Choose Logo'}
                </button>
                <input ref={logoRef} type="file" accept="image/jpeg,image/png"
                  onChange={handleLogo} className="hidden" />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-3.5 rounded-xl
                flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg
                active:scale-[0.98] text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading
                ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating Organization...</>
                : <> Create Organization <MdArrowForward size={20} /></>
              }
            </button>

            <p className="text-center text-sm text-gray-400">
              Already have an organization?{' '}
              <button type="button" onClick={() => navigate('/admin')}
                className="text-[#4285F4] hover:underline font-medium">
                Go to Dashboard
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgRegistration;

