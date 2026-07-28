import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOffersAPI, createOfferAPI, updateOfferAPI, deleteOfferAPI } from "./offersAPI";

// ── Async thunks ──────────────────────────────────────────────────────────────

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchOffersAPI();
      return response?.offers ?? response?.data ?? response ?? [];
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to load offers");
    }
  }
);

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createOfferAPI(payload);
      return response?.data ?? response ?? null;
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to create offer");
    }
  }
);

export const updateOffer = createAsyncThunk(
  "offers/updateOffer",
  async ({ offerId, payload }, { rejectWithValue }) => {
    try {
      const response = await updateOfferAPI(offerId, payload);
      // Backend returns { message, data: updatedOffer }
      return response?.data ?? response ?? null;
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to update offer");
    }
  }
);

export const deleteOffer = createAsyncThunk(
  "offers/deleteOffer",
  async (offerId, { rejectWithValue }) => {
    try {
      await deleteOfferAPI(offerId);
      return offerId; // return id so reducer can remove it from list
    } catch (err) {
      return rejectWithValue(err?.message ?? "Failed to delete offer");
    }
  }
);

const offersSlice = createSlice({
  name: "offers",
  initialState: {
    list:        [],
    loading:     false,
    error:       null,
    creating:    false,
    createError: null,
    updating:    false,
    updateError: null,
    deleting:    false,
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ── fetchOffers ─────────────────────────────────────────────────────
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload ?? "Failed to load offers";
      })
      // ── createOffer ──────────────────────────────────────────────────────
      .addCase(createOffer.pending, (state) => {
        state.creating    = true;
        state.createError = null;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.creating = false;
        if (action.payload) state.list.push(action.payload);
      })
      .addCase(createOffer.rejected, (state, action) => {
        state.creating    = false;
        state.createError = action.payload ?? "Failed to create offer";
      })
      // ── updateOffer ──────────────────────────────────────────────────────
      .addCase(updateOffer.pending, (state) => {
        state.updating    = true;
        state.updateError = null;
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload) {
          const idx = state.list.findIndex(
            (o) => o.offerId == action.payload.offerId
          );
          if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
        }
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.updating    = false;
        state.updateError = action.payload ?? "Failed to update offer";
      })
      // ── deleteOffer ──────────────────────────────────────────────────────
      .addCase(deleteOffer.pending, (state) => {
        state.deleting    = true;
        state.deleteError = null;
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.deleting = false;
        // Remove from list immediately — no re-fetch needed
        state.list = state.list.filter((o) => o.offerId != action.payload);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.deleting    = false;
        state.deleteError = action.payload ?? "Failed to delete offer";
      });
  },
});

export default offersSlice.reducer;
