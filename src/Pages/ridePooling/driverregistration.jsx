import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowForward, MdArrowBack, MdCheckCircle, MdInfo } from 'react-icons/md';
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
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${s <= current ? 'bg-[#4285F4] border-[#4285F4] text-white' : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                    {s < current ? <MdCheckCircle size={16} /> : s}
                </div>
                {i < 2 && <div className={`w-16 h-0.5 ${s < current ? 'bg-[#4285F4]' : 'bg-gray-200'}`} />}
            </div>
        ))}
        <span className="ml-2 text-sm text-gray-500 font-medium">Step {current} of 3</span>
    </div>
);

// ── Left panel data ───────────────────────────────────────────────────────────
const PANELS = [
    {
        title: 'Complete Your Profile',
        subtitle: 'Tell us about yourself so we can get you started on your journey as a delivery partner.',
        bullets: ['Secure account creation', 'Quick setup in minutes', 'Access instant notifications'],
    },
    {
        title: 'Verify Your Identity',
        subtitle: 'We need to verify your identity for safety and compliance purposes.',
        bullets: ['Privacy protected identity verification', 'Government ID required', 'License verification automatic'],
    },
    {
        title: 'Almost There!',
        subtitle: 'Confirm your details and consent requirements to complete registration.',
        bullets: ['Background check available', 'Insurance consent needed', '24/7 support available'],
    },
];

