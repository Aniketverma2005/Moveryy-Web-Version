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

      const response = await api.post('/api/v1/users/signup', {
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

      const response = await api.post('/api/v1/users/signup', {
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
  
};

export default authService;
