/**
 * Search Service Functions
 * 
 * Handles all search-related operations including service provider search,
 * filtering, sorting, and comparison functionality.
 */

import { api } from './api';

export const searchService = {
  // Search for moving services
  searchMovingServices: async (searchParams) => {
    try {
      const response = await api.post('/search/services', {
        serviceType: searchParams.serviceType, // 'house-moving', 'car-transport', 'office-shifting'
        location: {
          pickup: {
            address: searchParams.pickupAddress,
            coordinates: searchParams.pickupCoordinates
          },
          dropoff: {
            address: searchParams.dropoffAddress,
            coordinates: searchParams.dropoffCoordinates
          }
        },
        scheduledDate: searchParams.scheduledDate,
        requirements: {
          vehicleType: searchParams.vehicleType || 'any',
          capacity: searchParams.capacity || 'any',
          specialServices: searchParams.specialServices || []
        },
        filters: {
          priceRange: searchParams.priceRange || { min: 0, max: 50000 },
          rating: searchParams.minRating || 0,
          verified: searchParams.verifiedOnly || false,
          availability: searchParams.availability || 'any'
        },
        sorting: {
          sortBy: searchParams.sortBy || 'relevance', // 'price', 'rating', 'distance', 'relevance'
          sortOrder: searchParams.sortOrder || 'asc'
        },
        pagination: {
          page: searchParams.page || 1,
          limit: searchParams.limit || 20
        }
      });

      if (response.success) {
        console.log('✅ Moving services search completed:', response.data.results.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to search moving services');
      }
    } catch (error) {
      console.error('❌ Search moving services error:', error);
      throw error;
    }
  },

  // Get service provider details
  getServiceProviderDetails: async (providerId) => {
    try {
      const response = await api.get(`/search/providers/${providerId}`);
      if (response.success) {
        console.log('✅ Service provider details loaded:', providerId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load provider details');
      }
    } catch (error) {
      console.error('❌ Get service provider details error:', error);
      throw error;
    }
  },

  // Get service provider reviews
  getProviderReviews: async (providerId, filters = {}) => {
    try {
      const queryParams = new URLSearchParams({
        rating: filters.rating || 'all',
        serviceType: filters.serviceType || 'all',
        sortBy: filters.sortBy || 'recent',
        page: filters.page || 1,
        limit: filters.limit || 10
      }).toString();

      const response = await api.get(`/search/providers/${providerId}/reviews?${queryParams}`);
      if (response.success) {
        console.log('✅ Provider reviews loaded:', response.data.reviews.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load provider reviews');
      }
    } catch (error) {
      console.error('❌ Get provider reviews error:', error);
      throw error;
    }
  },

  // Compare service providers
  compareProviders: async (providerIds) => {
    try {
      const response = await api.post('/search/compare', {
        providerIds: providerIds,
        comparisonCriteria: [
          'pricing',
          'rating',
          'experience',
          'services',
          'availability',
          'insurance',
          'equipment'
        ]
      });

      if (response.success) {
        console.log('✅ Providers comparison completed:', providerIds.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to compare providers');
      }
    } catch (error) {
      console.error('❌ Compare providers error:', error);
      throw error;
    }
  },

  // Get search suggestions
  getSearchSuggestions: async (query, type = 'location') => {
    try {
      const response = await api.get('/search/suggestions', {
        params: {
          query,
          type, // 'location', 'service', 'provider'
          limit: 10
        }
      });

      if (response.success) {
        console.log('✅ Search suggestions loaded:', response.data.suggestions.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load search suggestions');
      }
    } catch (error) {
      console.error('❌ Get search suggestions error:', error);
      throw error;
    }
  },

  // Get popular searches
  getPopularSearches: async (location = null) => {
    try {
      const params = location ? {
        latitude: location.latitude,
        longitude: location.longitude
      } : {};

      const response = await api.get('/search/popular', { params });
      if (response.success) {
        console.log('✅ Popular searches loaded:', response.data.searches.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load popular searches');
      }
    } catch (error) {
      console.error('❌ Get popular searches error:', error);
      throw error;
    }
  },

  // Save search for later
  saveSearch: async (searchData) => {
    try {
      const response = await api.post('/search/save', {
        name: searchData.name,
        searchParams: searchData.params,
        notifications: searchData.notifications || false
      });

      if (response.success) {
        console.log('✅ Search saved:', response.data.searchId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to save search');
      }
    } catch (error) {
      console.error('❌ Save search error:', error);
      throw error;
    }
  },

  // Get saved searches
  getSavedSearches: async () => {
    try {
      const response = await api.get('/search/saved');
      if (response.success) {
        console.log('✅ Saved searches loaded:', response.data.searches.length);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load saved searches');
      }
    } catch (error) {
      console.error('❌ Get saved searches error:', error);
      throw error;
    }
  },

  // Delete saved search
  deleteSavedSearch: async (searchId) => {
    try {
      const response = await api.delete(`/search/saved/${searchId}`);
      if (response.success) {
        console.log('✅ Saved search deleted:', searchId);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to delete saved search');
      }
    } catch (error) {
      console.error('❌ Delete saved search error:', error);
      throw error;
    }
  },

  // Get search filters
  getSearchFilters: async (serviceType) => {
    try {
      const response = await api.get(`/search/filters/${serviceType}`);
      if (response.success) {
        console.log('✅ Search filters loaded for:', serviceType);
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load search filters');
      }
    } catch (error) {
      console.error('❌ Get search filters error:', error);
      throw error;
    }
  },

  // Apply advanced filters
  applyAdvancedFilters: (results, filters) => {
    let filteredResults = [...results];

    // Price range filter
    if (filters.priceRange) {
      filteredResults = filteredResults.filter(result => 
        result.pricing.total >= filters.priceRange.min && 
        result.pricing.total <= filters.priceRange.max
      );
    }

    // Rating filter
    if (filters.minRating) {
      filteredResults = filteredResults.filter(result => 
        result.rating >= filters.minRating
      );
    }

    // Verified providers only
    if (filters.verifiedOnly) {
      filteredResults = filteredResults.filter(result => result.verified === true);
    }

    // Service type filter
    if (filters.serviceTypes && filters.serviceTypes.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.serviceTypes.some(type => result.services.includes(type))
      );
    }

    // Vehicle type filter
    if (filters.vehicleTypes && filters.vehicleTypes.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.vehicleTypes.some(type => result.vehicles.includes(type))
      );
    }

    // Experience filter
    if (filters.minExperience) {
      filteredResults = filteredResults.filter(result => 
        result.experience >= filters.minExperience
      );
    }

    // Insurance filter
    if (filters.insured) {
      filteredResults = filteredResults.filter(result => result.insured === true);
    }

    // Availability filter
    if (filters.availability) {
      filteredResults = filteredResults.filter(result => {
        if (filters.availability === 'immediate') {
          return result.availableImmediately === true;
        } else if (filters.availability === 'today') {
          return result.availableToday === true;
        } else if (filters.availability === 'weekend') {
          return result.weekendAvailable === true;
        }
        return true;
      });
    }

    return filteredResults;
  },

  // Sort search results
  sortSearchResults: (results, sortBy, sortOrder = 'asc') => {
    const sortedResults = [...results];

    sortedResults.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'price':
          aValue = a.pricing.total;
          bValue = b.pricing.total;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'distance':
          aValue = a.distance;
          bValue = b.distance;
          break;
        case 'experience':
          aValue = a.experience;
          bValue = b.experience;
          break;
        case 'reviews':
          aValue = a.reviewCount;
          bValue = b.reviewCount;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        default:
          // Relevance score (default)
          aValue = a.relevanceScore || 0;
          bValue = b.relevanceScore || 0;
      }

      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    return sortedResults;
  },

  // Calculate search relevance score
  calculateRelevanceScore: (provider, searchParams) => {
    let score = 0;

    // Location proximity (40% weight)
    const maxDistance = 50; // km
    const distanceScore = Math.max(0, (maxDistance - provider.distance) / maxDistance);
    score += distanceScore * 0.4;

    // Rating (25% weight)
    const ratingScore = provider.rating / 5;
    score += ratingScore * 0.25;

    // Service match (20% weight)
    const serviceMatch = searchParams.serviceType === provider.primaryService ? 1 : 0.5;
    score += serviceMatch * 0.2;

    // Availability (10% weight)
    const availabilityScore = provider.availableImmediately ? 1 : 0.5;
    score += availabilityScore * 0.1;

    // Reviews count (5% weight)
    const reviewScore = Math.min(1, provider.reviewCount / 100);
    score += reviewScore * 0.05;

    return Math.round(score * 100) / 100;
  },

  // Format search results for display
  formatSearchResults: (results) => {
    return results.map(result => ({
      ...result,
      formattedPrice: new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(result.pricing.total),
      formattedRating: `${result.rating.toFixed(1)} ⭐`,
      formattedDistance: `${result.distance.toFixed(1)} km away`,
      formattedExperience: `${result.experience} years experience`,
      badges: [
        result.verified && 'Verified',
        result.insured && 'Insured',
        result.availableImmediately && 'Available Now',
        result.topRated && 'Top Rated'
      ].filter(Boolean)
    }));
  },

  // Get search analytics
  getSearchAnalytics: async (timeframe = '30d') => {
    try {
      const response = await api.get(`/search/analytics?timeframe=${timeframe}`);
      if (response.success) {
        console.log('✅ Search analytics loaded');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to load search analytics');
      }
    } catch (error) {
      console.error('❌ Get search analytics error:', error);
      throw error;
    }
  },

  // Track search interaction
  trackSearchInteraction: async (interactionData) => {
    try {
      await api.post('/search/track', {
        searchId: interactionData.searchId,
        providerId: interactionData.providerId,
        action: interactionData.action, // 'view', 'contact', 'book', 'compare'
        timestamp: new Date().toISOString()
      });
      
      console.log('✅ Search interaction tracked:', interactionData.action);
    } catch (error) {
      console.error('❌ Track search interaction error:', error);
      // Don't throw error for tracking failures
    }
  },

  // Validate search parameters
  validateSearchParams: (searchParams) => {
    const errors = [];

    if (!searchParams.serviceType) {
      errors.push('Service type is required');
    }

    if (!searchParams.pickupAddress) {
      errors.push('Pickup location is required');
    }

    if (!searchParams.dropoffAddress) {
      errors.push('Dropoff location is required');
    }

    if (searchParams.scheduledDate) {
      const scheduledDate = new Date(searchParams.scheduledDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (scheduledDate < today) {
        errors.push('Scheduled date cannot be in the past');
      }
    }

    if (searchParams.priceRange) {
      if (searchParams.priceRange.min < 0) {
        errors.push('Minimum price cannot be negative');
      }
      if (searchParams.priceRange.max < searchParams.priceRange.min) {
        errors.push('Maximum price must be greater than minimum price');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

export default searchService;