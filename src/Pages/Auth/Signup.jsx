import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleAccountTypeSelect = (type) => {
        if (type === 'business') {
            navigate('/signup/business');
        } else if (type === 'admin') {
            navigate('/signup/admin');
        }
    };

    const handleSignInClick = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Blue Section */}
            <div className="flex-1 bg-blue-600 text-white p-12 flex flex-col justify-between">
                {/* Logo */}
                <div className="mb-4">
                    <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                        <img 
                            src="/logo.png" 
                            alt="Moveryy Logo" 
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center -mt-80">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Join the Moveryy Community
                    </h1>

                    <p className="text-lg mb-12 opacity-90 leading-relaxed">
                        Whether you're a business owner or a delivery professional, Moveryy is your platform to succeed in the logistics industry.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-4 h-4" fill="tick" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Easy account setup in minutes</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-4 h-4" fill="tick" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Secure and reliable platform</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-4 h-4" fill="tick" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>24/7 customer support</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Text */}
                <div className="text-sm opacity-75">
                    Join 5000+ users and businesses already using Moveryy
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">
                            Create your account
                        </h2>
                        <p className="text-gray-600">
                            Join Moveryy and start your journey
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Account Type Selection */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-4">
                                Select your account type
                            </label>

                            <div className="space-y-3">
                                {/* Business User Option */}
                                <div
                                    onClick={() => handleAccountTypeSelect('business')}
                                    className="p-5 border border-gray-300 rounded-lg cursor-pointer transition-all hover:border-gray-400 hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5">
                                            <h3 className="text-lg font-semibold text-gray-900">Business User</h3>
                                            <p className="text-base text-gray-600">Manage your delivery operations</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Administrator Option */}
                                <div
                                    onClick={() => handleAccountTypeSelect('admin')}
                                    className="p-5 border border-gray-300 rounded-lg cursor-pointer transition-all hover:border-gray-400 hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ml-5">
                                            <h3 className="text-lg font-semibold text-gray-900">Administrator</h3>
                                            <p className="text-base text-gray-600">Manage teams and system settings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={handleSignInClick}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Sign in here
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;