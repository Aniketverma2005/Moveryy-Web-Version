import api from './api'; // Ensure this points to your axios instance

const BASE_URL = '/v1/address';

export const addressService = {
  // POST: Add a new address
  createAddress: async (addressData) => {
    const response = await api.post(BASE_URL, addressData);
    return response.data;
  },

  // GET: Fetch all addresses
  getAllAddresses: async () => {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  // GET: Fetch single address by ID
  getAddressById: async (addressId) => {
    const response = await api.get(`${BASE_URL}/${addressId}`);
    return response.data;
  },

  // PATCH: Update existing address
  updateAddress: async (addressId, updatedData) => {
    const response = await api.patch(`${BASE_URL}/${addressId}`, updatedData);
    return response.data;
  },

  // DELETE: Delete an address
  deleteAddress: async (addressId) => {
    const response = await api.delete(`${BASE_URL}/${addressId}`);
    return response.data;
  }
};
