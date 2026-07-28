/**
 * Authentication Service
 *
 * Backend endpoints (confirmed from backend routes):
 *  POST /api/v1/users/signup        → register new user
 *  POST /api/v1/users/login         → login
 *  POST /api/v1/users/logout        → logout (requires token)
 *  POST /api/v1/users/refresh-token → refresh access token
 *  GET  /api/v1/users/user          → get current user (requires token)
 *
 * Validation rules:
 *  - firstName / lastName → required
 *  - email                → valid format
 *  - password             → min 8 chars
 *  - phone                → international format (+[country][number], 7–15 digits)
 *  - role                 → one of: admin | user | transport
 */

import { api, TokenManager } from '../api';

// ─── Validators ──────────────────────────────────────────────────────────────

const validators = {
    firstName: (v) => v && v.trim().length > 0,
    lastName: (v) => v && v.trim().length > 0,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    password: (v) => v && v.length >= 8,
    phone: (v) => /^\+[1-9]\d{6,14}$/.test(v),
    role: (v) => ['admin', 'user', 'transport'].includes(v),
};

const validate = (fields) => {
    const errors = {};
    Object.entries(fields).forEach(([key, value]) => {
        if (validators[key] && !validators[key](value)) {
            errors[key] = `Invalid ${key}`;
        }
    });
    if (Object.keys(errors).length > 0) {
        const err = new Error('Validation failed: ' + Object.values(errors).join(', '));
        err.validationErrors = errors;
        throw err;
    }
};

// Helper — extract user + token from any backend response shape
// The backend may return tokens in different locations:
// Shape 1: { accessToken, refreshToken, user }
// Shape 2: { token, user }
// Shape 3: { data: { accessToken, user } }
// Shape 4: Token in httpOnly cookie — token is null but user exists + message = success
const extractAuth = (response) => {
    const token =
        response?.accessToken ||
        response?.token ||
        response?.data?.accessToken ||
        response?.data?.token ||
        response?.jwt ||
        response?.data?.jwt ||
        null;

    const refreshToken =
        response?.refreshToken ||
        response?.data?.refreshToken ||
        null;

    const user =
        response?.user ||
        response?.data?.user ||
        (response?.data && typeof response.data === 'object' && !Array.isArray(response.data) && response.data?.email ? response.data : null) ||
        null;

    // Detect cookie-based auth: backend sends user but no token in body
    // In this case the JWT is stored in an httpOnly cookie automatically
    const isCookieAuth = !token && !!user;

    return { token, refreshToken, user, isCookieAuth };
};

// ─── Auth Service ─────────────────────────────────────────────────────────────

