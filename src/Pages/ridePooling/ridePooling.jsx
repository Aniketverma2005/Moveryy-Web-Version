import { useNavigate } from 'react-router-dom';
import {
    MdArrowForward, MdOutlineNotifications, MdOutlineGpsFixed,
    MdOutlineTrendingUp, MdOutlineHeadsetMic, MdLocalShipping,
    MdStar, MdFlashOn, MdShield, MdCheckCircle,
} from 'react-icons/md';
import logo from '../../assets/logo2.png';

const RidePooling = () => {
    const navigate = useNavigate();

    const steps = [
        { number: 1, title: 'Driver Registration', description: 'Complete your profile with personal and license information' },
        { number: 2, title: 'Vehicle Details', description: 'Add your vehicle information and documentation' },
        { number: 3, title: 'Start Earning', description: 'Access your dashboard and start accepting deliveries' },
    ];

    const features = [
        { icon: <MdOutlineNotifications size={18} className="text-[#4285F4]" />, label: 'Instant Notifications' },
        { icon: <MdOutlineTrendingUp size={18} className="text-[#4285F4]" />, label: 'Earnings Analytics' },
        { icon: <MdOutlineGpsFixed size={18} className="text-[#4285F4]" />, label: 'GPS Navigation' },
        { icon: <MdOutlineHeadsetMic size={18} className="text-[#4285F4]" />, label: '24/7 Support' },
    ];

    const stats = [
        { value: '500+', label: 'Active Drivers' },
        { value: '₹45K', label: 'Avg Monthly' },
        { value: '4.9★', label: 'Rating' },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <style>{`
                /* Subtle fade-up — only used once on load */
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                /* Gentle pulse ring on truck */
                @keyframes pulse-ring {
                    0%   { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2); opacity: 0; }
                }
                /* Slow float for background blobs */
                @keyframes blob-float {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-14px); }
                }
                /* Bounce arrow on CTA */
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50%      { transform: translateX(4px); }
                }
                .fade-up   { animation: fadeUp 0.6s ease both; }
                .fade-up-2 { animation: fadeUp 0.6s 0.1s ease both; }
                .fade-up-3 { animation: fadeUp 0.6s 0.2s ease both; }
                .fade-up-4 { animation: fadeUp 0.6s 0.3s ease both; }
                .bounce-arrow { animation: bounce-x 1.4s ease-in-out infinite; }
            `}</style>

            {/* ── Navbar — stable, no animation ──────────────────────── */}
            <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-10 flex-shrink-0">
                <div className="cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="Moveryy" className="h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-gray-600 hover:text-[#4285F4] font-medium transition-colors duration-200"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Body ───────────────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-[95%] h-[calc(100vh-4rem-2rem)] flex rounded-2xl overflow-hidden shadow-xl">

                    {/* ══ LEFT — Blue panel ══════════════════════════════ */}
                    <div className="w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-between p-12">

                        {/* Subtle background blobs — slow, not distracting */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-[0.12]"
                                style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'blob-float 10s ease-in-out infinite' }} />
                            <div className="absolute bottom-12 -left-10 w-48 h-48 rounded-full opacity-[0.08]"
                                style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', animation: 'blob-float 14s ease-in-out infinite reverse' }} />
                            {/* Dot grid */}
                            <div className="absolute inset-0 opacity-[0.04]"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                        </div>

                        {/* Top content */}
                        <div className="relative z-10">
                            <h1 className="text-6xl font-bold text-white leading-snug mb-5 fade-up">
                                Fast, Reliable<br />
                                <span className="text-blue-200 font-extrabold">Delivery Management</span>
                            </h1>
                            <p className="text-blue-100 text-lg leading-relaxed mb-10 opacity-85 max-w-xs fade-up-2">
                                Join thousands of delivery professionals using Moveryy to streamline logistics and grow their business.
                            </p>

                            {/* Feature bullets */}
                            <div className="space-y-5 fade-up-3">
                                {[
                                    { icon: <MdFlashOn size={17} />, text: 'Real-time tracking and updates' },
                                    { icon: <MdOutlineGpsFixed size={17} />, text: 'Optimize your routes and save time' },
                                    { icon: <MdShield size={17} />, text: 'Grow your delivery business with us' },
                                ].map(({ icon, text }) => (
                                    <div key={text} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                                            {icon}
                                        </div>
                                        <span className="text-blue-100 text-base">{text}</span>
                                        <MdCheckCircle size={15} className="text-blue-300 ml-auto opacity-60" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom — pulsing truck + stats */}
                        <div className="relative z-10 fade-up-4">
                            {/* Truck with single pulse ring */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
                                        <MdLocalShipping size={22} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border border-white/40"
                                        style={{ animation: 'pulse-ring 2.5s ease-out infinite' }} />
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <MdStar key={i} size={13} className="text-yellow-300" />
                                    ))}
                                    <span className="text-white text-sm ml-2 opacity-75">Top rated platform</span>
                                </div>
                            </div>

                            {/* Stat cards */}
                            <div className="grid grid-cols-3 gap-3">
                                {stats.map(({ value, label }) => (
                                    <div key={label}
                                        className="bg-white/10 rounded-xl p-4 border border-white/10 text-center hover:bg-white/20 transition-colors duration-300">
                                        <p className="text-white font-bold text-2xl leading-none">{value}</p>
                                        <p className="text-blue-200 text-sm mt-2 opacity-75">{label}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-blue-300 text-sm mt-5 opacity-50 text-center">
                                Trusted by 500+ delivery partners worldwide
                            </p>
                        </div>
                    </div>

                    {/* ══ RIGHT — Signup panel ═══════════════════════════ */}
                    <div className="w-1/2 bg-white flex items-center justify-center p-12 overflow-y-auto">
                        <div className="w-full max-w-md">

                            <h2 className="text-3xl font-bold text-gray-900 mb-2 fade-up">
                                Ready to start earning?
                            </h2>
                            <p className="text-gray-400 text-base mb-10 leading-relaxed fade-up-2">
                                Complete your driver profile and vehicle registration to unlock all features and start accepting deliveries.
                            </p>

                            {/* Steps */}
                            <div className="space-y-4 mb-10 fade-up-3">
                                {steps.map((step) => (
                                    <div key={step.number}
                                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#4285F4] group-hover:border-[#4285F4] transition-all duration-300">
                                            <span className="text-base font-bold text-[#4285F4] group-hover:text-white transition-colors">{step.number}</span>
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <p className="text-base font-semibold text-gray-800 group-hover:text-[#4285F4] transition-colors duration-200">{step.title}</p>
                                            <p className="text-sm text-gray-400 mt-1 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => navigate('/signup/business')}
                                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg mb-3 fade-up-4 text-base"
                            >
                                Create Driver Account
                                <span className="bounce-arrow"><MdArrowForward size={22} /></span>
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full border border-gray-200 hover:border-[#4285F4] text-gray-500 hover:text-[#4285F4] font-medium py-3.5 rounded-xl text-base transition-all duration-200 hover:bg-blue-50"
                            >
                                Already a driver? Sign In
                            </button>

                            {/* Features */}
                            <div className="mt-10 pt-6 border-t border-gray-100">
                                <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">Available Features</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {features.map((f) => (
                                        <div key={f.label}
                                            className="flex items-center gap-2.5 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 cursor-default">
                                            {f.icon}
                                            <span className="text-sm font-medium text-gray-500">{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RidePooling;
