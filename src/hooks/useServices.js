/**
 * useServices Hook
 * 
 * Custom React hook that provides easy access to all Moveryy services
 * with built-in loading states, error handling, and caching.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  authService,
  userService,
  transportService,
  adminService,
  notificationService,
  locationService,
  handleServiceError
} from '../services';

// Custom hook for API calls with loading and error states
export const useApiCall = (serviceMethod, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (...args) => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);

    try {
      const result = await serviceMethod(...args);
      setData(result);
      setLastFetch(new Date());
      return result;
    } catch (err) {
      if (err.name !== 'AbortError') {
        const errorInfo = handleServiceError(err, serviceMethod.name);
        setError(errorInfo);
        throw errorInfo;
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, dependencies);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLastFetch(null);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    lastFetch,
    execute,
    reset
  };
};

// Authentication hooks
export const useAuth = () => {
  const [user, setUser] = useState(authService.getStoredUser());
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  const login = useApiCall(authService.login);
  const signupBusiness = useApiCall(authService.signupBusiness);
  const signupAdmin = useApiCall(authService.signupAdmin);
  const getCurrentUser = useApiCall(authService.getCurrentUser);
  const updateProfile = useApiCall(authService.updateProfile);
  const forgotPassword = useApiCall(authService.forgotPassword);
  const resetPassword = useApiCall(authService.resetPassword);
  const verifyEmail = useApiCall(authService.verifyEmail);
  const switchOrganization = useApiCall(authService.switchOrganization);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await getCurrentUser.execute();
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, [getCurrentUser]);

  return {
    user,
    isAuthenticated,
    login,
    signupBusiness,
    signupAdmin,
    logout,
    getCurrentUser,
    updateProfile,
    forgotPassword,
    resetPassword,
    verifyEmail,
    switchOrganization,
    refreshUser
  };
};

// User service hooks
export const useUser = () => {
  const signup = useApiCall(userService.signup);
  const getCurrentUser = useApiCall(userService.getCurrentUser);
  const updatePassword = useApiCall(userService.updatePassword);
  const searchMovers = useApiCall(userService.searchMovers);
  const getServices = useApiCall(userService.getServices);
  const getServiceDetails = useApiCall(userService.getServiceDetails);
  const createBooking = useApiCall(userService.createBooking);
  const getBookings = useApiCall(userService.getBookings);
  const getBookingDetails = useApiCall(userService.getBookingDetails);
  const cancelBooking = useApiCall(userService.cancelBooking);
  const rateService = useApiCall(userService.rateService);
  const getPriceEstimate = useApiCall(userService.getPriceEstimate);
  const compareMovers = useApiCall(userService.compareMovers);
  const getProfile = useApiCall(userService.getProfile);
  const updateProfile = useApiCall(userService.updateProfile);
  const getPaymentMethods = useApiCall(userService.getPaymentMethods);
  const addPaymentMethod = useApiCall(userService.addPaymentMethod);
  const removePaymentMethod = useApiCall(userService.removePaymentMethod);
  const getTransactions = useApiCall(userService.getTransactions);
  const getNotifications = useApiCall(userService.getNotifications);
  const markNotificationRead = useApiCall(userService.markNotificationRead);
  const uploadProfilePicture = useApiCall(userService.uploadProfilePicture);

  return {
    signup,
    getCurrentUser,
    updatePassword,
    searchMovers,
    getServices,
    getServiceDetails,
    createBooking,
    getBookings,
    getBookingDetails,
    cancelBooking,
    rateService,
    getPriceEstimate,
    compareMovers,
    getProfile,
    updateProfile,
    getPaymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    getTransactions,
    getNotifications,
    markNotificationRead,
    uploadProfilePicture
  };
};

// Transport service hooks
export const useTransport = () => {
  const getDashboardData = useApiCall(transportService.getDashboardData);
  const getAvailableOrders = useApiCall(transportService.getAvailableOrders);
  const acceptOrder = useApiCall(transportService.acceptOrder);
  const rejectOrder = useApiCall(transportService.rejectOrder);
  const getBookings = useApiCall(transportService.getBookings);
  const getBookingDetails = useApiCall(transportService.getBookingDetails);
  const updateBookingStatus = useApiCall(transportService.updateBookingStatus);
  const startTrip = useApiCall(transportService.startTrip);
  const completeTrip = useApiCall(transportService.completeTrip);
  const getEarnings = useApiCall(transportService.getEarnings);
  const getEarningsSummary = useApiCall(transportService.getEarningsSummary);
  const getTransactions = useApiCall(transportService.getTransactions);
  const getRatings = useApiCall(transportService.getRatings);
  const submitCustomerRating = useApiCall(transportService.submitCustomerRating);
  const updateDriverStatus = useApiCall(transportService.updateDriverStatus);

  return {
    getDashboardData,
    getAvailableOrders,
    acceptOrder,
    rejectOrder,
    getBookings,
    getBookingDetails,
    updateBookingStatus,
    startTrip,
    completeTrip,
    getEarnings,
    getEarningsSummary,
    getTransactions,
    getRatings,
    submitCustomerRating,
    updateDriverStatus
  };
};

// Admin service hooks
export const useAdmin = () => {
  const getDashboardData = useApiCall(adminService.getDashboardData);
  const getAnalytics = useApiCall(adminService.getAnalytics);
  const getUsers = useApiCall(adminService.getUsers);
  const getUserDetails = useApiCall(adminService.getUserDetails);
  const updateUserStatus = useApiCall(adminService.updateUserStatus);
  const getAllBookings = useApiCall(adminService.getAllBookings);
  const getBookingDetails = useApiCall(adminService.getBookingDetails);
  const updateBookingStatus = useApiCall(adminService.updateBookingStatus);
  const getPayments = useApiCall(adminService.getPayments);
  const processRefund = useApiCall(adminService.processRefund);
  const getDrivers = useApiCall(adminService.getDrivers);
  const updateDriverApplication = useApiCall(adminService.updateDriverApplication);
  const getReviews = useApiCall(adminService.getReviews);
  const moderateReview = useApiCall(adminService.moderateReview);
  const getOffers = useApiCall(adminService.getOffers);
  const createOffer = useApiCall(adminService.createOffer);
  const updateOffer = useApiCall(adminService.updateOffer);
  const deleteOffer = useApiCall(adminService.deleteOffer);

  return {
    getDashboardData,
    getAnalytics,
    getUsers,
    getUserDetails,
    updateUserStatus,
    getAllBookings,
    getBookingDetails,
    updateBookingStatus,
    getPayments,
    processRefund,
    getDrivers,
    updateDriverApplication,
    getReviews,
    moderateReview,
    getOffers,
    createOffer,
    updateOffer,
    deleteOffer
  };
};

// Location service hooks
export const useLocation = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const getCurrentPosition = useCallback(async (options) => {
    try {
      setLocationError(null);
      const position = await locationService.getCurrentPosition(options);
      setCurrentPosition(position);
      return position;
    } catch (error) {
      setLocationError(error);
      throw error;
    }
  }, []);

  const startWatching = useCallback((options) => {
    try {
      setLocationError(null);
      locationService.startWatching((position, error) => {
        if (error) {
          setLocationError(error);
        } else {
          setCurrentPosition(position);
        }
      }, options);
      setIsWatching(true);
    } catch (error) {
      setLocationError(error);
    }
  }, []);

  const stopWatching = useCallback(() => {
    locationService.stopWatching();
    setIsWatching(false);
  }, []);

  const geocodeAddress = useApiCall(locationService.geocodeAddress);
  const reverseGeocode = useApiCall(locationService.reverseGeocode);
  const getRoute = useApiCall(locationService.getRoute);
  const getNearbyServices = useApiCall(locationService.getNearbyServices);
  const searchPlaces = useApiCall(locationService.searchPlaces);

  useEffect(() => {
    return () => {
      if (isWatching) {
        stopWatching();
      }
    };
  }, [isWatching, stopWatching]);

  return {
    currentPosition,
    isWatching,
    locationError,
    getCurrentPosition,
    startWatching,
    stopWatching,
    geocodeAddress,
    reverseGeocode,
    getRoute,
    getNearbyServices,
    searchPlaces,
    calculateDistance: locationService.calculateDistance.bind(locationService),
    formatAddress: locationService.formatAddress.bind(locationService)
  };
};

// Notification service hooks
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const subscribe = useCallback((type, callback) => {
    notificationService.subscribe(type, callback);
  }, []);

  const unsubscribe = useCallback((type, callback) => {
    notificationService.unsubscribe(type, callback);
  }, []);

  const getNotificationHistory = useApiCall(notificationService.getNotificationHistory);
  const markAsRead = useApiCall(notificationService.markAsRead);
  const updatePreferences = useApiCall(notificationService.updatePreferences);

  useEffect(() => {
    // Subscribe to all notification types
    const handleNotification = (payload) => {
      setNotifications(prev => [payload, ...prev.slice(0, 49)]); // Keep last 50
      if (!payload.read) {
        setUnreadCount(prev => prev + 1);
      }
    };

    // Subscribe to common notification types
    const notificationTypes = ['order', 'booking', 'payment', 'system', 'promotion'];
    notificationTypes.forEach(type => {
      subscribe(type, handleNotification);
    });

    return () => {
      notificationTypes.forEach(type => {
        unsubscribe(type, handleNotification);
      });
    };
  }, [subscribe, unsubscribe]);

  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await markAsRead.execute(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, [markAsRead]);

  return {
    notifications,
    unreadCount,
    subscribe,
    unsubscribe,
    getNotificationHistory,
    markNotificationAsRead,
    updatePreferences
  };
};

// Combined services hook
export const useServices = () => {
  const auth = useAuth();
  const user = useUser();
  const transport = useTransport();
  const admin = useAdmin();
  const location = useLocation();
  const notifications = useNotifications();

  return {
    auth,
    user,
    transport,
    admin,
    location,
    notifications
  };
};

export default useServices;