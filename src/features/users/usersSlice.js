import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "./usersAPI";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => await fetchUsersAPI()
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load users";
      });
  },
});

export default usersSlice.reducer;
