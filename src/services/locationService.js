/**
 * Location Service
 * 
 * Handles geolocation, address geocoding, distance calculations,
 * and map-related functionality for the Moveryy application.
 */

import { api } from './api';

class LocationService {
  constructor() {
    this.watchId = null;
    this.currentPosition = null;
    this.isWatching = false;
  }

  // Get current position
  async getCurrentPosition(options = {}) {
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    const finalOptions = { ...defaultOptions, ...options };

    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          
          console.log('✅ Current position obtained:', this.currentPosition);
          resolve(this.currentPosition);
        },
        (error) => {
          console.error('❌ Geolocation error:', error);
          reject(this.handleGeolocationError(error));
        },
        finalOptions
      );
    });
  }

  // Start watching position
  startWatching(callback, options = {}) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser');
    }

    if (this.isWatching) {
      this.stopWatching();
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    const finalOptions = { ...defaultOptions, ...options };

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        
        console.log('📍 Position updated:', this.currentPosition);
        callback(this.currentPosition);
      },
      (error) => {
        console.error('❌ Watch position error:', error);
        callback(null, this.handleGeolocationError(error));
      },
      finalOptions
    );

    this.isWatching = true;
    console.log('👀 Started watching position');
  }

  // Stop watching position
  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.isWatching = false;
      console.log('⏹️ Stopped watching position');
    }
  }

  // Handle geolocation errors
  handleGeolocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return new Error('Location access denied by user');
      case error.POSITION_UNAVAILABLE:
        return new Error('Location information is unavailable');
      case error.TIMEOUT:
        return new Error('Location request timed out');
      default:
        return new Error('An unknown location error occurred');
    }
  }

  // Geocode address to coordinates
  async geocodeAddress(address) {
    try {
      const response = await api.post('/location/geocode', { address });
      if (response.success) {
        console.log('✅ Address geocoded:', address);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to geocode address');
      }
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      throw error;
    }
  }

  // Reverse geocode coordinates to address
  async reverseGeocode(latitude, longitude) {
    try {
      const response = await api.post('/location/reverse-geocode', {
        latitude,
        longitude
      });
      if (response.success) {
        console.log('✅ Coordinates reverse geocoded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to reverse geocode coordinates');
      }
    } catch (error) {
      console.error('❌ Reverse geocoding error:', error);
      throw error;
    }
  }

  // Calculate distance between two points
  calculateDistance(lat1, lon1, lat2, lon2, unit = 'km') {
    const R = unit === 'km' ? 6371 : 3959; // Earth's radius in km or miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return Math.round(distance * 100) / 100; // Round to 2 decimal places
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Get route between two points
  async getRoute(origin, destination, options = {}) {
    try {
      const response = await api.post('/location/route', {
        origin,
        destination,
        ...options
      });
      if (response.success) {
        console.log('✅ Route calculated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to calculate route');
      }
    } catch (error) {
      console.error('❌ Route calculation error:', error);
      throw error;
    }
  }

  // Get nearby services/drivers
  async getNearbyServices(latitude, longitude, radius = 10, serviceType = 'all') {
    try {
      const response = await api.get('/location/nearby', {
        params: {
          latitude,
          longitude,
          radius,
          serviceType
        }
      });
      if (response.success) {
        console.log('✅ Nearby services found:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to find nearby services');
      }
    } catch (error) {
      console.error('❌ Nearby services error:', error);
      throw error;
    }
  }

  // Update driver location (for drivers)
  async updateDriverLocation(latitude, longitude) {
    try {
      const response = await api.post('/location/driver/update', {
        latitude,
        longitude,
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
  }

  // Get estimated travel time
  async getEstimatedTravelTime(origin, destination, mode = 'driving') {
    try {
      const response = await api.post('/location/travel-time', {
        origin,
        destination,
        mode
      });
      if (response.success) {
        console.log('✅ Travel time estimated');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to estimate travel time');
      }
    } catch (error) {
      console.error('❌ Travel time estimation error:', error);
      throw error;
    }
  }

  // Search places/addresses
  async searchPlaces(query, location = null, radius = 50) {
    try {
      const params = { query };
      if (location) {
        params.latitude = location.latitude;
        params.longitude = location.longitude;
        params.radius = radius;
      }

      const response = await api.get('/location/search', { params });
      if (response.success) {
        console.log('✅ Places search completed:', response.data.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to search places');
      }
    } catch (error) {
      console.error('❌ Places search error:', error);
      throw error;
    }
  }

  // Get place details
  async getPlaceDetails(placeId) {
    try {
      const response = await api.get(`/location/places/${placeId}`);
      if (response.success) {
        console.log('✅ Place details loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load place details');
      }
    } catch (error) {
      console.error('❌ Place details error:', error);
      throw error;
    }
  }

  // Format address for display
  formatAddress(addressComponents) {
    if (!addressComponents) return '';
    
    const parts = [];
    
    if (addressComponents.streetNumber && addressComponents.streetName) {
      parts.push(`${addressComponents.streetNumber} ${addressComponents.streetName}`);
    } else if (addressComponents.streetName) {
      parts.push(addressComponents.streetName);
    }
    
    if (addressComponents.locality) {
      parts.push(addressComponents.locality);
    }
    
    if (addressComponents.administrativeArea) {
      parts.push(addressComponents.administrativeArea);
    }
    
    if (addressComponents.postalCode) {
      parts.push(addressComponents.postalCode);
    }
    
    return parts.join(', ');
  }

  // Check if location services are available
  isLocationAvailable() {
    return 'geolocation' in navigator;
  }

  // Get current position if available
  getCurrentPositionSync() {
    return this.currentPosition;
  }

  // Calculate bearing between two points
  calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = this.toRadians(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(this.toRadians(lat2));
    const x = Math.cos(this.toRadians(lat1)) * Math.sin(this.toRadians(lat2)) -
              Math.sin(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.cos(dLon);
    
    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180 / Math.PI + 360) % 360; // Convert to degrees and normalize
    
    return Math.round(bearing);
  }

  // Get compass direction from bearing
  getCompassDirection(bearing) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(bearing / 22.5) % 16;
    return directions[index];
  }
}

// Create singleton instance
const locationService = new LocationService();

export default locationService;