// ── Main ──────────────────────────────────────────────────────────────────────
const DriverRegistration = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [s1, setS1] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [e1, setE1] = useState({});
    const [s2, setS2] = useState({ licenseNumber: '', licenseExpiry: '', govId: '' });
    const [e2, setE2] = useState({});
    const [s3, setS3] = useState({ street: '', city: '', state: '', zip: '', bgConsent: false, insurance: false, terms: false });
    const [e3, setE3] = useState({});

    const panel = PANELS[step - 1];

    const validateStep1 = () => {
        const err = {};
        if (!s1.firstName.trim()) err.firstName = 'First name is required';
        if (!s1.lastName.trim()) err.lastName = 'Last name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) err.email = 'Valid email required';
        if (!s1.phone.trim()) err.phone = 'Phone number is required';
        if (s1.password.length < 8) err.password = 'Minimum 8 characters';
        if (s1.password !== s1.confirmPassword) err.confirmPassword = 'Passwords do not match';
        setE1(err); return Object.keys(err).length === 0;
    };
    const validateStep2 = () => {
        const err = {};
        if (!s2.licenseNumber.trim()) err.licenseNumber = 'License number is required';
        if (!s2.licenseExpiry.trim()) err.licenseExpiry = 'Expiry date is required';
        if (!s2.govId.trim()) err.govId = 'Government ID is required';
        setE2(err); return Object.keys(err).length === 0;
    };
    const validateStep3 = () => {
        const err = {};
        if (!s3.street.trim()) err.street = 'Address is required';
        if (!s3.city.trim()) err.city = 'City is required';
        if (!s3.state.trim()) err.state = 'State is required';
        if (!s3.zip.trim()) err.zip = 'Zip code is required';
        if (!s3.bgConsent) err.bgConsent = 'Please consent to background check';
        if (!s3.terms) err.terms = 'Please accept terms and conditions';
        setE3(err); return Object.keys(err).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2);
        if (step === 2 && validateStep2()) setStep(3);
        if (step === 3 && validateStep3()) navigate('/transport');
    };
    const handlePrev = () => step > 1 ? setStep(s => s - 1) : navigate('/ride-pooling');

    const h1 = (e) => setS1(p => ({ ...p, [e.target.name]: e.target.value }));
    const h2 = (e) => setS2(p => ({ ...p, [e.target.name]: e.target.value }));
    const h3 = (e) => {
        const { name, value, type, checked } = e.target;
        setS3(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
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
                <button onClick={handlePrev} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors">
                    <MdArrowBack size={18} /> Back
                </button>
                <StepIndicator current={step} />
            </div>

            {/* ── Body — same container as ridePooling ─────────────────── */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-[95%] h-[calc(100vh-3.5rem-2rem)] flex rounded-2xl overflow-hidden shadow-xl">

                    {/* ── LEFT — w-1/2 matching ridePooling exactly ──────── */}
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
                            <h1 key={step} className="text-5xl font-extrabold text-white leading-tight mb-5 fade-up">
                                {panel.title}
                            </h1>
                            <p className="text-blue-100 text-lg leading-relaxed mb-10 opacity-85 max-w-sm fade-up">
                                {panel.subtitle}
                            </p>
                            <div className="space-y-5">
                                {panel.bullets.map((text) => (
                                    <div key={text} className="flex items-center gap-3">
                                        <MdCheckCircle size={20} className="text-blue-300 flex-shrink-0" />
                                        <span className="text-blue-100 text-base">{text}</span>
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
                    <div className="w-1/2 bg-white flex items-center justify-center p-12 overflow-y-auto">
                        <div className="w-full max-w-lg">

                            {/* STEP 1 */}
                            {step === 1 && (
                                <div className="fade-up">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Driver Information</h2>
                                    <p className="text-gray-400 text-base mb-8">Let's start with your basic information</p>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field id="firstName" label="First Name" placeholder="John" value={s1.firstName} onChange={h1} error={e1.firstName} />
                                            <Field id="lastName" label="Last Name" placeholder="Doe" value={s1.lastName} onChange={h1} error={e1.lastName} />
                                        </div>
                                        <Field id="email" label="Email Address" type="email" placeholder="john@example.com" value={s1.email} onChange={h1} error={e1.email} />
                                        <Field id="phone" label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={s1.phone} onChange={h1} error={e1.phone} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Field id="password" label="Password" type="password" placeholder="••••••••" value={s1.password} onChange={h1} error={e1.password} />
                                            <Field id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" value={s1.confirmPassword} onChange={h1} error={e1.confirmPassword} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <div className="fade-up">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-1">License & ID Information</h2>
                                    <p className="text-gray-400 text-base mb-8">Please provide your driver's license and identification details</p>
                                    <div className="space-y-5">
                                        <Field id="licenseNumber" label="Driver's License Number" placeholder="DL123456789" value={s2.licenseNumber} onChange={h2} error={e2.licenseNumber} />
                                        <Field id="licenseExpiry" label="License Expiry Date" type="date" value={s2.licenseExpiry} onChange={h2} error={e2.licenseExpiry} />
                                        <Field id="govId" label="Government ID Number" placeholder="ID123456789" value={s2.govId} onChange={h2} error={e2.govId} />
                                        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                            <MdInfo size={18} className="text-[#4285F4] flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-blue-700 leading-relaxed">
                                                Your documents are encrypted and securely stored. We verify them to comply with local regulations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <div className="fade-up">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Address & Consent</h2>
                                    <p className="text-gray-400 text-base mb-8">Complete your profile and provide necessary consent</p>
                                    <div className="space-y-5">
                                        <Field id="street" label="Street Address" placeholder="123 Main Street" value={s3.street} onChange={h3} error={e3.street} />
                                        <div className="grid grid-cols-3 gap-3">
                                            <Field id="city" label="City" placeholder="New York" value={s3.city} onChange={h3} error={e3.city} />
                                            <Field id="state" label="State" placeholder="NY" value={s3.state} onChange={h3} error={e3.state} />
                                            <Field id="zip" label="Zip Code" placeholder="10001" value={s3.zip} onChange={h3} error={e3.zip} />
                                        </div>
                                        <div className="space-y-3 pt-2">
                                            {[
                                                { key: 'bgConsent', label: 'I consent to a background check and verification process', err: e3.bgConsent },
                                                { key: 'insurance', label: 'I have valid insurance coverage and will provide proof', err: null },
                                                { key: 'terms', label: null, err: e3.terms },
                                            ].map(({ key, label, err }) => (
                                                <div key={key}>
                                                    <label className="flex items-start gap-3 cursor-pointer">
                                                        <input type="checkbox" name={key} checked={s3[key]} onChange={h3}
                                                            className="mt-0.5 w-4 h-4 text-[#4285F4] border-gray-300 rounded focus:ring-[#4285F4] flex-shrink-0" />
                                                        <span className="text-sm text-gray-700 leading-relaxed">
                                                            {key === 'terms' ? (
                                                                <>I agree to the{' '}
                                                                    <a href="#" className="text-[#4285F4] hover:underline">Terms of Service</a>
                                                                    {' '}and{' '}
                                                                    <a href="#" className="text-[#4285F4] hover:underline">Privacy Policy</a>
                                                                </>
                                                            ) : label}
                                                        </span>
                                                    </label>
                                                    {err && <p className="mt-1 ml-7 text-xs text-red-500">{err}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                                <button onClick={handlePrev} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors">
                                    <MdArrowBack size={16} /> Previous
                                </button>
                                <button onClick={handleNext} className="flex items-center gap-2 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-sm">
                                    {step === 3 ? 'Continue to Vehicle Registration' : 'Next Step'}
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

export default DriverRegistration;