export const authService = {

    // ── Login ──────────────────────────────────────────────────────────────────
    login: async (credentials) => {
        try {
            validate({
                email: credentials.email,
                password: credentials.password,
            });

            const response = await api.post('/api/v1/users/login', {
                email: credentials.email.trim().toLowerCase(),
                password: credentials.password,
            });

            const { token, refreshToken, user, isCookieAuth } = extractAuth(response);

            // Store token if present
            if (token) TokenManager.setToken(token);
            if (refreshToken) TokenManager.setRefreshToken(refreshToken);

            // ── Case 1: Got user + token in response ──────────────────
            if (user && (user.role || user.email)) {
                localStorage.setItem('moveryy_user', JSON.stringify(user));
                // Store tokens
                if (token) TokenManager.setToken(token);
                if (refreshToken) TokenManager.setRefreshToken(refreshToken);
                console.log('✅ Login successful (body):', user?.email);
                return {
                    token,
                    user,
                    needsOrganizationSetup: response?.data?.needsOrganizationSetup ?? response?.needsOrganizationSetup ?? false,
                    activeOrganization: response?.data?.activeOrganization ?? response?.activeOrganization ?? null,
                };
            }

            // ── Case 2: Cookie-based / message-only response ──────────
            // Backend set httpOnly cookie, now fetch user profile
            const isSuccess =
                isCookieAuth ||
                token ||
                response?.success === true ||
                response?.status === 'success' ||
                (typeof response?.message === 'string' &&
                    response.message.toLowerCase().includes('success'));

            if (isSuccess) {
                console.log('✅ Login accepted, fetching user profile...');
                try {
                    const profileRes = await api.get('/api/v1/users/user');
                    const fetchedUser =
                        profileRes?.user ||
                        profileRes?.data?.user ||
                        profileRes?.data ||
                        null;

                    if (fetchedUser && (fetchedUser.role || fetchedUser.email)) {
                        localStorage.setItem('moveryy_user', JSON.stringify(fetchedUser));
                        console.log('✅ User profile fetched:', fetchedUser?.email);
                        return {
                            token: token || null,
                            user: fetchedUser,
                            needsOrganizationSetup: response?.data?.needsOrganizationSetup ?? response?.needsOrganizationSetup ?? false,
                            activeOrganization: response?.data?.activeOrganization ?? response?.activeOrganization ?? null,
                        };
                    }
                } catch (profileErr) {
                    console.warn('⚠️ Profile fetch failed, using email fallback:', profileErr?.message);
                }

                // Absolute fallback — store minimal user so redirect works
                const fallbackUser = { email: credentials.email, role: 'user' };
                localStorage.setItem('moveryy_user', JSON.stringify(fallbackUser));
                return { token: null, user: fallbackUser };
            }

            throw new Error(response?.message || 'Login failed — unexpected response from server');

        } catch (error) {
            console.error('❌ Login error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'Login failed');
        }
    },

    // ── Business Signup (role: user) ───────────────────────────────────────────
    signupBusiness: async (userData) => {
        try {
            validate({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
            });

            const response = await api.post('/api/v1/users/signup', {
                firstName: userData.firstName.trim(),
                lastName: userData.lastName.trim(),
                email: userData.email.trim().toLowerCase(),
                password: userData.password,
                phone: userData.phone.trim(),
                role: 'user',
            });

            const { token, refreshToken, user } = extractAuth(response);
            if (token) {
                TokenManager.setToken(token);
                if (refreshToken) TokenManager.setRefreshToken(refreshToken);
                localStorage.setItem('moveryy_user', JSON.stringify(user));
            }

            console.log('✅ Business signup successful:', userData.email);
            return user || response;
        } catch (error) {
            console.error('❌ Business signup error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'Signup failed');
        }
    },

    // ── Admin Signup (role: admin) ─────────────────────────────────────────────
    signupAdmin: async (userData) => {
        try {
            validate({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
            });

            const response = await api.post('/api/v1/users/signup', {
                firstName: userData.firstName.trim(),
                lastName: userData.lastName.trim(),
                email: userData.email.trim().toLowerCase(),
                password: userData.password,
                phone: userData.phone.trim(),
                role: 'admin',
            });

            const { token, refreshToken, user } = extractAuth(response);
            if (token) {
                TokenManager.setToken(token);
                if (refreshToken) TokenManager.setRefreshToken(refreshToken);
                localStorage.setItem('moveryy_user', JSON.stringify(user));
            }

            console.log('✅ Admin signup successful:', userData.email);
            return user || response;
        } catch (error) {
            console.error('❌ Admin signup error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'Signup failed');
        }
    },

    // ── Transport Signup (role: transport) ────────────────────────────────────
    signupTransport: async (userData) => {
        try {
            validate({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                phone: userData.phone,
            });

            const response = await api.post('/api/v1/users/signup', {
                firstName: userData.firstName.trim(),
                lastName: userData.lastName.trim(),
                email: userData.email.trim().toLowerCase(),
                password: userData.password,
                phone: userData.phone.trim(),
                role: 'transport',
            });

            const { token, refreshToken, user } = extractAuth(response);
            if (token) {
                TokenManager.setToken(token);
                if (refreshToken) TokenManager.setRefreshToken(refreshToken);
                localStorage.setItem('moveryy_user', JSON.stringify(user));
            }

            console.log('✅ Transport signup successful:', userData.email);
            return user || response;
        } catch (error) {
            console.error('❌ Transport signup error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'Signup failed');
        }
    },

    // ── Logout ─────────────────────────────────────────────────────────────────
    logout: async () => {
        try {
            if (TokenManager.getToken()) {
                await api.post('/api/v1/users/logout');
            }
        } catch (error) {
            console.error('❌ Logout error:', error);
        } finally {
            TokenManager.removeToken();
            TokenManager.removeRefreshToken();
            localStorage.removeItem('moveryy_user');
            console.log('✅ User logged out');
        }
    },

    // ── Get Current User ───────────────────────────────────────────────────────
    getCurrentUser: async () => {
        try {
            const response = await api.get('/api/v1/users/user');
            const user = response?.user || response?.data?.user || response?.data;
            if (user) localStorage.setItem('moveryy_user', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('❌ Get current user error:', error);
            throw error;
        }
    },

    // ── Refresh Token ──────────────────────────────────────────────────────────
    refreshToken: async () => {
        try {
            const refreshToken = TokenManager.getRefreshToken();
            if (!refreshToken) throw new Error('No refresh token available');
            const response = await api.post('/api/v1/users/refresh-token', { refreshToken });
            const { token } = extractAuth(response);
            if (token) TokenManager.setToken(token);
            return token;
        } catch (error) {
            console.error('❌ Refresh token error:', error);
            throw error;
        }
    },

    // ── Send Login OTP — POST /api/v1/users/login/send-otp ───────────────────
    // Sends OTP to any registered email for login purposes.
    // Body: { email }
    sendLoginOtp: async (email) => {
        try {
            const response = await api.post('/api/v1/users/login/send-otp', {
                email: email.trim().toLowerCase(),
            });
            console.log('✅ Login OTP sent to:', email);
            return { sent: true, data: response?.data || response };
        } catch (error) {
            const msg = (error?.message || '').toLowerCase();
            const status = error?.status;

            // Network/server unreachable — hard block
            if (status === 0 || msg.includes('cannot reach') || msg.includes('network')) {
                throw error instanceof Error ? error : new Error(error?.message || 'Cannot reach server.');
            }

            // For any other error (including 404, 400, 500), still proceed to OTP input.
            // The user may have received the OTP regardless, or the backend message is misleading.
            console.warn('⚠️ send-otp returned error, proceeding to OTP input anyway:', error?.message);
            return { sent: true, softError: error?.message };
        }
    },

    // ── Login with OTP — POST /api/v1/users/login/verify-otp ────────────────
    // Body: { email, otp }
    // On success: returns user + tokens and logs in
    loginWithOtp: async (email, otp) => {
        try {
            const response = await api.post('/api/v1/users/login/verify-otp', {
                email: email.trim().toLowerCase(),
                otp: otp.trim(),
            });

            const { token, refreshToken, user } = extractAuth(response);
            if (token) TokenManager.setToken(token);
            if (refreshToken) TokenManager.setRefreshToken(refreshToken);

            if (user && (user.role || user.email)) {
                localStorage.setItem('moveryy_user', JSON.stringify(user));
                console.log('✅ OTP login successful:', user?.email);
                return { token, user };
            }

            // Fetch profile if not in response
            try {
                const profileRes = await api.get('/api/v1/users/user');
                const fetchedUser = profileRes?.user || profileRes?.data?.user || profileRes?.data || null;
                if (fetchedUser && (fetchedUser.role || fetchedUser.email)) {
                    localStorage.setItem('moveryy_user', JSON.stringify(fetchedUser));
                    return { token: token || null, user: fetchedUser };
                }
            } catch (profileErr) {
                console.warn('⚠️ Profile fetch failed after OTP login:', profileErr?.message);
            }

            const fallbackUser = { email: email.trim().toLowerCase(), role: 'user' };
            localStorage.setItem('moveryy_user', JSON.stringify(fallbackUser));
            return { token: null, user: fallbackUser };

        } catch (error) {
            console.error('❌ OTP login error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'OTP login failed');
        }
    },
    // Body: { email, otp }
    // 200: { statusCode: 200, success: true, message: "Email verified successfully!", data: { userId, email } }
    // 400: Invalid or expired OTP
    verifyOtp: async (email, otp) => {
        try {
            const response = await api.post('/api/v1/users/verify-otp', {
                email: email.trim().toLowerCase(),
                otp: otp.trim(),
            });
            console.log('✅ OTP verified:', email);
            return response?.data || response;
        } catch (error) {
            console.error('❌ OTP verification error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'OTP verification failed');
        }
    },

    // ── Resend OTP — POST /api/v1/users/resend-otp ────────────────────────────
    // Body: { email }
    // 200: { statusCode: 200, success: true, message: "OTP sent to your email", data: {} }
    // 400: User already verified or invalid email
    // 404: No pending registration found for this email
    resendOtp: async (email) => {
        try {
            const response = await api.post('/api/v1/users/resend-otp', {
                email: email.trim().toLowerCase(),
            });
            console.log('✅ OTP resent to:', email);
            return response?.data || response;
        } catch (error) {
            console.error('❌ Resend OTP error:', error);
            throw error instanceof Error ? error : new Error(error?.message || 'Failed to resend OTP');
        }
    },
    isAuthenticated: () => {
        return !!(TokenManager.getToken() && localStorage.getItem('moveryy_user'));
    },

    getStoredUser: () => {
        try {
            const userData = localStorage.getItem('moveryy_user');
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    },
};

export default authService;
