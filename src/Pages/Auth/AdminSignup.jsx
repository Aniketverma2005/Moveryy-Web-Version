import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        if (!formData.agreeToTerms) {
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }
        // Navigate to admin dashboard after successful signup
        navigate('/admin');
    };

    const handleBackToRoleSelection = () => {
        navigate('/signup');
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
                    <div className="w-12 h-12 bg-white rounded"></div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center -mt-72">
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
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Easy account setup in minutes</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span>Secure and reliable platform</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

            {/* Right Side - Admin Signup Form */}
            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Create your account
                        </h2>
                        <p className="text-gray-600">
                            Join Moveryy and start your journey
                        </p>
                    </div>

                    {/* Back to Role Selection */}
                    <div className="mb-6">
                        <button 
                            onClick={handleBackToRoleSelection}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to role selection
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="At least 8 characters"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={8}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                minLength={8}
                            />
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                id="agreeToTerms"
                                name="agreeToTerms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded mt-1"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                                I agree to the{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Create Account Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 font-medium transition-colors"
                        >
                            Create Admin Account
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button 
                                    type="button"
                                    onClick={handleSignInClick}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Sign in here
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;