import { useNavigate } from 'react-router-dom';
import {
    MdArrowForward,
    MdOutlineNotifications,
    MdOutlineGpsFixed,
    MdOutlineTrendingUp,
    MdOutlineHeadsetMic,
    MdLocalShipping,
    MdStar,
    MdFlashOn,
    MdShield,
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
        <div className="min-h-screen flex flex-col font-sans">

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
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

            {/* ── Main ───────────────────────────────────────────────── */}
            <main className="flex flex-1">

                {/* ── Left — White bg with centered blue-600 square card ── */}
                <div className="hidden lg:flex w-[480px] flex-shrink-0 bg-white items-center justify-center p-8">

                    {/* CSS animations */}
                    <style>{`
                        @keyframes float1 {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-14px); }
                        }
                        @keyframes float2 {
                            0%, 100% { transform: translateY(0px) translateX(0px); }
                            33% { transform: translateY(-10px) translateX(6px); }
                            66% { transform: translateY(6px) translateX(-5px); }
                        }
                        @keyframes fadeSlideUp {
                            from { opacity: 0; transform: translateY(16px); }
                            to   { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes pulse-ring {
                            0%   { transform: scale(1); opacity: 0.5; }
                            100% { transform: scale(1.9); opacity: 0; }
                        }
                    `}</style>

                    {/* ── Blue-600 square card ── */}
                    <div className="relative w-full aspect-square max-w-[380px] bg-blue-600 rounded-2xl overflow-hidden flex flex-col justify-between p-8 shadow-2xl">

                        {/* Animated background blobs inside card */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20"
                                style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'float1 7s ease-in-out infinite' }} />
                            <div className="absolute bottom-10 -left-8 w-36 h-36 rounded-full opacity-15"
                                style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', animation: 'float2 9s ease-in-out infinite' }} />
                            <div className="absolute inset-0 opacity-5"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        </div>

                        {/* Top — Logo inside card */}
                        <div className="relative z-10">
                            <div className="bg-white rounded-xl p-3 inline-block shadow-md mb-6">
                                <img src={logo} alt="Moveryy" className="h-10 w-auto object-contain" />
                            </div>

                            {/* Heading */}
                            <h1 className="text-2xl font-extrabold text-white leading-tight mb-3"
                                style={{ animation: 'fadeSlideUp 0.5s ease both' }}>
                                Fast, Reliable<br />
                                <span className="text-blue-200">Delivery Management</span>
                            </h1>
                            <p className="text-blue-100 text-xs leading-relaxed mb-5 opacity-90"
                                style={{ animation: 'fadeSlideUp 0.65s ease both' }}>
                                Join thousands of delivery professionals using Moveryy to grow their business.
                            </p>

                            {/* Feature bullets */}
                            <div className="space-y-2.5" style={{ animation: 'fadeSlideUp 0.8s ease both' }}>
                                {[
                                    { icon: <MdFlashOn size={13} />, text: 'Real-time tracking and updates' },
                                    { icon: <MdOutlineGpsFixed size={13} />, text: 'Optimize your routes and save time' },
                                    { icon: <MdShield size={13} />, text: 'Grow your delivery business with us' },
                                ].map(({ icon, text }) => (
                                    <div key={text} className="flex items-center gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                                            {icon}
                                        </div>
                                        <span className="text-blue-100 text-xs font-medium">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom — Stats + truck */}
                        <div className="relative z-10">
                            {/* Pulsing truck */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="relative">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                        <MdLocalShipping size={18} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-white/40"
                                        style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                                </div>
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map(i => <MdStar key={i} size={12} className="text-yellow-300" />)}
                                    <span className="text-white text-xs ml-1 opacity-75">Top rated</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2">
                                {stats.map(({ value, label }) => (
                                    <div key={label} className="bg-white/15 backdrop-blur-sm rounded-xl p-2.5 border border-white/10 text-center">
                                        <p className="text-white font-extrabold text-base leading-none">{value}</p>
                                        <p className="text-blue-200 text-[10px] mt-1 opacity-80">{label}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-blue-300 text-[10px] mt-4 opacity-60 text-center">
                                Trusted by 500+ delivery partners worldwide
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Right — Form Panel ──────────────────────────────── */}
                <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Ready to start earning?</h2>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                            Complete your driver profile and vehicle registration to unlock all features and start accepting deliveries.
                        </p>

                        {/* Steps */}
                        <div className="space-y-5 mb-8">
                            {steps.map((step) => (
                                <div key={step.number} className="flex items-start gap-4 group cursor-default">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#4285F4] group-hover:border-[#4285F4] transition-all duration-200">
                                        <span className="text-sm font-bold text-[#4285F4] group-hover:text-white transition-colors">{step.number}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <button
                            onClick={() => navigate('/signup/business')}
                            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] mb-3"
                        >
                            Create Driver Account
                            <MdArrowForward size={20} />
                        </button>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 font-medium py-3 rounded-xl text-sm transition-all hover:bg-gray-50"
                        >
                            Already a driver? Sign In
                        </button>

                        {/* Features */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Available Features</p>
                            <div className="grid grid-cols-2 gap-3">
                                {features.map((f) => (
                                    <div key={f.label} className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors">
                                        {f.icon}
                                        <span className="text-xs font-medium text-gray-600">{f.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RidePooling;
