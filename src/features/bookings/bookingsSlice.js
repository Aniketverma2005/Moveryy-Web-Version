import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBookings } from "./bookingsAPI";

export const getBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    return await fetchBookings();
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to load bookings";
      });
  },
});

export default bookingsSlice.reducer;
