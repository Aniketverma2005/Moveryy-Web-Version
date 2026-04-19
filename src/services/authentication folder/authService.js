/**
 * Authentication Service
 *
 * Correct backend endpoints (confirmed from backend routes):
 *  POST /api/v1/users/signup    → register new user
 *  POST /api/v1/users/login     → login
 *  POST /api/v1/users/logout    → logout (requires token)
 *  POST /api/v1/users/refresh-token → refresh access token
 *  GET  /api/v1/users/user      → get current user (requires token)
 *
 * Validation rules:
 *  - firstName / lastName  → required
 *  - email                 → valid format
 *  - password              → min 8 chars
 *  - phone                 → international format (+[country][number], 7–15 digits)
 *  - role                  → one of: admin | user | transport
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
const extractAuth = (response) => {
  const token = response?.accessToken || response?.token || response?.data?.accessToken || response?.data?.token;
  const refreshToken = response?.refreshToken || response?.data?.refreshToken;
  const user = response?.user || response?.data?.user || response?.data;
  return { token, refreshToken, user };
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

      const { token, refreshToken, user } = extractAuth(response);

      if (token) {
        TokenManager.setToken(token);
        if (refreshToken) TokenManager.setRefreshToken(refreshToken);
        localStorage.setItem('moveryy_user', JSON.stringify(user));
        console.log('✅ Login successful:', user?.email);
        return { token, user };
      } else {
        throw new Error(response?.message || 'Login failed — no token received');
      }
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

      // Correct endpoint: /api/v1/users/signup
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

  // ── Helpers ────────────────────────────────────────────────────────────────
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
