import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVehicleOffersAPI, createVehicleOfferAPI } from "./vehicleOffersAPI";

// ── Async thunks ──────────────────────────────────────────────────────────────

export const fetchVehicleOffers = createAsyncThunk(
  "vehicleOffers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchVehicleOffersAPI();
      // API returns { message, offers: [...] } or { data: [...] }
      return response?.offers ?? response?.data ?? response ?? [];
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to load vehicle offers");
    }
  }
);

export const createVehicleOffer = createAsyncThunk(
  "vehicleOffers/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createVehicleOfferAPI(payload);
      return response?.data ?? response ?? null;
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to create vehicle offer");
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const vehicleOffersSlice = createSlice({
  name: "vehicleOffers",
  initialState: {
    list:        [],
    loading:     false,
    error:       null,
    creating:    false,
    createError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleOffers.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchVehicleOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchVehicleOffers.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload ?? "Failed to load vehicle offers";
      })
      .addCase(createVehicleOffer.pending, (state) => {
        state.creating    = true;
        state.createError = null;
      })
      .addCase(createVehicleOffer.fulfilled, (state, action) => {
        state.creating = false;
        if (action.payload) state.list.push(action.payload);
      })
      .addCase(createVehicleOffer.rejected, (state, action) => {
        state.creating    = false;
        state.createError = action.payload ?? "Failed to create vehicle offer";
      });
  },
});

export default vehicleOffersSlice.reducer;
