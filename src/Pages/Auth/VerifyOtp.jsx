import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineEmail, MdArrowBack, MdOutlineInfo, MdOutlineTimer } from 'react-icons/md';
import authService from '../../services/authService folder/authService';
import logo from '../../assets/logo2.png';

const OTP_LENGTH = 6;
const OTP_EXPIRY = 300;

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const redirectTo = location.state?.redirectTo || '/login';

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(OTP_EXPIRY);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        if (timer <= 0) return;
        const id = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(id);
    }, [timer]);

    const formatTime = (s) =>
        `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError('');
        if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0)
            inputRefs.current[index - 1]?.focus();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        const newOtp = Array(OTP_LENGTH).fill('');
        pasted.split('').forEach((c, i) => { newOtp[i] = c; });
        setOtp(newOtp);
        inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
    };

    const handleVerify = async () => {
        const otpStr = otp.join('');
        if (otpStr.length < OTP_LENGTH) { setError('Please enter the complete 6-digit OTP.'); return; }
        if (timer <= 0) { setError('OTP has expired. Please resend.'); return; }
        setLoading(true); setError('');
        try {
            await authService.verifyOtp(email, otpStr);
            setSuccess('Email verified successfully! Redirecting to login...');
            setTimeout(() => navigate(redirectTo), 1500);
        } catch (err) {
            setError(err?.message || 'Invalid or expired OTP.');
        } finally { setLoading(false); }
    };

    const handleResend = async () => {
        setResending(true); setError(''); setSuccess('');
        try {
            await authService.resendOtp(email);
            setTimer(OTP_EXPIRY);
            setOtp(Array(OTP_LENGTH).fill(''));
            setSuccess('A new OTP has been sent to your email.');
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err?.message || 'Failed to resend OTP.');
        } finally { setResending(false); }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Blue Section */}
            <div className="flex-1 bg-blue-600 text-white p-12 flex flex-col justify-between">
                {/* Logo */}
                <div className="mb-20">
                    <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                        <img src={logo} alt="Moveryy Logo" className="h-16 w-auto object-contain" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center -mt-72">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Secure Email Verification
                    </h1>

                    <p className="text-lg mb-12 opacity-90 leading-relaxed">
                        We've sent a verification code to your email. Enter the code below to verify your account and get started with Moveryy.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        {['Quick and secure verification', 'Code expires in 5 minutes', '24/7 support available'].map((text) => (
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

                {/* Bottom Text */}
                <div className="text-sm opacity-75">
                    Trusted by 5000+ users and businesses worldwide
                </div>
            </div>

            {/* Right Side - Verification Form */}
            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                    >
                        <MdArrowBack size={20} className="mr-2" />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    {/* Email Icon */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                            className="relative"
                        >
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <MdOutlineEmail size={48} className="text-blue-600" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                        <p className="text-gray-600 text-sm mb-1">We've sent a verification code to</p>
                        <p className="text-[#4285F4] font-semibold text-base">{email || 'user@example.com'}</p>
                    </div>

                    {/* Error / Success Messages */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 p-3 bg-red-50 border border-red-300 rounded-md"
                            >
                                <p className="text-sm text-red-700">{error}</p>
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-4 p-3 bg-green-50 border border-green-300 rounded-md"
                            >
                                <p className="text-sm text-green-700">{success}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* OTP Input Section */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Enter OTP Code
                        </label>

                        {/* OTP Boxes */}
                        <div className="flex gap-2 justify-between mb-4" onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={el => inputRefs.current[i] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(i, e.target.value)}
                                    onKeyDown={e => handleKeyDown(i, e)}
                                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] transition-all ${
                                        digit 
                                            ? 'border-[#4285F4] bg-blue-50' 
                                            : 'border-gray-300 bg-white'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Timer */}
                        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <MdOutlineTimer size={18} className={timer <= 60 ? 'text-red-500' : 'text-yellow-600'} />
                            <span className={`text-sm font-bold ${timer <= 60 ? 'text-red-500' : 'text-yellow-700'}`}>
                                {formatTime(timer)}
                            </span>
                        </div>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading || otp.join('').length < OTP_LENGTH}
                        className="w-full bg-[#4285F4] text-white py-3 px-4 rounded-md hover:bg-[#3367D6] focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying...
                            </span>
                        ) : 'VERIFY OTP'}
                    </button>

                    {/* Resend Link */}
                    <div className="text-center mb-6">
                        <span className="text-sm text-gray-600">Didn't receive the code? </span>
                        <button
                            onClick={handleResend}
                            disabled={resending || timer > 0}
                            className={`text-sm font-medium transition-colors ${
                                timer > 0 
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-[#4285F4] hover:text-[#3367D6] cursor-pointer'
                            }`}
                        >
                            {resending ? 'Sending...' : 'Resend'}
                        </button>
                    </div>

                    {/* Info Banner */}
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MdOutlineInfo size={12} className="text-white" />
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                            The OTP is valid for 5 minutes. Please verify before it expires.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;