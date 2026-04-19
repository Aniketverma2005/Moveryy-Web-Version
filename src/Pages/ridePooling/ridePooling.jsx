import { useNavigate } from 'react-router-dom';
import {
    MdArrowForward, MdOutlineNotifications, MdOutlineGpsFixed,
    MdOutlineTrendingUp, MdOutlineHeadsetMic, MdLocalShipping,
    MdStar, MdFlashOn, MdShield,
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
                @keyframes float1 {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-18px); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-12px) translateX(8px); }
                    66% { transform: translateY(8px) translateX(-6px); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-ring {
                    0%   { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `}</style>

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="Moveryy" className="h-8 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/login')} className="text-sm text-gray-700 hover:text-[#4285F4] font-medium transition-colors">
                        Sign In
                    </button>
                    <button onClick={() => navigate('/signup')} className="bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-semibold px-5 py-2 rounded-lg shadow transition-all active:scale-95">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Body — tiny white border around the two-panel card ── */}
            <div className="flex-1 flex items-center justify-center p-3">
                <div className="w-[96%] h-[calc(100vh-3.5rem-1.5rem)] flex rounded-2xl overflow-hidden shadow-2xl">

                    {/* ── LEFT — Blue-600 panel ──────────────────────── */}
                    <div className="w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-between p-10">

                        {/* Animated blobs */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-20"
                                style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'float1 7s ease-in-out infinite' }} />
                            <div className="absolute bottom-20 -left-12 w-56 h-56 rounded-full opacity-15"
                                style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', animation: 'float2 9s ease-in-out infinite' }} />
                            <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full opacity-10"
                                style={{ background: 'radial-gradient(circle, #dbeafe, transparent)', animation: 'float1 11s ease-in-out infinite reverse' }} />
                            <div className="absolute inset-0 opacity-[0.06]"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                        </div>

                        {/* Top — heading only, no logo */}
                        <div className="relative z-10" style={{ animation: 'fadeSlideUp 0.4s ease both' }}>
                            <h1 className="text-6xl font-extrabold text-white leading-tight mb-5">
                                Fast, Reliable<br />
                                <span className="text-blue-200">Delivery Management</span>
                            </h1>
                            <p className="text-blue-100 text-base leading-relaxed mb-8 opacity-90 max-w-sm">
                                Join thousands of delivery professionals using Moveryy to streamline their logistics and grow their business.
                            </p>

                            {/* Feature bullets */}
                            <div className="space-y-4" style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
                                {[
                                    { icon: <MdFlashOn size={15} />, text: 'Real-time tracking and updates' },
                                    { icon: <MdOutlineGpsFixed size={15} />, text: 'Optimize your routes and save time' },
                                    { icon: <MdShield size={15} />, text: 'Grow your delivery business with us' },
                                ].map(({ icon, text }) => (
                                    <div key={text} className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                                            {icon}
                                        </div>
                                        <span className="text-blue-100 text-sm font-medium">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom — stats + pulsing truck */}
                        <div className="relative z-10" style={{ animation: 'fadeSlideUp 0.8s ease both' }}>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <MdLocalShipping size={22} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-white/40"
                                        style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => <MdStar key={i} size={14} className="text-yellow-300" />)}
                                    <span className="text-white text-xs ml-1 opacity-80">Top rated platform</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {stats.map(({ value, label }) => (
                                    <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
                                        <p className="text-white font-extrabold text-xl leading-none">{value}</p>
                                        <p className="text-blue-200 text-xs mt-1.5 opacity-80">{label}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-blue-300 text-xs mt-5 opacity-60 text-center">
                                Trusted by 500+ delivery partners worldwide
                            </p>
                        </div>
                    </div>

                    {/* ── RIGHT — Signup info panel ──────────────────── */}
                    <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10 overflow-y-auto">
                        <div className="w-full max-w-lg">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Ready to start earning?</h2>
                            <p className="text-gray-500 text-sm mb-10 leading-relaxed">
                                Complete your driver profile and vehicle registration to unlock all features and start accepting deliveries.
                            </p>

                            {/* Steps */}
                            <div className="space-y-6 mb-10">
                                {steps.map((step) => (
                                    <div key={step.number} className="flex items-start gap-5 group cursor-default">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#4285F4] group-hover:border-[#4285F4] transition-all duration-200">
                                            <span className="text-base font-bold text-[#4285F4] group-hover:text-white transition-colors">{step.number}</span>
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">{step.title}</p>
                                            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={() => navigate('/signup/business')}
                                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] mb-4 text-base"
                            >
                                Create Driver Account
                                <MdArrowForward size={22} />
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 font-medium py-3.5 rounded-xl text-sm transition-all hover:bg-gray-100"
                            >
                                Already a driver? Sign In
                            </button>

                            {/* Features */}
                            <div className="mt-10 pt-6 border-t border-gray-200">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Available Features</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {features.map((f) => (
                                        <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                                            {f.icon}
                                            <span className="text-sm font-medium text-gray-600">{f.label}</span>
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
