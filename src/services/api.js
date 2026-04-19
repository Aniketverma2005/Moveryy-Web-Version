/**
 * API Service Configuration
 * 
 * This file handles all API communications for the Moveryy application.
 * It includes authentication, error handling, and request/response interceptors.
 */

import axios from 'axios';

// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Token management
const TokenManager = {
  getToken: () => localStorage.getItem('moveryy_token'),
  setToken: (token) => localStorage.setItem('moveryy_token', token),
  removeToken: () => localStorage.removeItem('moveryy_token'),
  getRefreshToken: () => localStorage.getItem('moveryy_refresh_token'),
  setRefreshToken: (token) => localStorage.setItem('moveryy_refresh_token', token),
  removeRefreshToken: () => localStorage.removeItem('moveryy_refresh_token'),
};

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = TokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Calculate request duration
    const duration = new Date() - response.config.metadata.startTime;
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`);
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (refreshToken) {
          const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
            refreshToken
          });
          
          const { token } = response.data;
          TokenManager.setToken(token);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        TokenManager.removeToken();
        TokenManager.removeRefreshToken();
        window.location.href = '/login';
      }
    }
    
    // Log error details
    console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    });
    
    return Promise.reject(error);
  }
);

// Generic API methods
export const api = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // PATCH request
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Upload file
  upload: async (url, formData, onProgress = null) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        };
      }

      const response = await apiClient.post(url, formData, config);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// Error handler
const handleApiError = (error) => {
  const errorResponse = {
    message: 'An unexpected error occurred',
    status: 500,
    code: 'UNKNOWN_ERROR',
    details: null,
  };

  if (error.response) {
    // Server responded with error status
    errorResponse.status = error.response.status;
    errorResponse.message = error.response.data?.message || error.message;
    errorResponse.code = error.response.data?.code || 'SERVER_ERROR';
    errorResponse.details = error.response.data?.details || null;
  } else if (error.request) {
    // Request made but no response received
    errorResponse.message = 'Network error - please check your connection';
    errorResponse.code = 'NETWORK_ERROR';
  } else {
    // Something else happened
    errorResponse.message = error.message;
    errorResponse.code = 'REQUEST_ERROR';
  }

  return errorResponse;
};

// Export token manager for use in other files
export { TokenManager };

export default api;