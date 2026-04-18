/**
 * User Service
 * 
 * Handles all user-related API calls including bookings, service requests,
 * payments, and user profile management for customers.
 */

import { api } from './api';

export const userService = {
  // User signup - Create a new owner account
  signup: async (userData) => {
    try {
      const response = await api.post('/api/v1/users/signup', {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        phone: userData.phone,
        accountType: userData.accountType || 'user',
        agreeToTerms: userData.agreeToTerms,
      });

      if (response.success) {
        console.log('✅ User signup successful:', userData.email);
        return response.data;
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('❌ User signup error:', error);
      throw error;
    }
  },

  // Get current user - Fetch the currently logged-in user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/v1/users/user');
      if (response.success) {
        localStorage.setItem('moveryy_user', JSON.stringify(response.data));
        console.log('✅ Current user loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get user profile');
      }
    } catch (error) {
      console.error('❌ Get current user error:', error);
      throw error;
    }
  },

  // Update user password
  updatePassword: async (passwordData) => {
    try {
      const response = await api.patch('/api/v1/users/updatePassword', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      if (response.success) {
        console.log('✅ Password updated successfully');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('❌ Update password error:', error);
      throw error;
    }
  },

  // Get user dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/user/dashboard');
      if (response.success) {
        console.log('✅ User dashboard data loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('❌ User dashboard error:', error);
      throw error;
    }
  },

  // Search for movers/services
  searchMovers: async (searchParams) => {
    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const url = `/user/search/movers${queryParams ? `?${queryParams}` : ''}`;

      const response = await api.get(url);
      if (response.success) {
        console.log('✅ Movers search completed:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to search movers');
      }
    } catch (error) {
      console.error('❌ Search movers error:', error);
      throw error;
    }
  },

  // Get service details
  getServiceDetails: async (serviceId) => {
    try {
      const response = await api.get(`/user/services/${serviceId}`);
      if (response.success) {
        console.log('✅ Service details loaded:', serviceId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load service details');
      }
    } catch (error) {
      console.error('❌ Service details error:', error);
      throw error;
    }
  },

  // Create booking request
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/user/bookings', bookingData);
      if (response.success) {
        console.log('✅ Booking created:', response.data.id);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('❌ Create booking error:', error);
      throw error;
    }
  },

  // Get user bookings
  getBookings: async (status = 'all') => {
    try {
      const response = await api.get(`/user/bookings?status=${status}`);
      if (response.success) {
        console.log('✅ User bookings loaded:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('❌ User bookings error:', error);
      throw error;
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/user/bookings/${bookingId}`);
      if (response.success) {
        console.log('✅ Booking details loaded:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load booking details');
      }
    } catch (error) {
      console.error('❌ Booking details error:', error);
      throw error;
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId, reason = '') => {
    try {
      const response = await api.post(`/user/bookings/${bookingId}/cancel`, {
        reason
      });
      if (response.success) {
        console.log('✅ Booking cancelled:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('❌ Cancel booking error:', error);
      throw error;
    }
  },

  // Rate driver/service
  rateService: async (bookingId, ratingData) => {
    try {
      const response = await api.post(`/user/bookings/${bookingId}/rate`, {
        rating: ratingData.rating,
        comment: ratingData.comment || '',
        categories: ratingData.categories || {}
      });
      if (response.success) {
        console.log('✅ Service rated:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to rate service');
      }
    } catch (error) {
      console.error('❌ Rate service error:', error);
      throw error;
    }
  },

  // Get price estimate
  getPriceEstimate: async (estimateData) => {
    try {
      const response = await api.post('/user/estimate', estimateData);
      if (response.success) {
        console.log('✅ Price estimate received');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to get price estimate');
      }
    } catch (error) {
      console.error('❌ Price estimate error:', error);
      throw error;
    }
  },

  // Get available services
  getServices: async (category = 'all') => {
    try {
      const response = await api.get(`/user/services?category=${category}`);
      if (response.success) {
        console.log('✅ Services loaded:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load services');
      }
    } catch (error) {
      console.error('❌ Services error:', error);
      throw error;
    }
  },

  // Compare movers
  compareMovers: async (moverIds) => {
    try {
      const response = await api.post('/user/compare', { moverIds });
      if (response.success) {
        console.log('✅ Movers comparison loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to compare movers');
      }
    } catch (error) {
      console.error('❌ Compare movers error:', error);
      throw error;
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      if (response.success) {
        console.log('✅ User profile loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load user profile');
      }
    } catch (error) {
      console.error('❌ User profile error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/user/profile', profileData);
      if (response.success) {
        console.log('✅ User profile updated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update user profile');
      }
    } catch (error) {
      console.error('❌ Update user profile error:', error);
      throw error;
    }
  },

  // Get payment methods
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/user/payment-methods');
      if (response.success) {
        console.log('✅ Payment methods loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load payment methods');
      }
    } catch (error) {
      console.error('❌ Payment methods error:', error);
      throw error;
    }
  },

  // Add payment method
  addPaymentMethod: async (paymentData) => {
    try {
      const response = await api.post('/user/payment-methods', paymentData);
      if (response.success) {
        console.log('✅ Payment method added');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('❌ Add payment method error:', error);
      throw error;
    }
  },

  // Remove payment method
  removePaymentMethod: async (paymentMethodId) => {
    try {
      const response = await api.delete(`/user/payment-methods/${paymentMethodId}`);
      if (response.success) {
        console.log('✅ Payment method removed');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to remove payment method');
      }
    } catch (error) {
      console.error('❌ Remove payment method error:', error);
      throw error;
    }
  },

  // Get transaction history
  getTransactions: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/user/transactions?page=${page}&limit=${limit}`);
      if (response.success) {
        console.log('✅ User transactions loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load transactions');
      }
    } catch (error) {
      console.error('❌ User transactions error:', error);
      throw error;
    }
  },

  // Get notifications
  getNotifications: async (page = 1, limit = 20) => {
    try {
      const response = await api.get(`/user/notifications?page=${page}&limit=${limit}`);
      if (response.success) {
        console.log('✅ Notifications loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load notifications');
      }
    } catch (error) {
      console.error('❌ Notifications error:', error);
      throw error;
    }
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    try {
      const response = await api.patch(`/user/notifications/${notificationId}/read`);
      if (response.success) {
        console.log('✅ Notification marked as read');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to mark notification as read');
      }
    } catch (error) {
      console.error('❌ Mark notification read error:', error);
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file, onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await api.upload('/user/profile/picture', formData, onProgress);
      if (response.success) {
        console.log('✅ Profile picture uploaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error('❌ Profile picture upload error:', error);
      throw error;
    }
  },
};

export default userService;