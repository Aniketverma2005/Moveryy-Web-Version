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
                /* ── Floating blobs ── */
                @keyframes float1 {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-22px) scale(1.04); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    33% { transform: translateY(-14px) translateX(10px); }
                    66% { transform: translateY(10px) translateX(-8px); }
                }
                @keyframes float3 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(8deg); }
                }

                /* ── Entrance animations ── */
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(22px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeSlideLeft {
                    from { opacity: 0; transform: translateX(30px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }

                /* ── Pulse rings ── */
                @keyframes pulse-ring {
                    0%   { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes pulse-ring2 {
                    0%   { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(2.8); opacity: 0; }
                }

                /* ── Rotating ring ── */
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                /* ── Bounce arrow ── */
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }

                /* ── Step number pop ── */
                @keyframes popIn {
                    0%   { transform: scale(0.5); opacity: 0; }
                    70%  { transform: scale(1.15); }
                    100% { transform: scale(1); opacity: 1; }
                }

                /* ── Glow pulse on CTA button ── */
                @keyframes glow-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(66,133,244,0.5); }
                    50%      { box-shadow: 0 0 0 12px rgba(66,133,244,0); }
                }

                /* ── Typing cursor blink ── */
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50%      { opacity: 0; }
                }

                /* ── Logo truck drive across navbar ── */
                @keyframes drive-across {
                    0%   { transform: translateX(-120px); opacity: 0; }
                    15%  { opacity: 1; }
                    80%  { transform: translateX(0px); opacity: 1; }
                    100% { transform: translateX(0px); opacity: 1; }
                }

                /* ── Buttons pop in from right ── */
                @keyframes pop-from-right {
                    0%   { transform: translateX(60px) scale(0.8); opacity: 0; }
                    70%  { transform: translateX(-4px) scale(1.05); opacity: 1; }
                    100% { transform: translateX(0) scale(1); opacity: 1; }
                }

                .animate-fadeSlideUp-1 { animation: fadeSlideUp 0.5s ease both; }
                .animate-fadeSlideUp-2 { animation: fadeSlideUp 0.65s 0.1s ease both; }
                .animate-fadeSlideUp-3 { animation: fadeSlideUp 0.7s 0.2s ease both; }
                .animate-fadeSlideUp-4 { animation: fadeSlideUp 0.8s 0.3s ease both; }
                .animate-fadeSlideLeft-1 { animation: fadeSlideLeft 0.5s 0.1s ease both; }
                .animate-fadeSlideLeft-2 { animation: fadeSlideLeft 0.55s 0.2s ease both; }
                .animate-fadeSlideLeft-3 { animation: fadeSlideLeft 0.6s 0.3s ease both; }
                .animate-fadeSlideLeft-4 { animation: fadeSlideLeft 0.65s 0.4s ease both; }
                .animate-fadeIn { animation: fadeIn 0.8s 0.5s ease both; }
                .bounce-arrow { animation: bounce-x 1.2s ease-in-out infinite; }
                .glow-btn { animation: glow-pulse 2s ease-in-out infinite; }
                .logo-drive { animation: drive-across 1.2s cubic-bezier(0.22,1,0.36,1) both; }
                .btn-pop-1 { animation: pop-from-right 0.5s 1.0s cubic-bezier(0.22,1,0.36,1) both; }
                .btn-pop-2 { animation: pop-from-right 0.5s 1.15s cubic-bezier(0.22,1,0.36,1) both; }
            `}</style>

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm overflow-hidden">
                {/* Logo drives in from left → settles top-left */}
                <div className="logo-drive flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="Moveryy" className="h-10 w-auto object-contain" />
                </div>
                {/* Buttons pop in from right */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="btn-pop-1 text-sm text-gray-700 hover:text-[#4285F4] font-medium transition-colors"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="btn-pop-2 bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-semibold px-5 py-2 rounded-lg shadow transition-all active:scale-95"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Body ───────────────────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center p-3">
                <div className="w-[96%] h-[calc(100vh-4rem-1.5rem)] flex rounded-2xl overflow-hidden shadow-2xl">

                    {/* ══════════════════════════════════════════════════
                        LEFT — Blue-600 animated panel
                    ══════════════════════════════════════════════════ */}
                    <div className="w-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-between p-10">

                        {/* ── Background layer animations ── */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {/* Large slow blob top-right */}
                            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
                                style={{ background: 'radial-gradient(circle, #93c5fd, transparent)', animation: 'float1 8s ease-in-out infinite' }} />
                            {/* Medium blob bottom-left */}
                            <div className="absolute bottom-16 -left-16 w-64 h-64 rounded-full opacity-15"
                                style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)', animation: 'float2 10s ease-in-out infinite' }} />
                            {/* Small blob center */}
                            <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-10"
                                style={{ background: 'radial-gradient(circle, #dbeafe, transparent)', animation: 'float3 6s ease-in-out infinite' }} />
                            {/* Rotating ring decoration */}
                            <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-white/10 opacity-30"
                                style={{ animation: 'spin-slow 20s linear infinite' }} />
                            <div className="absolute top-8 right-8 w-36 h-36 rounded-full border border-white/5 opacity-20"
                                style={{ animation: 'spin-slow 30s linear infinite reverse', marginTop: '-6px', marginRight: '-6px' }} />
                            {/* Dot grid */}
                            <div className="absolute inset-0 opacity-[0.06]"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                        </div>

                        {/* ── Top content ── */}
                        <div className="relative z-10">
                            <h1 className="text-6xl font-extrabold text-white leading-tight mb-5 animate-fadeSlideUp-1">
                                Fast, Reliable<br />
                                <span className="text-blue-200">
                                    Delivery Management
                                    <span style={{ animation: 'blink 1s step-end infinite', marginLeft: '2px' }}></span>
                                </span>
                            </h1>
                            <p className="text-blue-100 text-base leading-relaxed mb-8 opacity-90 max-w-sm animate-fadeSlideUp-2">
                                Join thousands of delivery professionals using Moveryy to streamline their logistics and grow their business.
                            </p>

                            {/* Feature bullets — staggered entrance */}
                            <div className="space-y-4">
                                {[
                                    { icon: <MdFlashOn size={15} />, text: 'Real-time tracking and updates', delay: '0.3s' },
                                    { icon: <MdOutlineGpsFixed size={15} />, text: 'Optimize your routes and save time', delay: '0.45s' },
                                    { icon: <MdShield size={15} />, text: 'Grow your delivery business with us', delay: '0.6s' },
                                ].map(({ icon, text, delay }) => (
                                    <div key={text} className="flex items-center gap-3"
                                        style={{ animation: `fadeSlideUp 0.6s ${delay} ease both` }}>
                                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0 hover:bg-white/30 transition-colors">
                                            {icon}
                                        </div>
                                        <span className="text-blue-100 text-sm font-medium">{text}</span>
                                        <MdCheckCircle size={14} className="text-blue-300 ml-auto opacity-70" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Bottom — stats + pulsing truck ── */}
                        <div className="relative z-10 animate-fadeSlideUp-4">
                            {/* Pulsing truck with double ring */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center z-10 relative">
                                        <MdLocalShipping size={24} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full border-2 border-white/50"
                                        style={{ animation: 'pulse-ring 2s ease-out infinite' }} />
                                    <div className="absolute inset-0 rounded-full border border-white/30"
                                        style={{ animation: 'pulse-ring2 2s 0.5s ease-out infinite' }} />
                                </div>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <MdStar key={i} size={14} className="text-yellow-300"
                                            style={{ animation: `popIn 0.4s ${0.1 * i}s ease both` }} />
                                    ))}
                                    <span className="text-white text-xs ml-1 opacity-80">Top rated platform</span>
                                </div>
                            </div>

                            {/* Stat cards with shimmer */}
                            <div className="grid grid-cols-3 gap-3">
                                {stats.map(({ value, label }, i) => (
                                    <div key={label}
                                        className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center hover:bg-white/25 transition-all duration-300 cursor-default"
                                        style={{ animation: `fadeSlideUp 0.5s ${0.1 * i + 0.8}s ease both` }}>
                                        <p className="text-white font-extrabold text-xl leading-none">{value}</p>
                                        <p className="text-blue-200 text-xs mt-1.5 opacity-80">{label}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="text-blue-300 text-xs mt-5 opacity-60 text-center animate-fadeIn">
                                Trusted by 500+ delivery partners worldwide
                            </p>
                        </div>
                    </div>

                    {/* ══════════════════════════════════════════════════
                        RIGHT — Signup info panel
                    ══════════════════════════════════════════════════ */}
                    <div className="w-1/2 bg-gray-50 flex items-center justify-center p-10 overflow-y-auto">
                        <div className="w-full max-w-lg">

                            {/* Heading */}
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 animate-fadeSlideLeft-1">
                                Ready to start earning?
                            </h2>
                            <p className="text-gray-500 text-sm mb-10 leading-relaxed animate-fadeSlideLeft-2">
                                Complete your driver profile and vehicle registration to unlock all features and start accepting deliveries.
                            </p>

                            {/* Steps — staggered slide-in */}
                            <div className="space-y-5 mb-10">
                                {steps.map((step, i) => (
                                    <div key={step.number}
                                        className="flex items-start gap-5 group cursor-default p-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                                        style={{ animation: `fadeSlideLeft 0.55s ${0.15 * i + 0.2}s ease both` }}>
                                        <div className="w-10 h-10 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#4285F4] group-hover:border-[#4285F4] transition-all duration-300"
                                            style={{ animation: `popIn 0.5s ${0.15 * i + 0.3}s ease both` }}>
                                            <span className="text-base font-bold text-[#4285F4] group-hover:text-white transition-colors">{step.number}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-base font-semibold text-gray-900 group-hover:text-[#4285F4] transition-colors">{step.title}</p>
                                            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                                        </div>
                                        <MdArrowForward size={18} className="text-gray-300 group-hover:text-[#4285F4] mt-1 transition-all duration-300 group-hover:translate-x-1" />
                                    </div>
                                ))}
                            </div>

                            {/* CTA button with glow */}
                            <button
                                onClick={() => navigate('/signup/business')}
                                className="glow-btn w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-xl active:scale-[0.98] mb-4 text-base animate-fadeSlideLeft-3"
                            >
                                Create Driver Account
                                <span className="bounce-arrow"><MdArrowForward size={22} /></span>
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full border border-gray-200 hover:border-[#4285F4] text-gray-600 hover:text-[#4285F4] font-medium py-3.5 rounded-xl text-sm transition-all hover:bg-blue-50 animate-fadeSlideLeft-4"
                            >
                                Already a driver? Sign In
                            </button>

                            {/* Features grid — fade in */}
                            <div className="mt-10 pt-6 border-t border-gray-200 animate-fadeIn">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Available Features</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {features.map((f, i) => (
                                        <div key={f.label}
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 hover:shadow-sm transition-all duration-200 cursor-default group"
                                            style={{ animation: `fadeSlideUp 0.5s ${0.1 * i + 0.9}s ease both` }}>
                                            <div className="group-hover:scale-125 transition-transform duration-200">{f.icon}</div>
                                            <span className="text-sm font-medium text-gray-600 group-hover:text-[#4285F4] transition-colors">{f.label}</span>
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
