import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineEmail, MdArrowBack, MdOutlineInfo, MdOutlineTimer } from 'react-icons/md';
import authService from '../../services/authService folder/authService';

const OTP_LENGTH = 6;
const OTP_EXPIRY = 300; // 5 minutes

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '';
    const redirectTo = location.state?.redirectTo || '/';

    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
    const [timer, setTimer] = useState(OTP_EXPIRY);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const inputRefs = useRef([]);

    // Countdown
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
            setSuccess('Email verified successfully! Redirecting...');
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
        // Light gray page background matching the screenshot
        <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
            <div className="w-full max-w-sm">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors shadow-sm"
                >
                    <MdArrowBack size={20} className="text-gray-700" />
                </button>

                {/* Email icon */}
                <div className="flex justify-center mb-5">
                    <div className="w-24 h-24 bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <MdOutlineEmail size={36} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-extrabold text-blue-700 mb-2">Verify Your Email</h1>
                    <p className="text-gray-500 text-sm">We've sent a verification code to</p>
                    <p className="text-blue-600 font-bold text-sm mt-1">{email || 'user@example.com'}</p>
                </div>

                {/* OTP card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
                    <p className="text-sm font-bold text-gray-800 mb-3">Enter OTP Code</p>

                    {/* 6 digit boxes */}
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
                                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none transition-all duration-150 ${digit
                                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                                        : 'border-blue-300 bg-white text-gray-900 focus:border-blue-600'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Timer bar */}
                    <div className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-lg py-2 px-4">
                        <MdOutlineTimer size={18} className={timer <= 60 ? 'text-red-500' : 'text-yellow-500'} />
                        <span className={`text-base font-bold ${timer <= 60 ? 'text-red-500' : 'text-yellow-600'}`}>
                            {formatTime(timer)}
                        </span>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                        {success}
                    </div>
                )}

                {/* Verify button */}
                <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm mb-4">
                    <button
                        onClick={handleVerify}
                        disabled={loading || otp.join('').length < OTP_LENGTH}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-extrabold py-4 rounded-xl tracking-widest text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase shadow-md"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Verifying...
                            </span>
                        ) : 'Verify OTP'}
                    </button>
                </div>

                {/* Resend */}
                <div className="text-center mb-4">
                    <span className="text-sm text-gray-500">Didn't receive the code? </span>
                    <button
                        onClick={handleResend}
                        disabled={resending || timer > 0}
                        className={`text-sm font-bold transition-colors ${timer > 0
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-blue-600 hover:text-blue-700 cursor-pointer'
                            }`}
                    >
                        {resending ? 'Sending...' : 'Resend'}
                    </button>
                </div>

                {/* Info banner — yellow/orange like screenshot */}
                <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MdOutlineInfo size={14} className="text-white" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        The OTP is valid for 5 minutes. Please verify before it expires.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default VerifyOtp;
