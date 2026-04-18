/**
 * Booking Service Functions
 * 
 * Handles all booking-related operations including creation, management,
 * status updates, and booking lifecycle management.
 */

import { api } from './api';

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', {
        serviceType: bookingData.serviceType, // 'house-moving', 'car-transport', 'office-shifting'
        pickupLocation: {
          address: bookingData.pickupAddress,
          coordinates: bookingData.pickupCoordinates,
          contactPerson: bookingData.pickupContact,
          phone: bookingData.pickupPhone,
          instructions: bookingData.pickupInstructions
        },
        dropoffLocation: {
          address: bookingData.dropoffAddress,
          coordinates: bookingData.dropoffCoordinates,
          contactPerson: bookingData.dropoffContact,
          phone: bookingData.dropoffPhone,
          instructions: bookingData.dropoffInstructions
        },
        scheduledDate: bookingData.scheduledDate,
        scheduledTime: bookingData.scheduledTime,
        items: bookingData.items || [],
        specialRequirements: bookingData.specialRequirements || [],
        estimatedWeight: bookingData.estimatedWeight,
        estimatedVolume: bookingData.estimatedVolume,
        floorDetails: {
          pickupFloor: bookingData.pickupFloor,
          dropoffFloor: bookingData.dropoffFloor,
          hasElevator: bookingData.hasElevator
        },
        paymentMethod: bookingData.paymentMethod,
        notes: bookingData.notes || ''
      });

      if (response.success) {
        console.log('✅ Booking created successfully:', response.data.bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('❌ Create booking error:', error);
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      if (response.success) {
        console.log('✅ Booking details loaded:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load booking details');
      }
    } catch (error) {
      console.error('❌ Get booking error:', error);
      throw error;
    }
  },

  // Get user bookings with filters
  getUserBookings: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        status: filters.status || 'all',
        serviceType: filters.serviceType || 'all',
        dateFrom: filters.dateFrom || '',
        dateTo: filters.dateTo || '',
        page: filters.page || 1,
        limit: filters.limit || 20
      }).toString();

      const response = await api.get(`/bookings?${queryParams}`);
      if (response.success) {
        console.log('✅ User bookings loaded:', response.data.bookings.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('❌ Get user bookings error:', error);
      throw error;
    }
  },

  // Update booking status
  updateBookingStatus: async (bookingId, status, data = {}) => {
    try {
      const response = await api.patch(`/bookings/${bookingId}/status`, {
        status, // 'confirmed', 'in-progress', 'completed', 'cancelled'
        reason: data.reason || '',
        notes: data.notes || '',
        location: data.location || null,
        photos: data.photos || [],
        timestamp: new Date().toISOString()
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

  // Cancel booking
  cancelBooking: async (bookingId, reason, refundRequested = false) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/cancel`, {
        reason,
        refundRequested,
        cancelledAt: new Date().toISOString()
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

  // Reschedule booking
  rescheduleBooking: async (bookingId, newDate, newTime, reason = '') => {
    try {
      const response = await api.patch(`/bookings/${bookingId}/reschedule`, {
        newScheduledDate: newDate,
        newScheduledTime: newTime,
        reason,
        rescheduledAt: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Booking rescheduled:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to reschedule booking');
      }
    } catch (error) {
      console.error('❌ Reschedule booking error:', error);
      throw error;
    }
  },

  // Add items to booking
  addItemsToBooking: async (bookingId, items) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/items`, {
        items: items.map(item => ({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          weight: item.weight || 0,
          dimensions: item.dimensions || {},
          fragile: item.fragile || false,
          valuable: item.valuable || false,
          notes: item.notes || ''
        }))
      });

      if (response.success) {
        console.log('✅ Items added to booking:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add items to booking');
      }
    } catch (error) {
      console.error('❌ Add items to booking error:', error);
      throw error;
    }
  },

  // Upload booking photos
  uploadBookingPhotos: async (bookingId, photos, photoType = 'general') => {
    try {
      const formData = new FormData();
      photos.forEach((photo, index) => {
        formData.append(`photos`, photo);
      });
      formData.append('photoType', photoType); // 'before', 'during', 'after', 'damage', 'general'
      formData.append('uploadedAt', new Date().toISOString());

      const response = await api.upload(`/bookings/${bookingId}/photos`, formData);
      if (response.success) {
        console.log('✅ Booking photos uploaded:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to upload photos');
      }
    } catch (error) {
      console.error('❌ Upload booking photos error:', error);
      throw error;
    }
  },

  // Get booking timeline
  getBookingTimeline: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}/timeline`);
      if (response.success) {
        console.log('✅ Booking timeline loaded:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load booking timeline');
      }
    } catch (error) {
      console.error('❌ Get booking timeline error:', error);
      throw error;
    }
  },

  // Submit booking feedback
  submitBookingFeedback: async (bookingId, feedback) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/feedback`, {
        rating: feedback.rating, // 1-5
        serviceQuality: feedback.serviceQuality || 0,
        timeliness: feedback.timeliness || 0,
        professionalism: feedback.professionalism || 0,
        valueForMoney: feedback.valueForMoney || 0,
        comment: feedback.comment || '',
        wouldRecommend: feedback.wouldRecommend || false,
        photos: feedback.photos || [],
        submittedAt: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Booking feedback submitted:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('❌ Submit booking feedback error:', error);
      throw error;
    }
  },

  // Get price estimate for booking
  getBookingEstimate: async (estimateData) => {
    try {
      const response = await api.post('/bookings/estimate', {
        serviceType: estimateData.serviceType,
        pickupLocation: estimateData.pickupLocation,
        dropoffLocation: estimateData.dropoffLocation,
        scheduledDate: estimateData.scheduledDate,
        items: estimateData.items || [],
        specialRequirements: estimateData.specialRequirements || [],
        floorDetails: estimateData.floorDetails || {}
      });

      if (response.success) {
        console.log('✅ Booking estimate calculated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to calculate estimate');
      }
    } catch (error) {
      console.error('❌ Get booking estimate error:', error);
      throw error;
    }
  },

  // Track booking in real-time
  trackBooking: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}/track`);
      if (response.success) {
        console.log('✅ Booking tracking data loaded:', bookingId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load tracking data');
      }
    } catch (error) {
      console.error('❌ Track booking error:', error);
      throw error;
    }
  },

  // Get available time slots
  getAvailableTimeSlots: async (date, serviceType, location) => {
    try {
      const response = await api.get('/bookings/available-slots', {
        params: {
          date,
          serviceType,
          latitude: location.latitude,
          longitude: location.longitude
        }
      });

      if (response.success) {
        console.log('✅ Available time slots loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load available slots');
      }
    } catch (error) {
      console.error('❌ Get available time slots error:', error);
      throw error;
    }
  },

  // Validate booking data
  validateBookingData: (bookingData) => {
    const errors = [];

    // Required fields validation
    if (!bookingData.serviceType) {
      errors.push('Service type is required');
    }

    if (!bookingData.pickupAddress) {
      errors.push('Pickup address is required');
    }

    if (!bookingData.dropoffAddress) {
      errors.push('Dropoff address is required');
    }

    if (!bookingData.scheduledDate) {
      errors.push('Scheduled date is required');
    }

    if (!bookingData.scheduledTime) {
      errors.push('Scheduled time is required');
    }

    // Date validation
    const scheduledDateTime = new Date(`${bookingData.scheduledDate}T${bookingData.scheduledTime}`);
    const now = new Date();
    
    if (scheduledDateTime <= now) {
      errors.push('Scheduled date and time must be in the future');
    }

    // Contact validation
    if (bookingData.pickupPhone && !/^\+?[\d\s-()]+$/.test(bookingData.pickupPhone)) {
      errors.push('Invalid pickup phone number format');
    }

    if (bookingData.dropoffPhone && !/^\+?[\d\s-()]+$/.test(bookingData.dropoffPhone)) {
      errors.push('Invalid dropoff phone number format');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Format booking data for display
  formatBookingForDisplay: (booking) => {
    return {
      id: booking.id,
      serviceType: booking.serviceType,
      status: booking.status,
      statusDisplay: booking.status.replace('-', ' ').toUpperCase(),
      pickupAddress: booking.pickupLocation?.address || 'N/A',
      dropoffAddress: booking.dropoffLocation?.address || 'N/A',
      scheduledDateTime: new Date(`${booking.scheduledDate}T${booking.scheduledTime}`),
      formattedDate: new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(new Date(`${booking.scheduledDate}T${booking.scheduledTime}`)),
      formattedTime: new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date(`${booking.scheduledDate}T${booking.scheduledTime}`)),
      totalAmount: booking.pricing?.total || 0,
      formattedAmount: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(booking.pricing?.total || 0),
      driverInfo: booking.assignedDriver || null,
      canCancel: ['pending', 'confirmed'].includes(booking.status),
      canReschedule: ['pending', 'confirmed'].includes(booking.status),
      canTrack: ['confirmed', 'in-progress'].includes(booking.status),
      canRate: booking.status === 'completed' && !booking.feedback
    };
  }
};

export default bookingService;