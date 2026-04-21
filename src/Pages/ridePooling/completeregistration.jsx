import { useNavigate } from 'react-router-dom';
import {
    MdOutlineLocationOn, MdOutlineTrendingUp, MdOutlineNotifications,
    MdOutlineHeadsetMic, MdOutlineShield, MdOutlineFlashOn,
    MdOutlineSettings, MdLogout, MdOutlineCalendarToday,
    MdOutlineSupportAgent, MdStar, MdAttachMoney, MdAccessTime,
} from 'react-icons/md';
import logo from '../../assets/logo2.png';

const CompleteRegistration = () => {
    const navigate = useNavigate();

    // Get user name from localStorage
    const storedUser = (() => {
        try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
    })();
    const firstName = storedUser?.firstName || 'Rakshit';

    const stats = [
        { label: 'Total Earnings', value: '$0.00', sub: 'This month', icon: <MdAttachMoney size={22} className="text-green-500" /> },
        { label: 'Deliveries', value: '0', sub: 'Completed', icon: <MdOutlineLocationOn size={22} className="text-[#4285F4]" /> },
        { label: 'Rating', value: '4.8', sub: 'Average rating', icon: <MdStar size={22} className="text-yellow-400" /> },
        { label: 'Hours Online', value: '0', sub: 'This week', icon: <MdAccessTime size={22} className="text-purple-500" /> },
    ];

    const actions = [
        { type: 'Verification', title: 'Complete Background Check', desc: 'Your background check is pending verification', btn: 'Review', btnColor: 'bg-yellow-500 hover:bg-yellow-600' },
        { type: 'Document', title: 'Insurance Certificate Upload', desc: 'Please upload your insurance certificate', btn: 'Upload', btnColor: 'bg-yellow-500 hover:bg-yellow-600' },
    ];

    const features = [
        { icon: <MdOutlineLocationOn size={22} className="text-[#4285F4]" />, title: 'Real-time Tracking', desc: 'Track your deliveries in real-time with GPS integration' },
        { icon: <MdOutlineTrendingUp size={22} className="text-[#4285F4]" />, title: 'Earnings Analytics', desc: 'View detailed analytics of your earnings and performance' },
        { icon: <MdOutlineNotifications size={22} className="text-[#4285F4]" />, title: 'Instant Notifications', desc: 'Get real-time delivery requests and updates' },
        { icon: <MdOutlineHeadsetMic size={22} className="text-[#4285F4]" />, title: 'Customer Support', desc: '24/7 support team to help with any issues' },
        { icon: <MdOutlineShield size={22} className="text-[#4285F4]" />, title: 'Safety Features', desc: 'Emergency alerts and driver protection' },
        { icon: <MdOutlineFlashOn size={22} className="text-[#4285F4]" />, title: 'Route Optimization', desc: 'Optimize your routes and save time' },
    ];

    const navButtons = [
        { icon: <MdOutlineLocationOn size={18} />, label: 'Start Earning', primary: true, onClick: () => navigate('/transport') },
        { icon: <MdOutlineCalendarToday size={18} />, label: 'View Jobs', primary: false },
        { icon: <MdOutlineCalendarToday size={18} />, label: 'My Schedule', primary: false },
        { icon: <MdOutlineSupportAgent size={18} />, label: 'Support', primary: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 bg-[#4285F4] rounded-lg flex items-center justify-center">
                        <img src={logo} alt="M" className="h-6 w-6 object-contain" />
                    </div>
                    <span className="font-bold text-gray-900 text-base">Moveryy</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors">
                        <MdOutlineNotifications size={22} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                        <MdOutlineSettings size={22} />
                    </button>
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        <MdLogout size={18} /> Logout
                    </button>
                </div>
            </nav>

            {/* ── Content ────────────────────────────────────────────── */}
            <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">

                {/* Welcome */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {firstName}! 👋
                    </h1>
                    <p className="text-gray-500 text-base mt-1">
                        You're all set to start earning. Here's your dashboard overview.
                    </p>
                </div>

                {/* Quick action buttons */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {navButtons.map(({ icon, label, primary, onClick }) => (
                        <button
                            key={label}
                            onClick={onClick}
                            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all border ${primary
                                    ? 'bg-[#4285F4] hover:bg-[#3367D6] text-white border-[#4285F4] shadow-sm'
                                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                                }`}
                        >
                            {icon} {label}
                        </button>
                    ))}
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {stats.map(({ label, value, sub, icon }) => (
                        <div key={label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-500 font-medium">{label}</span>
                                {icon}
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{value}</p>
                            <p className="text-xs text-gray-400 mt-1">{sub}</p>
                        </div>
                    ))}
                </div>

                {/* Action Required */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Action Required</h2>
                    <div className="space-y-3">
                        {actions.map(({ type, title, desc, btn, btnColor }) => (
                            <div key={title} className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide mb-1">{type}</p>
                                    <p className="text-base font-bold text-gray-900">{title}</p>
                                    <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                                </div>
                                <button className={`${btnColor} text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors flex-shrink-0 ml-6`}>
                                    {btn}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Features */}
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Available Features</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {features.map(({ icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                    <span className="text-xs text-green-600 font-medium">Available</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
                    <p className="text-gray-600 text-base mb-4">
                        You're ready to start accepting deliveries! Your profile is verified and all documents are submitted.
                    </p>
                    <button
                        onClick={() => navigate('/transport')}
                        className="inline-flex items-center gap-2 bg-[#4285F4] hover:bg-[#3367D6] text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-md text-base"
                    >
                        <MdOutlineFlashOn size={20} />
                        Start Accepting Deliveries
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CompleteRegistration;
