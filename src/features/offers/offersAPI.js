import { api } from "../../services/api";

// GET /api/v1/offers/all — fetch all offers for the organization
export const fetchOffersAPI = () =>
  api.get("/api/v1/offers/all");

// POST /api/v1/offers/create — create a new offer
export const createOfferAPI = (payload) =>
  api.post("/api/v1/offers/create", payload);

// PATCH /api/v1/offers/:offerId — update an existing offer
export const updateOfferAPI = (offerId, payload) =>
  api.patch(`/api/v1/offers/${offerId}`, payload);

// DELETE /api/v1/offers/:offerId — delete an offer
export const deleteOfferAPI = (offerId) =>
  api.delete(`/api/v1/offers/${offerId}`);
