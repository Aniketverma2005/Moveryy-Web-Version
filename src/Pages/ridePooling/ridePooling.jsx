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
        { value: '₹45K', label: 'Avg Monthly Earn' },
        { value: '4.9★', label: 'Driver Rating' },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans">

            {/* ── Navbar ─────────────────────────────────────────────────── */}
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

            {/* ── Main ───────────────────────────────────────────────────── */}
            <main className="flex flex-1">

                {/* ── Left — Dark Blue Animated Panel ──────────────────── */}
                <div className="hidden lg:flex w-[480px] flex-shrink-0 relative overflow-hidden flex-col justify-between p-10"
                    style={{ background: 'linear-gradient(160deg, #0d1b4b 0%, #1a3a8f 45%, #2952c4 100%)' }}>

                    {/* Animated background blobs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {/* Large slow-rotating circle */}
                        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10"
                            style={{ background: 'radial-gradient(circle, #60a5fa, transparent)', animation: 'spin 20s linear infinite' }} />
                        {/* Floating orb 1 */}
                        <div className="absolute top-1/4 right-8 w-24 h-24 rounded-full opacity-20"
                            style={{ background: '#4285F4', animation: 'float1 6s ease-in-out infinite' }} />
                        {/* Floating orb 2 */}
                        <div className="absolute bottom-1/3 left-8 w-16 h-16 rounded-full opacity-15"
                            style={{ background: '#60a5fa', animation: 'float2 8s ease-in-out infinite' }} />
                        {/* Floating orb 3 */}
                        <div className="absolute bottom-16 right-16 w-32 h-32 rounded-full opacity-10"
                            style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'float1 10s ease-in-out infinite reverse' }} />
                        {/* Grid dots pattern */}
                        <div className="absolute inset-0 opacity-5"
                            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                    </div>

                    {/* CSS keyframes injected inline */}
                    <style>{`
                        @keyframes float1 {
                            0%, 100% { transform: translateY(0px) scale(1); }
                            50% { transform: translateY(-20px) scale(1.05); }
                        }
                        @keyframes float2 {
                            0%, 100% { transform: translateY(0px) translateX(0px); }
                            33% { transform: translateY(-14px) translateX(8px); }
                            66% { transform: translateY(8px) translateX(-6px); }
                        }
                        @keyframes fadeSlideUp {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                        @keyframes pulse-ring {
                            0% { transform: scale(1); opacity: 0.6; }
                            100% { transform: scale(1.8); opacity: 0; }
                        }
                    `}</style>

                    {/* Logo */}
                    <div className="relative z-10">
                        <div className="bg-white rounded-xl p-3 inline-flex items-center gap-3 shadow-lg mb-10">
                            <img src={logo} alt="Moveryy" className="h-10 w-auto object-contain" />
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold text-white leading-tight mb-4"
                            style={{ animation: 'fadeSlideUp 0.6s ease both' }}>
                            Fast, Reliable<br />
                            <span className="text-blue-300">Delivery Management</span>
                        </h1>
                        <p className="text-blue-100 text-base opacity-85 mb-10 leading-relaxed"
                            style={{ animation: 'fadeSlideUp 0.7s ease both' }}>
                            Join thousands of delivery professionals using Moveryy to streamline their logistics and grow their business.
                        </p>

                        {/* Feature bullets */}
                        <div className="space-y-4" style={{ animation: 'fadeSlideUp 0.8s ease both' }}>
                            {[
                                { icon: <MdFlashOn size={16} />, text: 'Real-time tracking and updates' },
                                { icon: <MdOutlineGpsFixed size={16} />, text: 'Optimize your routes and save time' },
                                { icon: <MdShield size={16} />, text: 'Grow your delivery business with us' },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                                        {icon}
                                    </div>
                                    <span className="text-blue-100 text-sm font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="relative z-10">
                        {/* Floating truck icon */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <MdLocalShipping size={22} className="text-white" />
                                </div>
                                <div className="absolute inset-0 rounded-full border-2 border-white/30"
                                    style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                            </div>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <MdStar key={i} size={14} className="text-yellow-400" />
                                ))}
                                <span className="text-white text-xs ml-1 opacity-80">Top rated platform</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {stats.map(({ value, label }) => (
                                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                    <p className="text-white font-extrabold text-lg leading-none">{value}</p>
                                    <p className="text-blue-200 text-xs mt-1 opacity-80">{label}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-blue-300 text-xs mt-6 opacity-60">Trusted by 500+ delivery partners worldwide</p>
                    </div>
                </div>

                {/* ── Right — Form Panel ────────────────────────────────── */}
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

                        {/* Features grid */}
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
