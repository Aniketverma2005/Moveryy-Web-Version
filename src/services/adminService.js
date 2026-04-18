/**
 * Admin Service
 * 
 * Handles all admin-related API calls including user management,
 * analytics, system settings, and administrative operations.
 */

import { api } from './api';

export const adminService = {
  // Get admin dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      if (response.success) {
        console.log('✅ Admin dashboard data loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('❌ Admin dashboard error:', error);
      throw error;
    }
  },

  // Get analytics data
  getAnalytics: async (period = 'monthly', metrics = []) => {
    try {
      const queryParams = new URLSearchParams({
        period,
        metrics: metrics.join(',')
      }).toString();
      
      const response = await api.get(`/admin/analytics?${queryParams}`);
      if (response.success) {
        console.log('✅ Analytics data loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load analytics');
      }
    } catch (error) {
      console.error('❌ Analytics error:', error);
      throw error;
    }
  },

  // User Management
  getUsers: async (page = 1, limit = 20, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      
      const response = await api.get(`/admin/users?${queryParams}`);
      if (response.success) {
        console.log('✅ Users loaded:', response.data.users.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('❌ Get users error:', error);
      throw error;
    }
  },

  // Get user details
  getUserDetails: async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      if (response.success) {
        console.log('✅ User details loaded:', userId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load user details');
      }
    } catch (error) {
      console.error('❌ User details error:', error);
      throw error;
    }
  },

  // Update user status
  updateUserStatus: async (userId, status, reason = '') => {
    try {
      const response = await api.patch(`/admin/users/${userId}/status`, {
        status,
        reason
      });
      if (response.success) {
        console.log('✅ User status updated:', userId, status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update user status');
      }
    } catch (error) {
      console.error('❌ Update user status error:', error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (userId, reason = '') => {
    try {
      const response = await api.delete(`/admin/users/${userId}`, {
        data: { reason }
      });
      if (response.success) {
        console.log('✅ User deleted:', userId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('❌ Delete user error:', error);
      throw error;
    }
  },

  // Booking Management
  getAllBookings: async (page = 1, limit = 20, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      
      const response = await api.get(`/admin/bookings?${queryParams}`);
      if (response.success) {
        console.log('✅ All bookings loaded:', response.data.bookings.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('❌ Get all bookings error:', error);
      throw error;
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/admin/bookings/${bookingId}`);
      if (response.success) {
        console.log('✅ Admin booking details loaded:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load booking details');
      }
    } catch (error) {
      console.error('❌ Admin booking details error:', error);
      throw error;
    }
  },

  // Update booking status (admin override)
  updateBookingStatus: async (bookingId, status, notes = '') => {
    try {
      const response = await api.patch(`/admin/bookings/${bookingId}/status`, {
        status,
        adminNotes: notes
      });
      if (response.success) {
        console.log('✅ Admin booking status updated:', bookingId, status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('❌ Admin update booking status error:', error);
      throw error;
    }
  },

  // Payment Management
  getPayments: async (page = 1, limit = 20, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      
      const response = await api.get(`/admin/payments?${queryParams}`);
      if (response.success) {
        console.log('✅ Payments loaded:', response.data.payments.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load payments');
      }
    } catch (error) {
      console.error('❌ Get payments error:', error);
      throw error;
    }
  },

  // Process refund
  processRefund: async (paymentId, amount, reason) => {
    try {
      const response = await api.post(`/admin/payments/${paymentId}/refund`, {
        amount,
        reason
      });
      if (response.success) {
        console.log('✅ Refund processed:', paymentId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to process refund');
      }
    } catch (error) {
      console.error('❌ Process refund error:', error);
      throw error;
    }
  },

  // Driver Management
  getDrivers: async (page = 1, limit = 20, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      
      const response = await api.get(`/admin/drivers?${queryParams}`);
      if (response.success) {
        console.log('✅ Drivers loaded:', response.data.drivers.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load drivers');
      }
    } catch (error) {
      console.error('❌ Get drivers error:', error);
      throw error;
    }
  },

  // Approve/reject driver application
  updateDriverApplication: async (driverId, status, notes = '') => {
    try {
      const response = await api.patch(`/admin/drivers/${driverId}/application`, {
        status,
        notes
      });
      if (response.success) {
        console.log('✅ Driver application updated:', driverId, status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update driver application');
      }
    } catch (error) {
      console.error('❌ Update driver application error:', error);
      throw error;
    }
  },

  // Reviews and Ratings Management
  getReviews: async (page = 1, limit = 20, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters
      }).toString();
      
      const response = await api.get(`/admin/reviews?${queryParams}`);
      if (response.success) {
        console.log('✅ Reviews loaded:', response.data.reviews.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load reviews');
      }
    } catch (error) {
      console.error('❌ Get reviews error:', error);
      throw error;
    }
  },

  // Moderate review
  moderateReview: async (reviewId, action, reason = '') => {
    try {
      const response = await api.patch(`/admin/reviews/${reviewId}/moderate`, {
        action, // 'approve', 'reject', 'hide'
        reason
      });
      if (response.success) {
        console.log('✅ Review moderated:', reviewId, action);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to moderate review');
      }
    } catch (error) {
      console.error('❌ Moderate review error:', error);
      throw error;
    }
  },

  // System Settings
  getSettings: async () => {
    try {
      const response = await api.get('/admin/settings');
      if (response.success) {
        console.log('✅ System settings loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load settings');
      }
    } catch (error) {
      console.error('❌ Get settings error:', error);
      throw error;
    }
  },

  // Update settings
  updateSettings: async (settings) => {
    try {
      const response = await api.put('/admin/settings', settings);
      if (response.success) {
        console.log('✅ System settings updated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('❌ Update settings error:', error);
      throw error;
    }
  },

  // Offers Management
  getOffers: async (page = 1, limit = 20) => {
    try {
      const response = await api.get(`/admin/offers?page=${page}&limit=${limit}`);
      if (response.success) {
        console.log('✅ Offers loaded:', response.data.offers.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load offers');
      }
    } catch (error) {
      console.error('❌ Get offers error:', error);
      throw error;
    }
  },

  // Create offer
  createOffer: async (offerData) => {
    try {
      const response = await api.post('/admin/offers', offerData);
      if (response.success) {
        console.log('✅ Offer created:', response.data.id);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create offer');
      }
    } catch (error) {
      console.error('❌ Create offer error:', error);
      throw error;
    }
  },

  // Update offer
  updateOffer: async (offerId, offerData) => {
    try {
      const response = await api.put(`/admin/offers/${offerId}`, offerData);
      if (response.success) {
        console.log('✅ Offer updated:', offerId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update offer');
      }
    } catch (error) {
      console.error('❌ Update offer error:', error);
      throw error;
    }
  },

  // Delete offer
  deleteOffer: async (offerId) => {
    try {
      const response = await api.delete(`/admin/offers/${offerId}`);
      if (response.success) {
        console.log('✅ Offer deleted:', offerId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to delete offer');
      }
    } catch (error) {
      console.error('❌ Delete offer error:', error);
      throw error;
    }
  },

  // System Logs
  getSystemLogs: async (page = 1, limit = 50, level = 'all') => {
    try {
      const response = await api.get(`/admin/logs?page=${page}&limit=${limit}&level=${level}`);
      if (response.success) {
        console.log('✅ System logs loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load system logs');
      }
    } catch (error) {
      console.error('❌ Get system logs error:', error);
      throw error;
    }
  },

  // Export data
  exportData: async (dataType, filters = {}, format = 'csv') => {
    try {
      const queryParams = new URLSearchParams({
        type: dataType,
        format,
        ...filters
      }).toString();
      
      const response = await api.get(`/admin/export?${queryParams}`, {
        responseType: 'blob'
      });
      
      console.log('✅ Data export completed:', dataType);
      return response;
    } catch (error) {
      console.error('❌ Export data error:', error);
      throw error;
    }
  },
};

export default adminService;