/**
 * Authentication Service
 *
 * Handles all authentication-related API calls including login, signup,
 * password reset, and user profile management.
 *
 * Validation rules (enforced by backend):
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
  lastName:  (v) => v && v.trim().length > 0,
  email:     (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  password:  (v) => v && v.length >= 8,
  phone:     (v) => /^\+[1-9]\d{6,14}$/.test(v),
  role:      (v) => ['admin', 'user', 'transport'].includes(v),
};

const validate = (fields) => {
  const errors = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (validators[key] && !validators[key](value)) {
      errors[key] = `Invalid ${key}`;
    }
  });
  if (Object.keys(errors).length > 0) {
    const err = new Error('Validation failed');
    err.validationErrors = errors;
    throw err;
  }
};

// ─── Auth Service ─────────────────────────────────────────────────────────────

export const authService = {

  // Login — payload: { email, password }
  login: async (credentials) => {
    try {
      validate({
        email:    credentials.email,
        password: credentials.password,
      });

      const response = await api.post('/api/v1/users/login', {
        email:    credentials.email,
        password: credentials.password,
      });

      // Handle both response shapes: { token } or { data: { token } }
      const token       = response.token       || response.data?.token;
      const refreshToken = response.refreshToken || response.data?.refreshToken;
      const user        = response.user         || response.data?.user || response.data;

      if (token) {
        TokenManager.setToken(token);
        if (refreshToken) TokenManager.setRefreshToken(refreshToken);
        localStorage.setItem('moveryy_user', JSON.stringify(user));
        console.log('✅ Login successful:', user?.email);
        return { token, user };
      } else {
        throw new Error(response.message || 'Login failed — no token received');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },

  // Business signup — role: 'user'
  signupBusiness: async (userData) => {
    try {
      validate({
        firstName: userData.firstName,
        lastName:  userData.lastName,
        email:     userData.email,
        password:  userData.password,
        phone:     userData.phone,
        role:      'user',
      });

      const response = await api.post('/api/v1/users/register', {
        firstName:    userData.firstName.trim(),
        lastName:     userData.lastName.trim(),
        email:        userData.email.trim().toLowerCase(),
        password:     userData.password,
        phone:        userData.phone.trim(),
        role:         'user',
        agreeToTerms: userData.agreeToTerms,
      });

      const user = response.user || response.data?.user || response.data;
      console.log('✅ Business signup successful:', userData.email);
      return user;
    } catch (error) {
      console.error('❌ Business signup error:', error);
      throw error;
    }
  },

  // Admin signup — role: 'admin'
  signupAdmin: async (userData) => {
    try {
      validate({
        firstName: userData.firstName,
        lastName:  userData.lastName,
        email:     userData.email,
        password:  userData.password,
        phone:     userData.phone,
        role:      'admin',
      });

      const response = await api.post('/api/v1/users/register', {
        firstName:    userData.firstName.trim(),
        lastName:     userData.lastName.trim(),
        email:        userData.email.trim().toLowerCase(),
        password:     userData.password,
        phone:        userData.phone.trim(),
        role:         'admin',
        agreeToTerms: userData.agreeToTerms,
      });

      const user = response.user || response.data?.user || response.data;
      console.log('✅ Admin signup successful:', userData.email);
      return user;
    } catch (error) {
      console.error('❌ Admin signup error:', error);
      throw error;
    }
  },

  // Transport signup — role: 'transport'
  signupTransport: async (userData) => {
    try {
      validate({
        firstName: userData.firstName,
        lastName:  userData.lastName,
        email:     userData.email,
        password:  userData.password,
        phone:     userData.phone,
        role:      'transport',
      });

      const response = await api.post('/api/v1/users/register', {
        firstName:    userData.firstName.trim(),
        lastName:     userData.lastName.trim(),
        email:        userData.email.trim().toLowerCase(),
        password:     userData.password,
        phone:        userData.phone.trim(),
        role:         'transport',
        agreeToTerms: userData.agreeToTerms,
      });

      const user = response.user || response.data?.user || response.data;
      console.log('✅ Transport signup successful:', userData.email);
      return user;
    } catch (error) {
      console.error('❌ Transport signup error:', error);
      throw error;
    }
  },

  // Logout
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

  // Get current user from API
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/v1/users/me');
      const user = response.user || response.data?.user || response.data;
      localStorage.setItem('moveryy_user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('❌ Get current user error:', error);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/v1/users/profile', profileData);
      const user = response.user || response.data?.user || response.data;
      localStorage.setItem('moveryy_user', JSON.stringify(user));
      console.log('✅ Profile updated successfully');
      return user;
    } catch (error) {
      console.error('❌ Update profile error:', error);
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      validate({ email });
      const response = await api.post('/api/v1/users/forgot-password', { email });
      console.log('✅ Password reset email sent');
      return response.data || response;
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      validate({ password: newPassword });
      const response = await api.post('/api/v1/users/reset-password', {
        token,
        password: newPassword,
      });
      console.log('✅ Password reset successful');
      return response.data || response;
    } catch (error) {
      console.error('❌ Reset password error:', error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/api/v1/users/verify-email', { token });
      console.log('✅ Email verified successfully');
      return response.data || response;
    } catch (error) {
      console.error('❌ Email verification error:', error);
      throw error;
    }
  },

  // Check authentication status
  isAuthenticated: () => {
    return !!(TokenManager.getToken() && localStorage.getItem('moveryy_user'));
  },

  // Get stored user
  getStoredUser: () => {
    try {
      const userData = localStorage.getItem('moveryy_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('❌ Error parsing stored user data:', error);
      return null;
    }
  },
};

export default authService;
