import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnalyticsAPI } from "./analyticsAPI";

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async () => {
    return await fetchAnalyticsAPI();
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch analytics";
      });
  },
});

export default analyticsSlice.reducer;
