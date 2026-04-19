import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authentication folder/authService';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        phone: '', password: '', confirmPassword: '', agreeToTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
        if (apiError) setApiError('');
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
        if (!/^\+[1-9]\d{6,14}$/.test(formData.phone)) newErrors.phone = 'Use international format e.g. +919876543210';
        if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setLoading(true);
        setApiError('');
        try {
            await authService.signupAdmin({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                agreeToTerms: formData.agreeToTerms,
            });
            navigate('/admin');
        } catch (err) {
            setApiError(err?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const Field = ({ id, label, type = 'text', placeholder, error }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                id={id} name={id} type={type} required
                className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent ${error ? 'border-red-400' : 'border-gray-300'}`}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );

    return (
        <div className="min-h-screen flex">
            {/* Left Side */}
            <div className="flex-1 bg-[#4285F4] text-white p-12 flex flex-col justify-between">
                <div className="mb-4">
                    <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                        <img src="/logo.png" alt="Moveryy Logo" className="h-16 w-auto object-contain" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center -mt-72">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">Join the Moveryy Community</h1>
                    <p className="text-lg mb-12 opacity-90 leading-relaxed">
                        Whether you're a business owner or a delivery professional, Moveryy is your platform to succeed in the logistics industry.
                    </p>
                    <div className="space-y-4">
                        {['Easy account setup in minutes', 'Secure and reliable platform', '24/7 customer support'].map((text) => (
                            <div key={text} className="flex items-center">
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-sm opacity-75">Join 5000+ users and businesses already using Moveryy</div>
            </div>

            {/* Right Side */}
            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Create your account</h2>
                        <p className="text-gray-600">Administrator</p>
                    </div>

                    <button onClick={() => navigate('/signup')} className="flex items-center text-[#4285F4] hover:text-[#3367D6] text-sm font-medium mb-6">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to role selection
                    </button>

                    {apiError && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md">
                            <p className="text-sm text-red-700">{apiError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Field id="firstName" label="First name" placeholder="John" error={errors.firstName} />
                            <Field id="lastName" label="Last name" placeholder="Doe" error={errors.lastName} />
                        </div>
                        <Field id="email" label="Email address" type="email" placeholder="you@example.com" error={errors.email} />
                        <Field id="phone" label="Phone number" type="tel" placeholder="+919876543210" error={errors.phone} />
                        <Field id="password" label="Password" type="password" placeholder="At least 8 characters" error={errors.password} />
                        <Field id="confirmPassword" label="Confirm password" type="password" placeholder="Confirm your password" error={errors.confirmPassword} />

                        <div className="flex items-start">
                            <input
                                id="agreeToTerms" name="agreeToTerms" type="checkbox"
                                className="h-4 w-4 text-[#4285F4] focus:ring-[#4285F4] border-gray-300 rounded mt-1"
                                checked={formData.agreeToTerms} onChange={handleChange} required
                            />
                            <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-700">
                                I agree to the{' '}
                                <a href="#" className="text-[#4285F4] hover:text-[#3367D6]">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-[#4285F4] hover:text-[#3367D6]">Privacy Policy</a>
                            </label>
                        </div>
                        {errors.agreeToTerms && <p className="text-xs text-red-600">{errors.agreeToTerms}</p>}

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-[#4285F4] text-white py-3 px-4 rounded-md hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create Admin Account'}
                        </button>

                        <div className="text-center">
                            <span className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button type="button" onClick={() => navigate('/login')} className="text-[#4285F4] hover:text-[#3367D6] font-medium">
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
