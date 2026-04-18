/**
 * Transport Service
 * 
 * Handles all transport/driver-related API calls including orders,
 * bookings, earnings, ratings, and driver operations.
 */

import { api } from './api';

export const transportService = {
  // Get driver dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/transport/dashboard');
      if (response.success) {
        console.log('✅ Dashboard data loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('❌ Dashboard data error:', error);
      throw error;
    }
  },

  // Get available orders for driver
  getAvailableOrders: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = `/transport/orders/available${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await api.get(url);
      if (response.success) {
        console.log('✅ Available orders loaded:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load available orders');
      }
    } catch (error) {
      console.error('❌ Available orders error:', error);
      throw error;
    }
  },

  // Accept an order
  acceptOrder: async (orderId) => {
    try {
      const response = await api.post(`/transport/orders/${orderId}/accept`);
      if (response.success) {
        console.log('✅ Order accepted:', orderId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to accept order');
      }
    } catch (error) {
      console.error('❌ Accept order error:', error);
      throw error;
    }
  },

  // Reject an order
  rejectOrder: async (orderId, reason = '') => {
    try {
      const response = await api.post(`/transport/orders/${orderId}/reject`, {
        reason
      });
      if (response.success) {
        console.log('✅ Order rejected:', orderId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to reject order');
      }
    } catch (error) {
      console.error('❌ Reject order error:', error);
      throw error;
    }
  },

  // Get driver bookings
  getBookings: async (status = 'all') => {
    try {
      const response = await api.get(`/transport/bookings?status=${status}`);
      if (response.success) {
        console.log('✅ Bookings loaded:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('❌ Bookings error:', error);
      throw error;
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/transport/bookings/${bookingId}`);
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

  // Update booking status
  updateBookingStatus: async (bookingId, status, data = {}) => {
    try {
      const response = await api.patch(`/transport/bookings/${bookingId}/status`, {
        status,
        ...data
      });
      if (response.success) {
        console.log('✅ Booking status updated:', bookingId, status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('❌ Update booking status error:', error);
      throw error;
    }
  },

  // Start trip
  startTrip: async (bookingId, location = null) => {
    try {
      const response = await api.post(`/transport/bookings/${bookingId}/start`, {
        startLocation: location,
        startTime: new Date().toISOString()
      });
      if (response.success) {
        console.log('✅ Trip started:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to start trip');
      }
    } catch (error) {
      console.error('❌ Start trip error:', error);
      throw error;
    }
  },

  // Complete trip
  completeTrip: async (bookingId, completionData) => {
    try {
      const response = await api.post(`/transport/bookings/${bookingId}/complete`, {
        endLocation: completionData.location,
        endTime: new Date().toISOString(),
        notes: completionData.notes || '',
        photos: completionData.photos || []
      });
      if (response.success) {
        console.log('✅ Trip completed:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to complete trip');
      }
    } catch (error) {
      console.error('❌ Complete trip error:', error);
      throw error;
    }
  },

  // Get earnings data
  getEarnings: async (period = 'monthly') => {
    try {
      const response = await api.get(`/transport/earnings?period=${period}`);
      if (response.success) {
        console.log('✅ Earnings data loaded:', period);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load earnings data');
      }
    } catch (error) {
      console.error('❌ Earnings data error:', error);
      throw error;
    }
  },

  // Get earnings summary
  getEarningsSummary: async () => {
    try {
      const response = await api.get('/transport/earnings/summary');
      if (response.success) {
        console.log('✅ Earnings summary loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load earnings summary');
      }
    } catch (error) {
      console.error('❌ Earnings summary error:', error);
      throw error;
    }
  },

  // Get transactions
  getTransactions: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/transport/transactions?page=${page}&limit=${limit}`);
      if (response.success) {
        console.log('✅ Transactions loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load transactions');
      }
    } catch (error) {
      console.error('❌ Transactions error:', error);
      throw error;
    }
  },

  // Get ratings
  getRatings: async () => {
    try {
      const response = await api.get('/transport/ratings');
      if (response.success) {
        console.log('✅ Ratings loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load ratings');
      }
    } catch (error) {
      console.error('❌ Ratings error:', error);
      throw error;
    }
  },

  // Submit customer rating
  submitCustomerRating: async (customerId, orderId, ratingData) => {
    try {
      const response = await api.post('/transport/ratings/customer', {
        customerId,
        orderId,
        rating: ratingData.rating,
        comment: ratingData.comment || ''
      });
      if (response.success) {
        console.log('✅ Customer rating submitted:', customerId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('❌ Submit rating error:', error);
      throw error;
    }
  },

  // Update driver location
  updateLocation: async (latitude, longitude) => {
    try {
      const response = await api.post('/transport/location', {
        latitude,
        longitude,
        timestamp: new Date().toISOString()
      });
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update location');
      }
    } catch (error) {
      console.error('❌ Update location error:', error);
      throw error;
    }
  },

  // Update driver status (online/offline)
  updateDriverStatus: async (status) => {
    try {
      const response = await api.patch('/transport/status', { status });
      if (response.success) {
        console.log('✅ Driver status updated:', status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update driver status');
      }
    } catch (error) {
      console.error('❌ Update driver status error:', error);
      throw error;
    }
  },

  // Upload documents
  uploadDocument: async (documentType, file, onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('type', documentType);

      const response = await api.upload('/transport/documents', formData, onProgress);
      if (response.success) {
        console.log('✅ Document uploaded:', documentType);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to upload document');
      }
    } catch (error) {
      console.error('❌ Document upload error:', error);
      throw error;
    }
  },

  // Get driver profile
  getDriverProfile: async () => {
    try {
      const response = await api.get('/transport/profile');
      if (response.success) {
        console.log('✅ Driver profile loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver profile');
      }
    } catch (error) {
      console.error('❌ Driver profile error:', error);
      throw error;
    }
  },

  // Update driver profile
  updateDriverProfile: async (profileData) => {
    try {
      const response = await api.put('/transport/profile', profileData);
      if (response.success) {
        console.log('✅ Driver profile updated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update driver profile');
      }
    } catch (error) {
      console.error('❌ Update driver profile error:', error);
      throw error;
    }
  },
};

export default transportService;