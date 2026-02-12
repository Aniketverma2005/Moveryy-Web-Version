import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardData } from "./dashboardAPI";

export const getDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async () => {
    return await fetchDashboardData();
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: [],
    bookings: [],
    company: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.bookings = action.payload.bookings;
        state.company = action.payload.company;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
