import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdOutlineEmail, MdOutlineVerified, MdArrowBack } from 'react-icons/md';
import authService from '../../services/authService folder/authService';
import logo from '../../assets/logo2.png';

const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 300; // 5 minutes

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Email and redirect destination passed from signup pages
    const email = location.state?.email || '';
    const redirectTo = location.state?.redirectTo || '/';

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(OTP_EXPIRY_SECONDS);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const inputRefs = useRef([]);

    // Countdown timer
    useEffect(() => {
        if (timer <= 0) return;
        const id = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(id);
    }, [timer]);

    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    // Handle individual digit input
    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // digits only
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // take last char
        setOtp(newOtp);
        setError('');
        // Auto-advance
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
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
        const otpString = otp.join('');
        if (otpString.length < OTP_LENGTH) { setError('Please enter the complete 6-digit OTP.'); return; }
        if (timer <= 0) { setError('OTP has expired. Please request a new one.'); return; }

        setLoading(true);
        setError('');
        try {
            await authService.verifyOtp(email, otpString);
            setSuccess('Email verified successfully! Redirecting...');
            setTimeout(() => navigate(redirectTo), 1500);
        } catch (err) {
            setError(err?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        setSuccess('');
        try {
            await authService.resendOtp(email);
            setTimer(OTP_EXPIRY_SECONDS);
            setOtp(Array(OTP_LENGTH).fill(''));
            setSuccess('A new OTP has been sent to your email.');
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err?.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* Left — dark blue gradient */}
            <div className="flex-1 text-white p-12 flex flex-col justify-between"
                style={{ background: 'linear-gradient(160deg, #0f2a52 0%, #1e4080 50%, #2563eb 100%)' }}>

                {/* Logo */}
                <div>
                    <div className="bg-white rounded-xl p-3 inline-block shadow-md mb-10">
                        <img src={logo} alt="Moveryy" className="h-12 w-auto object-contain" />
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight mb-5">
                        Verify Your<br />
                        <span className="text-blue-300">Email Address</span>
                    </h1>
                    <p className="text-blue-100 text-lg leading-relaxed mb-10 opacity-90 max-w-sm">
                        We've sent a 6-digit verification code to your email. Enter it to activate your account.
                    </p>
                    <div className="space-y-4">
                        {['OTP valid for 5 minutes', 'Check your spam folder too', 'Resend if not received'].map(t => (
                            <div key={t} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-blue-100 text-base">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-blue-300 text-sm opacity-60">Trusted by 5000+ delivery partners worldwide</p>
            </div>

            {/* Right — OTP form */}
            <div className="flex-1 bg-white flex items-center justify-center p-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md">

                    {/* Back */}
                    <button onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
                        <MdArrowBack size={18} /> Back
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MdOutlineEmail size={32} className="text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h2>
                        <p className="text-gray-500 text-base">
                            We sent a 6-digit code to
                        </p>
                        <p className="text-blue-600 font-bold text-base mt-1">{email || 'your email'}</p>
                    </div>

                    {/* Error / Success */}
                    {error && (
                        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-5 p-3.5 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2">
                            <MdOutlineVerified size={18} className="text-green-600 flex-shrink-0" />
                            {success}
                        </div>
                    )}

                    {/* OTP input boxes */}
                    <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
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
                                className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-200 ${digit
                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-slate-50 text-gray-900 focus:border-blue-500'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Timer */}
                    <div className="text-center mb-6">
                        {timer > 0 ? (
                            <p className="text-sm text-gray-500">
                                Code expires in{' '}
                                <span className={`font-bold ${timer <= 60 ? 'text-red-500' : 'text-blue-600'}`}>
                                    {formatTime(timer)}
                                </span>
                            </p>
                        ) : (
                            <p className="text-sm text-red-500 font-medium">OTP has expired</p>
                        )}
                    </div>

                    {/* Verify button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading || otp.join('').length < OTP_LENGTH}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-base mb-4"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying...
                            </span>
                        ) : 'Verify Email'}
                    </button>

                    {/* Resend */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Didn't receive the code?{' '}
                            <button
                                onClick={handleResend}
                                disabled={resending || timer > 0}
                                className={`font-bold transition-colors ${timer > 0
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-600 hover:text-blue-700 cursor-pointer'
                                    }`}
                            >
                                {resending ? 'Sending...' : 'Resend OTP'}
                            </button>
                            {timer > 0 && (
                                <span className="text-gray-400"> (wait {formatTime(timer)})</span>
                            )}
                        </p>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default VerifyOtp;
