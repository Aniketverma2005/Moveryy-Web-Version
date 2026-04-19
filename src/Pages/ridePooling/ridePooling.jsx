import { useNavigate } from 'react-router-dom';
import { MdArrowForward, MdOutlineNotifications, MdOutlineGpsFixed, MdOutlineTrendingUp, MdOutlineHeadsetMic } from 'react-icons/md';

const RidePooling = () => {
    const navigate = useNavigate();

    const steps = [
        {
            number: 1,
            title: 'Driver Registration',
            description: 'Complete your profile with personal and license information',
        },
        {
            number: 2,
            title: 'Vehicle Details',
            description: 'Add your vehicle information and documentation',
        },
        {
            number: 3,
            title: 'Start Earning',
            description: 'Access your dashboard and start accepting deliveries',
        },
    ];

    const features = [
        { icon: <MdOutlineNotifications size={18} className="text-[#4285F4]" />, label: 'Instant Notifications' },
        { icon: <MdOutlineTrendingUp size={18} className="text-[#4285F4]" />, label: 'Earnings Analytics' },
        { icon: <MdOutlineGpsFixed size={18} className="text-[#4285F4]" />, label: 'GPS Navigation' },
        { icon: <MdOutlineHeadsetMic size={18} className="text-[#4285F4]" />, label: '24/7 Support' },
    ];

    return (
        <div className="min-h-screen flex flex-col">

            {/* ── Top Navbar ─────────────────────────────────────────────── */}
            <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#4285F4] rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-gray-900 font-semibold text-base">Moveryy</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-gray-700 hover:text-gray-900 font-medium"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* ── Main Content ────────────────────────────────────────────── */}
            <div className="flex flex-1">

                {/* Left — Blue Panel */}
                <div className="w-[500px] flex-shrink-0 bg-[#4285F4] text-white p-10 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold leading-tight mb-4">
                            Fast, Reliable Delivery<br />Management
                        </h1>
                        <p className="text-sm opacity-90 leading-relaxed mb-8">
                            Join thousands of delivery professionals using Moveryy to streamline their logistics and grow their business.
                        </p>

                        {/* Feature bullets */}
                        <div className="space-y-3">
                            {[
                                'Real-time tracking and updates',
                                'Optimize your routes and save time',
                                'Grow your delivery business with us',
                            ].map((text) => (
                                <div key={text} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full border border-white border-opacity-60 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm opacity-90">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs opacity-70">Trusted by 500+ delivery partners worldwide</p>
                </div>

                {/* Right — Content Panel */}
                <div className="flex-1 bg-white p-12 flex flex-col justify-center">
                    <div className="max-w-md w-full">

                        {/* Heading */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Ready to start earning?</h2>
                        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                            Complete your driver profile and vehicle registration to unlock all features and start accepting deliveries.
                        </p>

                        {/* Steps */}
                        <div className="space-y-5 mb-8">
                            {steps.map((step) => (
                                <div key={step.number} className="flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-[#4285F4]">{step.number}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => navigate('/signup/business')}
                            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-medium py-3 px-6 rounded-md flex items-center justify-center gap-2 transition-colors mb-3"
                        >
                            Create Driver Account
                            <MdArrowForward size={18} />
                        </button>

                        {/* Sign In link */}
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-md text-sm transition-colors"
                        >
                            Already a driver? Sign In
                        </button>

                        {/* Available Features */}
                        <div className="mt-8">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Available Features</p>
                            <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                                {features.map((f) => (
                                    <div key={f.label} className="flex items-center gap-2">
                                        {f.icon}
                                        <span className="text-sm text-gray-600">{f.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default RidePooling;
