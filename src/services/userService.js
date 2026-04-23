/**
 * User Service
 *
 * API endpoints (from Swagger):
 *  GET  /api/v1/users/user                          → Fetch currently logged-in user
 *  GET  /api/v1/organizations/{pincode}             → Fetch organizations by pincode
 *  GET  /api/v1/organizations/org/{organizationId}  → Fetch organization by ID
 *  GET  /api/v1/vehicles/available?...              → Fetch available vehicles with pricing
 *  POST /api/v1/bookings/checkout                   → Generate checkout preview
 *  POST /api/v1/bookings/create                     → Create a new booking
 */

import { api } from './api';

export const userService = {

    // ── GET /api/v1/users/user ────────────────────────────────────────────────
    getCurrentUser: async () => {
        try {
            const response = await api.get('/api/v1/users/user');
            const user = response?.user || response?.data?.user || response?.data;
            if (user) localStorage.setItem('moveryy_user', JSON.stringify(user));
            console.log('✅ Current user loaded:', user?.email);
            return user;
        } catch (error) {
            console.error('❌ Get current user error:', error);
            throw error;
        }
    },

    // ── GET /api/v1/organizations/{pincode} ───────────────────────────────────
    // Used to fetch available movers/organizations near a location
    getOrganizationsByPincode: async (pincode) => {
        try {
            const response = await api.get(`/api/v1/organizations/${pincode}`);
            const orgs = response?.organizations || response?.data?.organizations || response?.data || [];
            console.log(`✅ Organizations loaded for pincode ${pincode}:`, orgs.length);
            return orgs;
        } catch (error) {
            console.error('❌ Get organizations by pincode error:', error);
            throw error;
        }
    },

    // ── GET /api/v1/organizations/org/{organizationId} ────────────────────────
    getOrganizationById: async (organizationId) => {
        try {
            const response = await api.get(`/api/v1/organizations/org/${organizationId}`);
            return response?.organization || response?.data?.organization || response?.data;
        } catch (error) {
            console.error('❌ Get organization by ID error:', error);
            throw error;
        }
    },

    // ── GET /api/v1/vehicles/available ────────────────────────────────────────
    // Fetch available vehicles with pricing based on service type, capacity, distance
    // Note: Using hardcoded Delhi NCR location (pincode 110001) for now
    getAvailableVehicles: async ({
        organizationId = null,
        serviceType = 'houseshift',   // houseshift | carshift | officeshift
        capacityValue = 2,
        capacityUnit = 'bhk',          // bhk | ton | seats
        distance = 10,
        pincode = '110001',       // Delhi NCR default
    } = {}) => {
        try {
            // Build query params matching the Swagger spec
            const params = new URLSearchParams({
                serviceType,
                capacityValue,
                capacityUnit,
                distance,
            });
            if (organizationId) params.append('organizationId', organizationId);

            const response = await api.get(`/api/v1/vehicles/available?${params.toString()}`);
            const vehicles = response?.vehicles || response?.data?.vehicles || response?.data || [];
            console.log('✅ Available vehicles loaded:', vehicles.length);
            return vehicles;
        } catch (error) {
            console.error('❌ Get available vehicles error:', error);
            throw error;
        }
    },

    // ── POST /api/v1/bookings/checkout ────────────────────────────────────────
    getCheckoutPreview: async (checkoutData) => {
        try {
            const response = await api.post('/api/v1/bookings/checkout', checkoutData);
            return response?.checkout || response?.data?.checkout || response?.data;
        } catch (error) {
            console.error('❌ Checkout preview error:', error);
            throw error;
        }
    },

    // ── POST /api/v1/bookings/create ──────────────────────────────────────────
    createBooking: async (bookingData) => {
        try {
            const response = await api.post('/api/v1/bookings/create', bookingData);
            const booking = response?.booking || response?.data?.booking || response?.data;
            console.log('✅ Booking created:', booking?.id || booking?._id);
            return booking;
        } catch (error) {
            console.error('❌ Create booking error:', error);
            throw error;
        }
    },
};

export default userService;
