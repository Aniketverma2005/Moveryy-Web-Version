import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward, MdArrowBack, MdCheckCircle, MdOutlineDirectionsCar, MdOutlineShield, MdOutlineTrendingUp } from 'react-icons/md';
import logo from '../../assets/logo2.png';

// ── Field ─────────────────────────────────────────────────────────────────────
const Field = ({ label, id, type = 'text', placeholder, value, onChange, error, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={id} name={id} type={type} placeholder={placeholder}
            value={value} onChange={onChange}
            className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'}`}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

// ── Step indicator ────────────────────────────────────────────────────────────
const StepIndicator = ({ current }) => (
    <div className="flex items-center gap-2">
        {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${s < current ? 'bg-[#4285F4] border-[#4285F4] text-white' :
                    s === current ? 'bg-[#4285F4] border-[#4285F4] text-white' :
                        'bg-white border-gray-300 text-gray-400'
                    }`}>
                    {s < current ? <MdCheckCircle size={16} /> : s}
                </div>
                {i < 2 && <div className={`w-16 h-0.5 ${s < current ? 'bg-[#4285F4]' : 'bg-gray-200'}`} />}
            </div>
        ))}
        <span className="ml-2 text-sm text-gray-500 font-medium">Step {current} of 3</span>
    </div>
);

// ── Section heading ───────────────────────────────────────────────────────────
const SectionHeading = ({ title, subtitle }) => (
    <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>
    </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
const VehicleRegistration = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        make: '', model: '', year: '', color: '',
        licensePlate: '', vin: '', seatingCapacity: '', airConditioned: false,
        regNumber: '', regExpiry: '',
        insuranceProvider: '', policyNumber: '', policyExpiry: '', insuranceConfirm: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    };

    const validate = () => {
        const err = {};
        if (!form.make.trim()) err.make = 'Make is required';
        if (!form.model.trim()) err.model = 'Model is required';
        if (!form.year.trim()) err.year = 'Year is required';
        if (!form.color.trim()) err.color = 'Color is required';
        if (!form.licensePlate.trim()) err.licensePlate = 'License plate is required';
        if (!form.vin.trim()) err.vin = 'VIN is required';
        if (!form.seatingCapacity) err.seatingCapacity = 'Seating capacity is required';
        if (!form.regNumber.trim()) err.regNumber = 'Registration number is required';
        if (!form.regExpiry.trim()) err.regExpiry = 'Registration expiry is required';
        if (!form.insuranceProvider.trim()) err.insuranceProvider = 'Insurance provider is required';
        if (!form.policyNumber.trim()) err.policyNumber = 'Policy number is required';
        if (!form.policyExpiry.trim()) err.policyExpiry = 'Policy expiry is required';
        if (!form.insuranceConfirm) err.insuranceConfirm = 'Please confirm your insurance coverage';
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) navigate('/ride-pooling/complete');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes blob-float {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-12px); }
                }
                .fade-up { animation: fadeUp 0.4s ease both; }
            `}</style>

            {/* ── Top bar ──────────────────────────────────────────────── */}
            <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0">
                <button onClick={() => navigate('/ride-pooling/register')}
                    className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                    <MdArrowBack size={18} /> Back
                </button>
                <StepIndicator current={2} />
            </div>

            {/* ── Body ─────────────────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-[95%] h-[calc(100vh-3.5rem-2rem)] flex rounded-2xl overflow-hidden shadow-xl">

                    {/* ── LEFT — Blue panel ──────────────────────────────── */}
                    <div className="w-1/2 flex-shrink-0 bg-blue-600 relative overflow-hidden flex flex-col justify-between p-12">

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
                                Add Your Vehicle
                            </h1>
                            <p className="text-blue-100 text-lg leading-relaxed mb-10 opacity-85 max-w-sm fade-up">
                                Tell us about the vehicle you'll be using for deliveries. This helps us ensure you have the right equipment for the job.
                            </p>

                            {/* Bullets with icons */}
                            <div className="space-y-6">
                                {[
                                    { icon: <MdOutlineDirectionsCar size={20} />, title: 'Optimized Routing', desc: 'We match deliveries to your vehicle capacity' },
                                    { icon: <MdOutlineShield size={20} />, title: 'Coverage Protection', desc: 'We verify insurance for liability coverage' },
                                    { icon: <MdOutlineTrendingUp size={20} />, title: 'Earn More', desc: 'Larger vehicles unlock higher-paying deliveries' },
                                ].map(({ icon, title, desc }) => (
                                    <div key={title} className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                            {icon}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-base">{title}</p>
                                            <p className="text-blue-200 text-sm mt-0.5 opacity-80">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="relative z-10 text-blue-300 text-sm opacity-60">
                            Trusted by 500+ delivery partners worldwide
                        </p>
                    </div>

                    {/* ── RIGHT — Form ────────────────────────────────────── */}
                    <div className="w-1/2 bg-white flex items-start justify-center p-12 overflow-y-auto">
                        <div className="w-full max-w-lg fade-up">

                            {/* ── Vehicle Information ── */}
                            <SectionHeading title="Vehicle Information" subtitle="Tell us about your delivery vehicle" />

                            <div className="space-y-5 mb-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <Field id="make" label="Make (Brand)" placeholder="Toyota" value={form.make} onChange={handleChange} error={errors.make} />
                                    <Field id="model" label="Model" placeholder="Civic" value={form.model} onChange={handleChange} error={errors.model} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field id="year" label="Year" placeholder="2022" value={form.year} onChange={handleChange} error={errors.year} />
                                    <Field id="color" label="Color" placeholder="White" value={form.color} onChange={handleChange} error={errors.color} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Field id="licensePlate" label="License Plate" placeholder="ABC-1234" value={form.licensePlate} onChange={handleChange} error={errors.licensePlate} />
                                    <Field id="vin" label="VIN (Vehicle ID)" placeholder="12345ABCDE67890FG" value={form.vin} onChange={handleChange} error={errors.vin} />
                                </div>

                                {/* Seating capacity + AC */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Seating Capacity <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <select
                                            name="seatingCapacity" value={form.seatingCapacity} onChange={handleChange}
                                            className={`flex-1 px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent transition-all bg-white ${errors.seatingCapacity ? 'border-red-400' : 'border-gray-200'}`}
                                        >
                                            <option value="">Select seating capacity</option>
                                            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                                <option key={n} value={n}>{n} seats</option>
                                            ))}
                                        </select>
                                        <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
                                            <input type="checkbox" name="airConditioned" checked={form.airConditioned} onChange={handleChange}
                                                className="w-4 h-4 text-[#4285F4] border-gray-300 rounded focus:ring-[#4285F4]" />
                                            <span className="text-sm text-gray-700">Air-conditioned</span>
                                        </label>
                                    </div>
                                    {errors.seatingCapacity && <p className="mt-1 text-xs text-red-500">{errors.seatingCapacity}</p>}
                                </div>
                            </div>

                            {/* ── Registration Details ── */}
                            <div className="border-t border-gray-100 pt-8 mb-8">
                                <SectionHeading title="Registration Details" subtitle="Vehicle registration and ownership information" />
                                <div className="space-y-5">
                                    <Field id="regNumber" label="Registration Number" placeholder="REG123456789" value={form.regNumber} onChange={handleChange} error={errors.regNumber} />
                                    <Field id="regExpiry" label="Registration Expiry Date" type="date" value={form.regExpiry} onChange={handleChange} error={errors.regExpiry} />
                                </div>
                            </div>

                            {/* ── Insurance Details ── */}
                            <div className="border-t border-gray-100 pt-8 mb-8">
                                <SectionHeading title="Insurance Details" subtitle="Valid insurance coverage is required to operate" />
                                <div className="space-y-5">
                                    <Field id="insuranceProvider" label="Insurance Provider" placeholder="State Insurance" value={form.insuranceProvider} onChange={handleChange} error={errors.insuranceProvider} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field id="policyNumber" label="Policy Number" placeholder="POL123456789" value={form.policyNumber} onChange={handleChange} error={errors.policyNumber} />
                                        <Field id="policyExpiry" label="Policy Expiry Date" type="date" value={form.policyExpiry} onChange={handleChange} error={errors.policyExpiry} />
                                    </div>

                                    {/* Insurance confirm checkbox */}
                                    <div>
                                        <label className={`flex items-start gap-3 cursor-pointer p-4 rounded-xl border transition-colors ${errors.insuranceConfirm ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200'}`}>
                                            <input type="checkbox" name="insuranceConfirm" checked={form.insuranceConfirm} onChange={handleChange}
                                                className="mt-0.5 w-4 h-4 text-[#4285F4] border-gray-300 rounded focus:ring-[#4285F4] flex-shrink-0" />
                                            <span className="text-sm text-gray-700 leading-relaxed">
                                                I confirm that my insurance covers commercial delivery operations and I will provide proof of insurance upon request <span className="text-red-500">*</span>
                                            </span>
                                        </label>
                                        {errors.insuranceConfirm && <p className="mt-1 text-xs text-red-500">{errors.insuranceConfirm}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* ── Navigation ── */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                <button onClick={() => navigate('/ride-pooling/register')}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
                                    <MdArrowBack size={16} /> Back
                                </button>
                                <button onClick={handleSubmit}
                                    className="flex items-center gap-2 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm">
                                    Complete Registration
                                    <MdArrowForward size={16} />
                                </button>
                            </div>

                            <p className="text-center text-sm text-gray-400 mt-5">
                                Already have an account?{' '}
                                <button onClick={() => navigate('/login')} className="text-[#4285F4] hover:underline font-medium">
                                    Sign in instead
                                </button>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VehicleRegistration;
