import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchReviewsAPI } from "./reviewsAPI";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => await fetchReviewsAPI()
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load reviews";
      });
  },
});

export default reviewsSlice.reducer;
