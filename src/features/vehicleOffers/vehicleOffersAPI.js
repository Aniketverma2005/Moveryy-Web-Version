import { api } from "../../services/api";

// GET /api/v1/vehiclesOffer/all — fetch all vehicle offers for the organisation
export const fetchVehicleOffersAPI = () =>
  api.get("/api/v1/vehiclesOffer/all");

// POST /api/v1/vehiclesOffer/create — create a new vehicle offer
export const createVehicleOfferAPI = (payload) =>
  api.post("/api/v1/vehiclesOffer/create", payload);
