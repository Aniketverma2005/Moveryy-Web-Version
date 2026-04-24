import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdArrowForward, MdOutlineBusiness, MdOutlineLocationOn, MdOutlineReceiptLong, MdOutlineCategory } from 'react-icons/md';
import { adminService } from '../../services/adminService';
import { setOrganization } from '../../features/users/usersSlice';
import logo from '../../assets/logo2.png';

// ── Field ─────────────────────────────────────────────────────────────────────
const Field = ({ label, id, type = 'text', placeholder, value, onChange, error, required = true, icon }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {icon}
                </div>
            )}
            <input
                id={id} name={id} type={type} placeholder={placeholder}
                value={value} onChange={onChange}
                className={`w-full ${icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5 border rounded-xl text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all
                    ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
            />
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

// ── Industry options ──────────────────────────────────────────────────────────
const INDUSTRIES = [
    'Logistics & Delivery',
    'E-Commerce',
    'Retail',
    'Manufacturing',
    'Healthcare',
    'Food & Beverage',
    'Construction',
    'Technology',
    'Other',
];

// ── Main ──────────────────────────────────────────────────────────────────────
const OrgRegistration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        businessAddress: '',
        taxId: '',
        industryType: '',
        phone: '',
        email: '',
        website: '',
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
        if (apiError) setApiError('');
    };

    const validate = () => {
        const err = {};
        if (!form.name.trim()) err.name = 'Organization name is required';
        if (!form.businessAddress.trim()) err.businessAddress = 'Business address is required';
        if (!form.taxId.trim()) err.taxId = 'Tax ID is required';
        if (!form.industryType) err.industryType = 'Please select an industry type';
        if (!form.phone.trim()) err.phone = 'Phone number is required';
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            err.email = 'Valid email required';
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setApiError('');
        try {
            const org = await adminService.createOrganization(form);
            // Update Redux state
            dispatch(setOrganization(org));
            // Also update localStorage user
            const stored = localStorage.getItem('moveryy_user');
            if (stored) {
                const user = JSON.parse(stored);
                user.hasOrganization = true;
                user.organizationId = org?.id ?? org?._id;
                localStorage.setItem('moveryy_user', JSON.stringify(user));
            }
            navigate('/admin');
        } catch (err) {
            setApiError(err?.message || 'Failed to create organization. Please try again.');
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

            {/* ── LEFT — Blue panel ──────────────────────────────────── */}
            <div className="w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-between p-12">

                {/* Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-[0.12]"
                        style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'blob-float 10s ease-in-out infinite' }} />
                    <div className="absolute bottom-12 -left-10 w-48 h-48 rounded-full opacity-[0.08]"
                        style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', animation: 'blob-float 14s ease-in-out infinite reverse' }} />
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>

                {/* Top */}
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
                        {[
                            'Manage your delivery fleet',
                            'Track employee performance',
                            'Access real-time analytics',
                            'Create and manage offers',
                        ].map((text) => (
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

                <p className="relative z-10 text-blue-300 text-sm opacity-60">
                    Trusted by 500+ delivery partners worldwide
                </p>
            </div>

            {/* ── RIGHT — Form ────────────────────────────────────────── */}
            <div className="w-1/2 bg-white flex items-center justify-center p-12 overflow-y-auto">
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
                        <Field
                            id="name" label="Organization Name"
                            placeholder="Moveryy Logistics Pvt. Ltd."
                            value={form.name} onChange={handleChange} error={errors.name}
                            icon={<MdOutlineBusiness size={18} />}
                        />

                        {/* Business Address */}
                        <Field
                            id="businessAddress" label="Business Address"
                            placeholder="123 Business Park, Sector 5, Noida, UP 201301"
                            value={form.businessAddress} onChange={handleChange} error={errors.businessAddress}
                            icon={<MdOutlineLocationOn size={18} />}
                        />

                        {/* Tax ID */}
                        <Field
                            id="taxId" label="Tax ID / GST Number"
                            placeholder="22AAAAA0000A1Z5"
                            value={form.taxId} onChange={handleChange} error={errors.taxId}
                            icon={<MdOutlineReceiptLong size={18} />}
                        />

                        {/* Industry Type */}
                        <div>
                            <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1.5">
                                Industry Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <MdOutlineCategory size={18} />
                                </div>
                                <select
                                    id="industryType" name="industryType"
                                    value={form.industryType} onChange={handleChange}
                                    className={`w-full pl-10 pr-3.5 py-2.5 border rounded-xl text-sm bg-white
                                        focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all
                                        ${errors.industryType ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                                >
                                    <option value="">Select industry type</option>
                                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>
                            {errors.industryType && <p className="mt-1 text-xs text-red-500">{errors.industryType}</p>}
                        </div>

                        {/* Phone + Email */}
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                id="phone" label="Phone Number" type="tel"
                                placeholder="+919876543210"
                                value={form.phone} onChange={handleChange} error={errors.phone}
                            />
                            <Field
                                id="email" label="Business Email" type="email"
                                placeholder="admin@company.com"
                                value={form.email} onChange={handleChange} error={errors.email}
                                required={false}
                            />
                        </div>

                        {/* Website (optional) */}
                        <Field
                            id="website" label="Website" type="url"
                            placeholder="https://www.yourcompany.com"
                            value={form.website} onChange={handleChange} error={errors.website}
                            required={false}
                        />

                        {/* Submit */}
                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-3.5 rounded-xl
                                flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg
                                active:scale-[0.98] text-base disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? 'Creating Organization...' : 'Create Organization'}
                            {!loading && <MdArrowForward size={20} />}
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
