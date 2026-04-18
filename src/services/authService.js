/**
 * Authentication Service
 * 
 * Handles all authentication-related API calls including login, signup,
 * password reset, and user profile management.
 */

import { api, TokenManager } from './api';

export const authService = {
  // User login - Authenticate user and issue JWT
  login: async (credentials) => {
    try {
      const response = await api.post('/api/v1/users/login', {
        email: credentials.email,
        password: credentials.password,
        rememberMe: credentials.rememberMe || false,
      });

      if (response.success && response.data.token) {
        TokenManager.setToken(response.data.token);
        if (response.data.refreshToken) {
          TokenManager.setRefreshToken(response.data.refreshToken);
        }

        // Store user data
        localStorage.setItem('moveryy_user', JSON.stringify(response.data.user));

        console.log('✅ Login successful:', response.data.user.email);
        return response.data;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },

  // User signup - Business
  signupBusiness: async (userData) => {
    try {
      const response = await api.post('/auth/signup/business', {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        accountType: 'business',
        agreeToTerms: userData.agreeToTerms,
      });

      if (response.success) {
        console.log('✅ Business signup successful:', userData.email);
        return response.data;
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('❌ Business signup error:', error);
      throw error;
    }
  },

  // User signup - Admin
  signupAdmin: async (userData) => {
    try {
      const response = await api.post('/auth/signup/admin', {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        accountType: 'admin',
        agreeToTerms: userData.agreeToTerms,
      });

      if (response.success) {
        console.log('✅ Admin signup successful:', userData.email);
        return response.data;
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('❌ Admin signup error:', error);
      throw error;
    }
  },

  // Logout - Logout user
  logout: async () => {
    try {
      const token = TokenManager.getToken();
      if (token) {
        await api.post('/api/v1/users/logout');
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      TokenManager.removeToken();
      TokenManager.removeRefreshToken();
      localStorage.removeItem('moveryy_user');
      console.log('✅ User logged out');
    }
  },

  // Switch active organization (admin only)
  switchOrganization: async (organizationId) => {
    try {
      const response = await api.post('/api/v1/organizations/switch', {
        organizationId: organizationId
      });

      if (response.success) {
        // Update stored user data with new organization context
        const currentUser = authService.getStoredUser();
        if (currentUser) {
          currentUser.activeOrganization = response.data.organization;
          localStorage.setItem('moveryy_user', JSON.stringify(currentUser));
        }

        console.log('✅ Organization switched successfully:', organizationId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to switch organization');
      }
    } catch (error) {
      console.error('❌ Switch organization error:', error);
      throw error;
    }
  },

  // Get current user profile (for auth purposes only)
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.success) {
        localStorage.setItem('moveryy_user', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get user profile');
      }
    } catch (error) {
      console.error('❌ Get current user error:', error);
      throw error;
    }
  },

  // Update user profile (auth-related profile updates)
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      if (response.success) {
        localStorage.setItem('moveryy_user', JSON.stringify(response.data));
        console.log('✅ Profile updated successfully');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('❌ Update profile error:', error);
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      if (response.success) {
        console.log('✅ Password reset email sent');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('❌ Forgot password error:', error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
      if (response.success) {
        console.log('✅ Password reset successful');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('❌ Reset password error:', error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      if (response.success) {
        console.log('✅ Email verified successfully');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to verify email');
      }
    } catch (error) {
      console.error('❌ Email verification error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = TokenManager.getToken();
    const user = localStorage.getItem('moveryy_user');
    return !!(token && user);
  },

  // Get stored user data
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