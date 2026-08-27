import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../../services/authService folder/authService';
import { api, TokenManager } from '../../services/api';
import { setCurrentUser, setOrganization } from '../../features/users/usersSlice';
import logo from '../../assets/logo2.png';

// ── helpers ───────────────────────────────────────────────────────────────────
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ── Local logo map — maps org name keywords to local public assets ────────────
// This resolves logos for known orgs without relying on the backend file server.
const LOCAL_LOGOS = {
    'aggarwal': '/logos/aggarwal-packers.svg',
    'unity':    '/logos/unity-solutions.svg',
};

const resolveOrgLogo = (org) => {
    // 1. Try to find a local logo by matching org name keywords
    const nameLower = (org.organizationName ?? org.name ?? '').toLowerCase();
    for (const [key, path] of Object.entries(LOCAL_LOGOS)) {
        if (nameLower.includes(key)) return path;
    }
    // 2. Use backend-stored logo path — stored as "uploads/logos/org_x_xxx.jpg"
    if (org.logo) {
        if (org.logo.startsWith('http')) return org.logo;
        // Build URL using same host as the backend (port 8000 in dev, same host in prod)
        const backendBase = window.location.hostname === 'localhost'
            ? `${window.location.protocol}//localhost:8000`
            : window.location.origin;
        return `${backendBase}/${org.logo.replace(/\\/g, '/')}`;
    }
    return null;
};
const OrgPicker = ({ orgs, onSelect, loading }) => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen flex">

            {/* ── Left panel — identical to login ── */}
            <div className="flex-1 text-white p-12 flex flex-col justify-between"
                style={{ background: 'linear-gradient(160deg, #053d92, #2563eb 100%)' }}>
                <div className="mb-45">
                    <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                        <img src={logo} alt="Moveryy Logo" className="h-16 w-auto object-contain" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center -mt-65">
                    <h1 className="text-5xl font-bold mb-2 leading-tight">
                        Fast, Reliable Delivery<br />Management
                    </h1>
                    <p className="text-lg mb-9 opacity-90 leading-relaxed">
                        Join thousands of delivery professionals using Moveryy to streamline their logistics and grow their business.
                    </p>
                    <div className="space-y-4">
                        {['Real-time tracking and updates', 'Optimize your routes and save time', 'Grow your delivery business with us'].map(text => (
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
                <div className="text-sm opacity-75">Trusted by 5000+ delivery partners worldwide</div>
            </div>

            {/* ── Right panel — org selection ── */}
            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center">
                <div className="w-full max-w-md">

                    <div className="mb-6">
                        <h2 className="text-4xl font-bold text-gray-900 mb-1">Select your organization</h2>
                        <p className="text-gray-500 text-sm">Which organization would you like to log in to?</p>
                    </div>

                    {/* Org list */}
                    <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                        {orgs.map((org) => {
                            const id      = org.organizationId ?? org.id ?? org._id;
                            const name    = org.organizationName ?? org.name ?? 'Unknown';
                            const sub     = org.website ?? org.email ?? org.city ?? '';
                            const init    = name.charAt(0).toUpperCase();
                            const isSel   = selected === id;
                            const logoSrc = resolveOrgLogo(org);

                            return (
                                <button key={id} type="button" onClick={() => setSelected(id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg border-2 text-left transition-all ${
                                        isSel
                                            ? 'border-[#4285F4] bg-blue-50'
                                            : 'border-gray-300 bg-white hover:border-[#4285F4] hover:bg-gray-50'
                                    }`}>
                                    {/* Logo — resolved via local map or backend path */}
                                    {logoSrc ? (
                                        <img
                                            src={logoSrc}
                                            alt={`${name} logo`}
                                            className="w-10 h-10 rounded-lg object-contain flex-shrink-0 border border-gray-200 bg-white p-0.5"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div className={`w-10 h-10 rounded-lg bg-[#4285F4] items-center justify-center text-white font-bold text-base flex-shrink-0 ${logoSrc ? 'hidden' : 'flex'}`}>
                                        {init}
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-semibold truncate ${isSel ? 'text-[#4285F4]' : 'text-gray-900'}`}>{name}</p>
                                        {sub && <p className="text-xs text-gray-400 truncate mt-0.5">{sub}</p>}
                                    </div>
                                    {/* Radio */}
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSel ? 'border-[#4285F4]' : 'border-gray-300'}`}>
                                        {isSel && <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Continue button — same as login sign-in button */}
                    <button onClick={() => selected && onSelect(selected)} disabled={!selected || loading}
                        className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Loading…
                            </span>
                        ) : 'Continue to Dashboard'}
                    </button>

                </div>
            </div>
        </div>
    );
};

// ── Main Login ────────────────────────────────────────────────────────────────
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // shared
    const [email, setEmail]     = useState('');
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    // password mode
    const [password,   setPassword]   = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPwd,    setShowPwd]    = useState(false);

    // OTP mode
    const [mode,      setMode]      = useState('password');
    const [otpSent,   setOtpSent]   = useState(false);
    const [otp,       setOtp]       = useState('');
    const [otpTimer,  setOtpTimer]  = useState(0);
    const [resending, setResending] = useState(false);

    // org picker state
    const [orgPickerOrgs,    setOrgPickerOrgs]    = useState(null);
    const [orgPickerLoading, setOrgPickerLoading] = useState(false);

    const clearError = () => { if (error) setError(''); };

    // ── fetch orgs after admin login and decide flow ──────────────────────────
    const handleAdminPostLogin = async (result) => {
        dispatch(setCurrentUser({ user: result.user, organization: result.activeOrganization ?? null }));

        try {
            const res  = await api.get('/api/v1/organizations/all');
            const orgs = res?.organizations ?? res?.data ?? [];

            if (orgs.length === 0) {
                navigate('/admin/register-organization');
            } else if (orgs.length === 1) {
                // Single org — call switch API then re-fetch fresh data
                // Backend returns a NEW token with organizationId embedded — must save it
                const switchRes = await api.post('/api/v1/organizations/switch', { organizationId: orgs[0].organizationId ?? orgs[0].id });
                const newToken = switchRes?.token ?? switchRes?.data?.token;
                if (newToken) TokenManager.setToken(newToken);
                // Re-fetch to get updated status
                const freshRes  = await api.get('/api/v1/organizations/all');
                const freshOrgs = freshRes?.organizations ?? freshRes?.data ?? [];
                const freshOrg  = freshOrgs[0] ?? orgs[0];
                dispatch(setOrganization(freshOrg));
                const stored = JSON.parse(localStorage.getItem('moveryy_user') || '{}');
                stored.organizationId  = freshOrg.organizationId ?? freshOrg.id;
                stored.hasOrganization = true;
                localStorage.setItem('moveryy_user', JSON.stringify(stored));
                navigate('/admin');
            } else {
                setOrgPickerOrgs(orgs);
            }
        } catch {
            if (result.needsOrganizationSetup) {
                navigate('/admin/register-organization');
            } else {
                navigate('/admin');
            }
        }
    };

    // ── org selected from picker ──────────────────────────────────────────────
    const handleOrgSelect = async (orgId) => {
        setOrgPickerLoading(true);
        try {
            // Call switch API — this activates the org on the backend
            // Backend returns a NEW token with organizationId embedded — must save it
            const switchRes = await api.post('/api/v1/organizations/switch', { organizationId: orgId });
            const newToken = switchRes?.token ?? switchRes?.data?.token;
            if (newToken) TokenManager.setToken(newToken);

            // Re-fetch all orgs to get fresh status (active after switch)
            const res      = await api.get('/api/v1/organizations/all');
            const freshOrgs = res?.organizations ?? res?.data ?? [];
            const org      = freshOrgs.find(
                o => (o.organizationId ?? o.id) == orgId
            ) || orgPickerOrgs.find(o => (o.organizationId ?? o.id ?? o._id) === orgId);

            if (org) {
                dispatch(setOrganization(org));
                const stored = JSON.parse(localStorage.getItem('moveryy_user') || '{}');
                stored.organizationId  = org.organizationId ?? org.id;
                stored.hasOrganization = true;
                localStorage.setItem('moveryy_user', JSON.stringify(stored));
            }
            navigate('/admin');
        } catch (err) {
            console.error('❌ Switch org failed:', err?.message);
            navigate('/admin');
        } finally {
            setOrgPickerLoading(false);
        }
    };

    // ── redirect after login ──────────────────────────────────────────────────
    const redirectByRole = async (role, data) => {
        if (role === 'admin') {
            await handleAdminPostLogin(data);
        } else if (role === 'transport') {
            navigate('/transport');
        } else {
            navigate('/');
        }
    };

    // ── start countdown timer ─────────────────────────────────────────────────
    const startTimer = (seconds = 60) => {
        setOtpTimer(seconds);
        const id = setInterval(() => {
            setOtpTimer(prev => {
                if (prev <= 1) { clearInterval(id); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    // ── PASSWORD LOGIN ────────────────────────────────────────────────────────
    const handlePasswordLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return; }
        if (!password) { setError('Please enter your password.'); return; }
        setLoading(true);
        try {
            const result = await authService.login({ email, password });
            console.log('🔍 Login result:', result);
            await redirectByRole(result?.user?.role, result);
        } catch (err) {
            setError(err?.message || 'Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── SEND OTP ──────────────────────────────────────────────────────────────
    const handleSendOtp = async (e) => {
        e?.preventDefault();
        setError('');
        if (!isValidEmail(email)) { setError('Please enter a valid email address.'); return; }
        setLoading(true);
        try {
            await authService.sendLoginOtp(email);
            setOtpSent(true);
            setOtp('');
            startTimer(60);
        } catch (err) {
            const msg = (err?.message || '').toLowerCase();
            if (msg.includes('cannot reach') || msg.includes('network') || err?.status === 0) {
                setError('Cannot reach the server. Make sure the backend is running.');
            } else {
                setOtpSent(true);
                setOtp('');
                startTimer(60);
            }
        } finally {
            setLoading(false);
        }
    };

    // ── RESEND OTP ────────────────────────────────────────────────────────────
    const handleResendOtp = async () => {
        if (otpTimer > 0 || resending) return;
        setResending(true);
        setError('');
        try {
            await authService.sendLoginOtp(email);
            setOtp('');
            startTimer(60);
        } catch {
            setOtp('');
            startTimer(60);
        } finally {
            setResending(false);
        }
    };

    // ── VERIFY OTP & LOGIN ────────────────────────────────────────────────────
    const handleOtpLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (otp.trim().length < 4) { setError('Please enter the OTP sent to your email.'); return; }
        setLoading(true);
        try {
            const result = await authService.loginWithOtp(email, otp);
            await redirectByRole(result?.user?.role, result);
        } catch (err) {
            setError(err?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── switch mode ───────────────────────────────────────────────────────────
    const switchMode = (m) => {
        setMode(m);
        setError('');
        setOtpSent(false);
        setOtp('');
        setOtpTimer(0);
        setPassword('');
    };

    // ── show org picker if multiple orgs ──────────────────────────────────────
    if (orgPickerOrgs !== null) {
        return <OrgPicker orgs={orgPickerOrgs} onSelect={handleOrgSelect} loading={orgPickerLoading} />;
    }

    // ── ORIGINAL UI — unchanged ───────────────────────────────────────────────
    return (
        <div className="min-h-screen flex">

            {/* ── Left panel ── */}
            <div className="flex-1 text-white p-12 flex flex-col justify-between"
                style={{ background: 'linear-gradient(160deg, #053d92, #2563eb 100%)' }}>
                <div className="mb-20">
                    <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
                        <img src={logo} alt="Moveryy Logo" className="h-16 w-auto object-contain" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center -mt-60">
                    <h1 className="text-5xl font-bold mb-2 leading-tight">
                        Fast, Reliable Delivery<br />Management
                    </h1>
                    <p className="text-lg mb-9 opacity-90 leading-relaxed">
                        Join thousands of delivery professionals using Moveryy to streamline their logistics and grow their business.
                    </p>
                    <div className="space-y-4">
                        {['Real-time tracking and updates', 'Optimize your routes and save time', 'Grow your delivery business with us'].map(text => (
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
                <div className="text-sm opacity-75">Trusted by 5000+ delivery partners worldwide</div>
            </div>

            {/* ── Right panel ── */}
            <div className="flex-1 bg-gray-50 p-12 flex items-center justify-center">
                <div className="w-full max-w-md">

                    <div className="mb-6">
                        <h2 className="text-4xl font-bold text-gray-900 mb-1">Welcome back</h2>
                        <p className="text-gray-500 text-sm">Sign in to manage your deliveries</p>
                    </div>

                    {/* Mode toggle */}
                    <div className="flex bg-gray-200 rounded-xl p-1 mb-6">
                        <button type="button" onClick={() => switchMode('password')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'password' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            Password
                        </button>
                        <button type="button" onClick={() => switchMode('otp')}
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'otp' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                            Login with OTP
                        </button>
                    </div>

                    {/* Error banner */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* ── PASSWORD MODE ── */}
                    {mode === 'password' && (
                        <form onSubmit={handlePasswordLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                                <input type="email" required autoComplete="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => { setEmail(e.target.value); clearError(); }}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm" />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <button type="button" onClick={() => switchMode('otp')}
                                        className="text-xs text-[#4285F4] hover:text-[#3367D6] font-medium">
                                        Forgot password? Use OTP instead
                                    </button>
                                </div>
                                <div className="relative">
                                    <input type={showPwd ? 'text' : 'password'} required autoComplete="current-password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => { setPassword(e.target.value); clearError(); }}
                                        className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm" />
                                    <button type="button" onClick={() => setShowPwd(v => !v)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        {showPwd
                                            ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                            : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input id="rememberMe" type="checkbox" checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-[#4285F4] border-gray-300 rounded focus:ring-[#4285F4]" />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">Remember me</label>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Signing in…
                                    </span>
                                ) : 'Sign in to your account'}
                            </button>
                        </form>
                    )}

                    {/* ── OTP MODE ── */}
                    {mode === 'otp' && (
                        <div className="space-y-5">
                            {/* Email field — always visible */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Registered email address</label>
                                <div className="flex gap-2">
                                    <input type="email" autoComplete="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        disabled={otpSent}
                                        onChange={e => { setEmail(e.target.value); clearError(); }}
                                        className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm disabled:bg-gray-100 disabled:text-gray-500" />
                                    {otpSent && (
                                        <button type="button"
                                            onClick={() => { setOtpSent(false); setOtp(''); setOtpTimer(0); setError(''); }}
                                            className="px-3 py-2 text-xs font-semibold text-[#4285F4] border border-[#4285F4] rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap">
                                            Change
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Step 1 — Send OTP */}
                            {!otpSent && (
                                <button type="button" onClick={handleSendOtp}
                                    disabled={loading || !email.trim()}
                                    className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Sending OTP…
                                        </span>
                                    ) : 'Send OTP to Email'}
                                </button>
                            )}

                            {/* Step 2 — OTP input + verify */}
                            {otpSent && (
                                <form onSubmit={handleOtpLogin} className="space-y-4">
                                    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-green-700">
                                            OTP sent to <span className="font-semibold">{email}</span>. Check your inbox.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter OTP</label>
                                        <input type="text" inputMode="numeric" maxLength={6} autoComplete="one-time-code"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); clearError(); }}
                                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-sm tracking-widest text-center font-mono text-lg" />
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Didn't receive it?</span>
                                        <button type="button" onClick={handleResendOtp}
                                            disabled={otpTimer > 0 || resending}
                                            className="text-[#4285F4] font-semibold hover:text-[#3367D6] disabled:text-gray-400 disabled:cursor-not-allowed transition-colors">
                                            {resending ? 'Resending…' : otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend OTP'}
                                        </button>
                                    </div>

                                    <button type="submit" disabled={loading || otp.length < 4}
                                        className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Verifying…
                                            </span>
                                        ) : 'Verify OTP & Sign In'}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {/* Divider + social */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-gray-50 text-gray-500">or continue with</span></div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Google', icon: <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> },
                            { label: 'GitHub',   icon: <svg className="w-5 h-5" fill="#333" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
                            { label: 'LinkedIn', icon: <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                        ].map(({ label, icon }) => (
                            <button key={label} type="button"
                                className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                {icon}<span>{label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 text-center">
                        <span className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-[#4285F4] hover:text-[#3367D6] font-medium">Create one now</a>
                        </span>
                    </div>
                    <div className="mt-3 text-center">
                        <p className="text-xs text-gray-500">
                            By signing in, you agree to our{' '}
                            <a href="#" className="text-[#4285F4] hover:text-[#3367D6]">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-[#4285F4] hover:text-[#3367D6]">Privacy Policy</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
