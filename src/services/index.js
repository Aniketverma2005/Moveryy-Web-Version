/**
 * Services Index
 * 
 * Central export point for all API services and utilities.
 * This makes it easy to import services throughout the application.
 */

// Core API client
export { api, TokenManager } from './api';

// Authentication services
export { authService } from './authService';

// User services
export { userService } from './userService';

// Transport/Driver services
export { transportService } from './transportService';

// Admin services
export { adminService } from './adminService';

// Specialized service functions
export { bookingService } from './bookingService';
export { paymentService } from './paymentService';
export { searchService } from './searchService';
export { driverService } from './driverService';

// Utility services
export { default as notificationService } from './notificationService';
export { default as locationService } from './locationService';

// Service configuration
export const serviceConfig = {
  // API endpoints
  endpoints: {
    auth: '/auth',
    user: '/user',
    transport: '/transport',
    driver: '/driver',
    admin: '/admin',
    bookings: '/bookings',
    payments: '/payments',
    search: '/search',
    notifications: '/notifications',
    location: '/location'
  },
  
  // Default pagination
  pagination: {
    defaultPage: 1,
    defaultLimit: 20,
    maxLimit: 100
  },
  
  // File upload limits
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  },
  
  // Location settings
  location: {
    defaultRadius: 10, // km
    maxRadius: 100, // km
    updateInterval: 30000, // 30 seconds
    highAccuracy: true
  },
  
  // Notification settings
  notifications: {
    reconnectAttempts: 5,
    reconnectDelay: 1000,
    showBrowserNotifications: true
  },

  // Payment settings
  payment: {
    supportedMethods: ['card', 'upi', 'wallet', 'netbanking', 'cod'],
    defaultCurrency: 'INR',
    timeout: 300000, // 5 minutes
    retryAttempts: 3
  },

  // Search settings
  search: {
    defaultRadius: 25, // km
    maxResults: 50,
    cacheTimeout: 300000, // 5 minutes
    suggestionLimit: 10
  },

  // Driver settings
  driver: {
    locationUpdateInterval: 30000, // 30 seconds
    orderTimeout: 300000, // 5 minutes to accept
    maxActiveOrders: 3,
    performanceThreshold: 80 // minimum performance score
  }
};

// Service status checker
export const checkServiceHealth = async () => {
  try {
    const response = await api.get('/health');
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: response.data
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
};

// Initialize all services
export const initializeServices = async () => {
  try {
    console.log('🚀 Initializing Moveryy services...');
    
    // Initialize notification service
    await notificationService.initialize();
    
    // Check service health
    const health = await checkServiceHealth();
    console.log('🏥 Service health:', health.status);
    
    console.log('✅ All services initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize services:', error);
    return false;
  }
};

// Cleanup services
export const cleanupServices = () => {
  try {
    console.log('🧹 Cleaning up services...');
    
    // Disconnect notification service
    notificationService.disconnect();
    
    // Stop location watching
    locationService.stopWatching();
    
    console.log('✅ Services cleaned up successfully');
  } catch (error) {
    console.error('❌ Failed to cleanup services:', error);
  }
};

// Error handling utilities
export const handleServiceError = (error, context = '') => {
  const errorInfo = {
    message: error.message || 'Unknown error',
    status: error.status || 500,
    code: error.code || 'UNKNOWN_ERROR',
    context,
    timestamp: new Date().toISOString()
  };
  
  console.error(`❌ Service Error [${context}]:`, errorInfo);
  
  // You can add error reporting service here
  // errorReportingService.report(errorInfo);
  
  return errorInfo;
};

// Service utilities
export const serviceUtils = {
  // Format API response
  formatResponse: (response) => {
    return {
      success: response.success || false,
      data: response.data || null,
      message: response.message || '',
      timestamp: new Date().toISOString()
    };
  },
  
  // Build query parameters
  buildQueryParams: (params) => {
    const filtered = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    
    return new URLSearchParams(filtered).toString();
  },
  
  // Validate file upload
  validateFileUpload: (file, type = 'image') => {
    const config = serviceConfig.upload;
    
    if (file.size > config.maxFileSize) {
      throw new Error(`File size exceeds ${config.maxFileSize / (1024 * 1024)}MB limit`);
    }
    
    const allowedTypes = type === 'image' ? config.allowedImageTypes : config.allowedDocumentTypes;
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File type ${file.type} is not allowed`);
    }
    
    return true;
  },
  
  // Format currency
  formatCurrency: (amount, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  },
  
  // Format date
  formatDate: (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Intl.DateTimeFormat('en-IN', { ...defaultOptions, ...options }).format(new Date(date));
  },
  
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Generate unique ID
  generateId: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  // Validate email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate phone number
  validatePhone: (phone) => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  // Calculate distance between coordinates
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// Service function collections
export const serviceFunctions = {
  // Booking functions
  booking: bookingService,
  
  // Payment functions
  payment: paymentService,
  
  // Search functions
  search: searchService,
  
  // Driver functions
  driver: driverService,
  
  // Combined utility functions
  utils: serviceUtils
};

export default {
  api,
  TokenManager,
  authService,
  userService,
  transportService,
  adminService,
  bookingService,
  paymentService,
  searchService,
  driverService,
  notificationService,
  locationService,
  serviceConfig,
  checkServiceHealth,
  initializeServices,
  cleanupServices,
  handleServiceError,
  serviceUtils,
  serviceFunctions
};