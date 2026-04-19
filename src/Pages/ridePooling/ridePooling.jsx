import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowForward,
    MdOutlineNotifications,
    MdOutlineGpsFixed,
    MdOutlineTrendingUp,
    MdOutlineHeadsetMic
} from 'react-icons/md';

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

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-8 h-8 bg-[#4285F4] rounded-md flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                    </div>
                    <span className="text-gray-900 font-semibold text-base">Moveryy</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/login')} className="text-sm text-gray-700 hover:text-[#4285F4] font-medium transition-colors">Sign In</button>
                    <button onClick={() => navigate('/signup')} className="bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm transition-all active:scale-95">Get Started</button>
                </div>
            </nav>

            <main className="flex flex-1">
                <div className="hidden lg:flex w-[450px] bg-[#4285F4] text-white p-12 flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold leading-tight mb-6">Fast, Reliable Delivery Management</h1>
                        <p className="text-lg opacity-85 mb-10">Join the Moveryy network to streamline your logistics and maximize your daily earnings.</p>
                        <div className="space-y-5">
                            {['Real-time tracking', 'Route optimization', 'Business growth'].map((text) => (
                                <div key={text} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm font-medium opacity-60">© 2026 Moveryy Logistics</p>
                </div>

                <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to start earning?</h2>
                        <p className="text-gray-500 mb-8">Complete your registration to unlock the driver dashboard.</p>
                        <div className="space-y-6 mb-8">
                            {steps.map((step) => (
                                <div key={step.number} className="flex items-start gap-4 group">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4285F4] group-hover:text-white transition-colors">
                                        <span className="text-sm font-bold">{step.number}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">{step.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => navigate('/signup/business')} className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md mb-4">
                            Create Driver Account
                            <MdArrowForward size={20} />
                        </button>
                        <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-gray-100">
                            {features.map((f) => (
                                <div key={f.label} className="flex items-center gap-2">
                                    {f.icon}
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{f.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RidePooling;