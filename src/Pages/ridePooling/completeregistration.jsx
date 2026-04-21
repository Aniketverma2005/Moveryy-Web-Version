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

    const storedUser = (() => {
        try { return JSON.parse(localStorage.getItem('moveryy_user')); } catch { return null; }
    })();
    const firstName = storedUser?.firstName || 'Rakshit';

    const stats = [
        { label: 'Total Earnings', value: '$0.00', sub: 'This month', icon: <MdAttachMoney size={26} className="text-green-500" /> },
        { label: 'Deliveries', value: '0', sub: 'Completed', icon: <MdOutlineLocationOn size={26} className="text-[#4285F4]" /> },
        { label: 'Rating', value: '4.8', sub: 'Average rating', icon: <MdStar size={26} className="text-yellow-400" /> },
        { label: 'Hours Online', value: '0', sub: 'This week', icon: <MdAccessTime size={26} className="text-purple-500" /> },
    ];

    const actions = [
        { type: 'Verification', title: 'Complete Background Check', desc: 'Your background check is pending verification', btn: 'Review', btnColor: 'bg-yellow-500 hover:bg-yellow-600' },
        { type: 'Document', title: 'Insurance Certificate Upload', desc: 'Please upload your insurance certificate', btn: 'Upload', btnColor: 'bg-yellow-500 hover:bg-yellow-600' },
    ];

    const features = [
        { icon: <MdOutlineLocationOn size={26} className="text-[#4285F4]" />, title: 'Real-time Tracking', desc: 'Track your deliveries in real-time with GPS integration' },
        { icon: <MdOutlineTrendingUp size={26} className="text-[#4285F4]" />, title: 'Earnings Analytics', desc: 'View detailed analytics of your earnings and performance' },
        { icon: <MdOutlineNotifications size={26} className="text-[#4285F4]" />, title: 'Instant Notifications', desc: 'Get real-time delivery requests and updates' },
        { icon: <MdOutlineHeadsetMic size={26} className="text-[#4285F4]" />, title: 'Customer Support', desc: '24/7 support team to help with any issues' },
        { icon: <MdOutlineShield size={26} className="text-[#4285F4]" />, title: 'Safety Features', desc: 'Emergency alerts and driver protection' },
        { icon: <MdOutlineFlashOn size={26} className="text-[#4285F4]" />, title: 'Route Optimization', desc: 'Optimize your routes and save time' },
    ];

    const navButtons = [
        { icon: <MdOutlineFlashOn size={20} />, label: 'Start Earning', primary: true, onClick: () => navigate('/transport') },
        { icon: <MdOutlineLocationOn size={20} />, label: 'View Jobs', primary: false, onClick: () => { } },
        { icon: <MdOutlineCalendarToday size={20} />, label: 'My Schedule', primary: false, onClick: () => { } },
        { icon: <MdOutlineSupportAgent size={20} />, label: 'Support', primary: false, onClick: () => { } },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ── Navbar ─────────────────────────────────────────────── */}
            <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-9 h-9 bg-[#4285F4] rounded-lg flex items-center justify-center">
                        <img src={logo} alt="M" className="h-7 w-7 object-contain" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">Moveryy</span>
                </div>
                <div className="flex items-center gap-5">
                    <button className="relative p-2 text-gray-500 hover:text-gray-800 transition-colors">
                        <MdOutlineNotifications size={26} />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-800 transition-colors">
                        <MdOutlineSettings size={26} />
                    </button>
                    <button onClick={() => navigate('/login')}
                        className="flex items-center gap-2 text-base text-gray-600 hover:text-gray-900 font-medium transition-colors">
                        <MdLogout size={20} /> Logout
                    </button>
                </div>
            </nav>

            {/* ── Content ────────────────────────────────────────────── */}
            <div className="flex-1 w-full max-w-6xl mx-auto px-8 py-8 flex flex-col gap-7">

                {/* Welcome */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome back, {firstName}! 👋
                    </h1>
                    <p className="text-gray-500 text-lg mt-2">
                        You're all set to start earning. Here's your dashboard overview.
                    </p>
                </div>

                {/* Quick action buttons */}
                <div className="grid grid-cols-4 gap-4">
                    {navButtons.map(({ icon, label, primary, onClick }) => (
                        <button key={label} onClick={onClick}
                            className={`flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl text-base font-semibold transition-all border ${primary
                                    ? 'bg-[#4285F4] hover:bg-[#3367D6] text-white border-[#4285F4] shadow-sm'
                                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                                }`}>
                            {icon} {label}
                        </button>
                    ))}
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-4 gap-5">
                    {stats.map(({ label, value, sub, icon }) => (
                        <div key={label} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-base text-gray-500 font-medium">{label}</span>
                                {icon}
                            </div>
                            <p className="text-3xl font-bold text-gray-900">{value}</p>
                            <p className="text-sm text-gray-400 mt-1.5">{sub}</p>
                        </div>
                    ))}
                </div>

                {/* Action Required */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Action Required</h2>
                    <div className="space-y-4">
                        {actions.map(({ type, title, desc, btn, btnColor }) => (
                            <div key={title} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-yellow-600 uppercase tracking-wide mb-1">{type}</p>
                                    <p className="text-xl font-bold text-gray-900">{title}</p>
                                    <p className="text-base text-gray-500 mt-1">{desc}</p>
                                </div>
                                <button className={`${btnColor} text-white text-base font-semibold px-6 py-2.5 rounded-xl transition-colors flex-shrink-0 ml-8`}>
                                    {btn}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Available Features */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Features</h2>
                    <div className="grid grid-cols-3 gap-5">
                        {features.map(({ icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                        {icon}
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-gray-900">{title}</p>
                                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                                    <span className="text-sm text-green-600 font-semibold">Available</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
                    <p className="text-gray-600 text-lg mb-5">
                        You're ready to start accepting deliveries! Your profile is verified and all documents are submitted.
                    </p>
                    <button onClick={() => navigate('/transport')}
                        className="inline-flex items-center gap-2.5 bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold px-10 py-4 rounded-xl transition-colors shadow-md text-lg">
                        <MdOutlineFlashOn size={22} />
                        Start Accepting Deliveries
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CompleteRegistration;
