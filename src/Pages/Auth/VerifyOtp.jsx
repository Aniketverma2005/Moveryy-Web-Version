import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineEmail, MdArrowBack, MdOutlineInfo, MdOutlineTimer } from 'react-icons/md';
import authService from '../../services/authService folder/authService';

const OTP_LENGTH = 6;
const OTP_EXPIRY = 300;

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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-blue-600">

            {/* ── Animated background blobs ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
                    style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
                    style={{ background: 'radial-gradient(circle, #93c5fd, transparent)' }}
                />
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            </div>

            {/* ── Back button ── */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
                <MdArrowBack size={20} className="text-white" />
            </button>

            {/* ── Glassmorphism card ── */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                className="relative w-full max-w-sm z-10"
                style={{
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '28px',
                    boxShadow: '0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                    padding: '40px 32px 32px',
                }}
            >
                {/* ── Email icon — pops out above card ── */}
                <div className="flex justify-center" style={{ marginTop: '-72px', marginBottom: '20px' }}>
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Outer glow ring */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 rounded-full"
                            style={{ background: 'rgba(96,165,250,0.35)', filter: 'blur(12px)', transform: 'scale(1.3)' }}
                        />
                        {/* Icon container — glassmorphism */}
                        <div style={{
                            width: 88, height: 88,
                            background: 'rgba(255,255,255,0.18)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '2px solid #ffffff', // Changed to pure white border
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 32px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                            position: 'relative', zIndex: 1,
                        }}>
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <MdOutlineEmail size={40} className="text-white" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-extrabold text-white mb-2">Verify Your Email</h1>
                    <p className="text-blue-200 text-sm">We've sent a verification code to</p>
                    <p className="text-white font-bold text-sm mt-1">{email || 'user@example.com'}</p>
                </div>

                {/* OTP boxes */}
                <div className="mb-2">
                    {/* Changed text to pure white */}
                    <p className="text-white text-xs font-semibold mb-3 uppercase tracking-wider">Enter OTP Code</p>
                    <div className="flex gap-2 justify-between" onPaste={handlePaste}>
                        {otp.map((digit, i) => (
                            <motion.input
                                key={i}
                                ref={el => inputRefs.current[i] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                                whileFocus={{ scale: 1.08 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                                style={{
                                    width: 44, height: 52,
                                    textAlign: 'center',
                                    fontSize: 20, fontWeight: 700,
                                    background: '#ffffff', // Changed to solid white background
                                    backdropFilter: 'blur(8px)',
                                    border: digit ? '2px solid #ffffff' : '2px solid rgba(255,255,255,0.6)',
                                    borderRadius: 12,
                                    color: '#1e40af', // Changed text to blue so it is visible on white background
                                    outline: 'none',
                                    transition: 'all 0.15s',
                                    boxShadow: digit ? '0 4px 16px rgba(37,99,235,0.3)' : 'none',
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 mt-3 mb-5 py-2 px-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <MdOutlineTimer size={18} className={timer <= 60 ? 'text-red-400' : 'text-yellow-400'} />
                    <span className={`text-base font-bold ${timer <= 60 ? 'text-red-400' : 'text-yellow-300'}`}>
                        {formatTime(timer)}
                    </span>
                </div>

                {/* Error / Success */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mb-4 p-3 rounded-xl text-sm text-red-200"
                            style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)' }}>
                            {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mb-4 p-3 rounded-xl text-sm text-green-200"
                            style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)' }}>
                            {success}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Verify button */}
                <motion.button
                    onClick={handleVerify}
                    disabled={loading || otp.join('').length < OTP_LENGTH}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full font-extrabold py-3.5 rounded-xl tracking-widest text-sm uppercase mb-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                        background: '#ffffff', // Changed to pure white background
                        color: '#1e40af',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                            Verifying...
                        </span>
                    ) : 'Verify OTP'}
                </motion.button>

                {/* Resend */}
                <div className="text-center mb-5">
                    <span className="text-blue-200 text-sm">Didn't receive the code? </span>
                    <button
                        onClick={handleResend}
                        disabled={resending || timer > 0}
                        // Changed hover state to text-white
                        className={`text-sm font-bold transition-colors ${timer > 0 ? 'text-white/50 cursor-not-allowed' : 'text-white hover:text-white cursor-pointer'
                            }`}
                    >
                        {resending ? 'Sending...' : 'Resend'}
                    </button>
                </div>

                {/* Info banner */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl"
                    style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.35)' }}>
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MdOutlineInfo size={14} className="text-white" />
                    </div>
                    <p className="text-yellow-200 text-xs leading-relaxed">
                        The OTP is valid for 5 minutes. Please verify before it expires.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyOtp;