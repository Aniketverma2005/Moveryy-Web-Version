import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaymentsAPI } from "./paymentsAPI";

export const fetchPayments = createAsyncThunk(
  "payments/fetchPayments",
  async () => await fetchPaymentsAPI()
);

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPayments.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load payments";
      });
  },
});

export default paymentsSlice.reducer;
