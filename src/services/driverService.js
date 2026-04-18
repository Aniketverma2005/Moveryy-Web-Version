/**
 * Driver Service Functions
 * 
 * Handles all driver-specific operations including order management,
 * earnings tracking, vehicle management, and driver profile operations.
 */

import { api } from './api';

export const driverService = {
  // Get driver dashboard data
  getDriverDashboard: async () => {
    try {
      const response = await api.get('/driver/dashboard');
      if (response.success) {
        console.log('✅ Driver dashboard loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver dashboard');
      }
    } catch (error) {
      console.error('❌ Get driver dashboard error:', error);
      throw error;
    }
  },

  // Get available orders for driver
  getAvailableOrders: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        serviceType: filters.serviceType || 'all',
        radius: filters.radius || 25,
        minAmount: filters.minAmount || 0,
        maxDistance: filters.maxDistance || 50,
        sortBy: filters.sortBy || 'distance',
        page: filters.page || 1,
        limit: filters.limit || 20
      }).toString();

      const response = await api.get(`/driver/orders/available?${queryParams}`);
      if (response.success) {
        console.log('✅ Available orders loaded:', response.data.orders.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load available orders');
      }
    } catch (error) {
      console.error('❌ Get available orders error:', error);
      throw error;
    }
  },

  // Accept an order
  acceptOrder: async (orderId, acceptanceData = {}) => {
    try {
      const response = await api.post(`/driver/orders/${orderId}/accept`, {
        estimatedArrival: acceptanceData.estimatedArrival,
        notes: acceptanceData.notes || '',
        vehicleId: acceptanceData.vehicleId,
        acceptedAt: new Date().toISOString()
      });

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
  rejectOrder: async (orderId, reason) => {
    try {
      const response = await api.post(`/driver/orders/${orderId}/reject`, {
        reason,
        rejectedAt: new Date().toISOString()
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

  // Get driver's active orders
  getActiveOrders: async () => {
    try {
      const response = await api.get('/driver/orders/active');
      if (response.success) {
        console.log('✅ Active orders loaded:', response.data.orders.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load active orders');
      }
    } catch (error) {
      console.error('❌ Get active orders error:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status, updateData = {}) => {
    try {
      const response = await api.patch(`/driver/orders/${orderId}/status`, {
        status, // 'en-route-pickup', 'arrived-pickup', 'loading', 'in-transit', 'arrived-dropoff', 'unloading', 'completed'
        location: updateData.location,
        notes: updateData.notes || '',
        photos: updateData.photos || [],
        timestamp: new Date().toISOString(),
        additionalData: updateData.additionalData || {}
      });

      if (response.success) {
        console.log('✅ Order status updated:', orderId, status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('❌ Update order status error:', error);
      throw error;
    }
  },

  // Start trip
  startTrip: async (orderId, startData) => {
    try {
      const response = await api.post(`/driver/orders/${orderId}/start`, {
        startLocation: startData.location,
        odometerReading: startData.odometerReading,
        fuelLevel: startData.fuelLevel,
        vehicleCondition: startData.vehicleCondition || 'good',
        photos: startData.photos || [],
        startTime: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Trip started:', orderId);
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
  completeTrip: async (orderId, completionData) => {
    try {
      const response = await api.post(`/driver/orders/${orderId}/complete`, {
        endLocation: completionData.location,
        odometerReading: completionData.odometerReading,
        fuelLevel: completionData.fuelLevel,
        deliveryConfirmation: completionData.deliveryConfirmation,
        customerSignature: completionData.customerSignature,
        photos: completionData.photos || [],
        notes: completionData.notes || '',
        damages: completionData.damages || [],
        completedTime: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Trip completed:', orderId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to complete trip');
      }
    } catch (error) {
      console.error('❌ Complete trip error:', error);
      throw error;
    }
  },

  // Get driver earnings
  getDriverEarnings: async (period = 'monthly') => {
    try {
      const response = await api.get(`/driver/earnings?period=${period}`);
      if (response.success) {
        console.log('✅ Driver earnings loaded:', period);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver earnings');
      }
    } catch (error) {
      console.error('❌ Get driver earnings error:', error);
      throw error;
    }
  },

  // Get earnings breakdown
  getEarningsBreakdown: async (startDate, endDate) => {
    try {
      const response = await api.get('/driver/earnings/breakdown', {
        params: { startDate, endDate }
      });
      
      if (response.success) {
        console.log('✅ Earnings breakdown loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load earnings breakdown');
      }
    } catch (error) {
      console.error('❌ Get earnings breakdown error:', error);
      throw error;
    }
  },

  // Get driver transactions
  getDriverTransactions: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        type: filters.type || 'all', // 'earning', 'deduction', 'bonus', 'refund'
        status: filters.status || 'all',
        dateFrom: filters.dateFrom || '',
        dateTo: filters.dateTo || '',
        page: filters.page || 1,
        limit: filters.limit || 20
      }).toString();

      const response = await api.get(`/driver/transactions?${queryParams}`);
      if (response.success) {
        console.log('✅ Driver transactions loaded:', response.data.transactions.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver transactions');
      }
    } catch (error) {
      console.error('❌ Get driver transactions error:', error);
      throw error;
    }
  },

  // Update driver status
  updateDriverStatus: async (status, location = null) => {
    try {
      const response = await api.patch('/driver/status', {
        status, // 'online', 'offline', 'busy', 'break'
        location,
        timestamp: new Date().toISOString()
      });

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

  // Update driver location
  updateDriverLocation: async (location) => {
    try {
      const response = await api.post('/driver/location', {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        heading: location.heading,
        speed: location.speed,
        timestamp: new Date().toISOString()
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update driver location');
      }
    } catch (error) {
      console.error('❌ Update driver location error:', error);
      throw error;
    }
  },

  // Get driver profile
  getDriverProfile: async () => {
    try {
      const response = await api.get('/driver/profile');
      if (response.success) {
        console.log('✅ Driver profile loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver profile');
      }
    } catch (error) {
      console.error('❌ Get driver profile error:', error);
      throw error;
    }
  },

  // Update driver profile
  updateDriverProfile: async (profileData) => {
    try {
      const response = await api.put('/driver/profile', {
        personalInfo: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          email: profileData.email,
          dateOfBirth: profileData.dateOfBirth,
          address: profileData.address
        },
        drivingInfo: {
          licenseNumber: profileData.licenseNumber,
          licenseExpiry: profileData.licenseExpiry,
          experience: profileData.experience,
          languages: profileData.languages || []
        },
        bankDetails: {
          accountNumber: profileData.accountNumber,
          ifscCode: profileData.ifscCode,
          accountHolderName: profileData.accountHolderName,
          bankName: profileData.bankName
        },
        preferences: {
          workingHours: profileData.workingHours,
          serviceTypes: profileData.serviceTypes || [],
          maxDistance: profileData.maxDistance || 50
        }
      });

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

  // Upload driver documents
  uploadDriverDocument: async (documentType, file, onProgress = null) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      formData.append('type', documentType); // 'license', 'aadhar', 'pan', 'vehicle_rc', 'insurance'
      formData.append('uploadedAt', new Date().toISOString());

      const response = await api.upload('/driver/documents', formData, onProgress);
      if (response.success) {
        console.log('✅ Driver document uploaded:', documentType);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to upload document');
      }
    } catch (error) {
      console.error('❌ Upload driver document error:', error);
      throw error;
    }
  },

  // Get driver vehicles
  getDriverVehicles: async () => {
    try {
      const response = await api.get('/driver/vehicles');
      if (response.success) {
        console.log('✅ Driver vehicles loaded:', response.data.vehicles.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver vehicles');
      }
    } catch (error) {
      console.error('❌ Get driver vehicles error:', error);
      throw error;
    }
  },

  // Add driver vehicle
  addDriverVehicle: async (vehicleData) => {
    try {
      const response = await api.post('/driver/vehicles', {
        type: vehicleData.type, // 'bike', 'car', 'van', 'truck'
        make: vehicleData.make,
        model: vehicleData.model,
        year: vehicleData.year,
        registrationNumber: vehicleData.registrationNumber,
        capacity: vehicleData.capacity,
        dimensions: vehicleData.dimensions || {},
        features: vehicleData.features || [],
        insuranceDetails: {
          policyNumber: vehicleData.insurancePolicyNumber,
          expiryDate: vehicleData.insuranceExpiry,
          provider: vehicleData.insuranceProvider
        },
        isActive: vehicleData.isActive || true
      });

      if (response.success) {
        console.log('✅ Driver vehicle added:', response.data.vehicleId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to add driver vehicle');
      }
    } catch (error) {
      console.error('❌ Add driver vehicle error:', error);
      throw error;
    }
  },

  // Update vehicle status
  updateVehicleStatus: async (vehicleId, status, notes = '') => {
    try {
      const response = await api.patch(`/driver/vehicles/${vehicleId}/status`, {
        status, // 'active', 'maintenance', 'inactive'
        notes,
        updatedAt: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Vehicle status updated:', vehicleId, status);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update vehicle status');
      }
    } catch (error) {
      console.error('❌ Update vehicle status error:', error);
      throw error;
    }
  },

  // Get driver ratings and reviews
  getDriverRatings: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        rating: filters.rating || 'all',
        dateFrom: filters.dateFrom || '',
        dateTo: filters.dateTo || '',
        page: filters.page || 1,
        limit: filters.limit || 20
      }).toString();

      const response = await api.get(`/driver/ratings?${queryParams}`);
      if (response.success) {
        console.log('✅ Driver ratings loaded:', response.data.ratings.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver ratings');
      }
    } catch (error) {
      console.error('❌ Get driver ratings error:', error);
      throw error;
    }
  },

  // Submit customer rating
  rateCustomer: async (orderId, ratingData) => {
    try {
      const response = await api.post(`/driver/orders/${orderId}/rate-customer`, {
        rating: ratingData.rating, // 1-5
        categories: {
          communication: ratingData.communication || 0,
          punctuality: ratingData.punctuality || 0,
          cooperation: ratingData.cooperation || 0,
          paymentBehavior: ratingData.paymentBehavior || 0
        },
        comment: ratingData.comment || '',
        wouldWorkAgain: ratingData.wouldWorkAgain || false,
        submittedAt: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Customer rating submitted:', orderId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to submit customer rating');
      }
    } catch (error) {
      console.error('❌ Rate customer error:', error);
      throw error;
    }
  },

  // Get driver statistics
  getDriverStatistics: async (period = '30d') => {
    try {
      const response = await api.get(`/driver/statistics?period=${period}`);
      if (response.success) {
        console.log('✅ Driver statistics loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver statistics');
      }
    } catch (error) {
      console.error('❌ Get driver statistics error:', error);
      throw error;
    }
  },

  // Report an issue
  reportIssue: async (issueData) => {
    try {
      const response = await api.post('/driver/issues', {
        type: issueData.type, // 'customer', 'payment', 'vehicle', 'app', 'other'
        orderId: issueData.orderId || null,
        title: issueData.title,
        description: issueData.description,
        priority: issueData.priority || 'medium',
        photos: issueData.photos || [],
        reportedAt: new Date().toISOString()
      });

      if (response.success) {
        console.log('✅ Issue reported:', response.data.issueId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to report issue');
      }
    } catch (error) {
      console.error('❌ Report issue error:', error);
      throw error;
    }
  },

  // Get driver notifications
  getDriverNotifications: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        type: filters.type || 'all',
        read: filters.read || 'all',
        page: filters.page || 1,
        limit: filters.limit || 20
      }).toString();

      const response = await api.get(`/driver/notifications?${queryParams}`);
      if (response.success) {
        console.log('✅ Driver notifications loaded:', response.data.notifications.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load driver notifications');
      }
    } catch (error) {
      console.error('❌ Get driver notifications error:', error);
      throw error;
    }
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    try {
      const response = await api.patch(`/driver/notifications/${notificationId}/read`);
      if (response.success) {
        console.log('✅ Notification marked as read:', notificationId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to mark notification as read');
      }
    } catch (error) {
      console.error('❌ Mark notification read error:', error);
      throw error;
    }
  },

  // Calculate driver performance score
  calculatePerformanceScore: (driverData) => {
    let score = 0;
    let totalWeight = 0;

    // Rating score (30% weight)
    if (driverData.rating) {
      score += (driverData.rating / 5) * 30;
      totalWeight += 30;
    }

    // Completion rate (25% weight)
    if (driverData.completionRate) {
      score += (driverData.completionRate / 100) * 25;
      totalWeight += 25;
    }

    // On-time delivery (20% weight)
    if (driverData.onTimeRate) {
      score += (driverData.onTimeRate / 100) * 20;
      totalWeight += 20;
    }

    // Customer satisfaction (15% weight)
    if (driverData.customerSatisfaction) {
      score += (driverData.customerSatisfaction / 100) * 15;
      totalWeight += 15;
    }

    // Response time (10% weight)
    if (driverData.avgResponseTime) {
      const responseScore = Math.max(0, (300 - driverData.avgResponseTime) / 300); // 5 minutes max
      score += responseScore * 10;
      totalWeight += 10;
    }

    return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
  },

  // Format driver earnings for display
  formatDriverEarnings: (earnings) => {
    return {
      ...earnings,
      formattedTotal: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(earnings.total || 0),
      formattedDaily: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(earnings.dailyAverage || 0),
      formattedPerTrip: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(earnings.perTripAverage || 0)
    };
  }
};

export default driverService;