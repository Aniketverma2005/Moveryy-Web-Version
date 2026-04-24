import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersAPI } from './usersAPI';

// ── Async thunks ──────────────────────────────────────────────────────────────

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => await fetchUsersAPI()
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    currentUser: null,
    organization: null,   // set after org registration
    loading: false,
    error: null,
  },
  reducers: {
    // Called after successful login to store user + org info
    setCurrentUser(state, action) {
      state.currentUser = action.payload.user ?? null;
      state.organization = action.payload.organization ?? null;
    },
    // Called after successful org registration
    setOrganization(state, action) {
      state.organization = action.payload;
      if (state.currentUser) {
        state.currentUser.hasOrganization = true;
        state.currentUser.organizationId = action.payload?.id ?? action.payload?._id;
      }
    },
    clearUser(state) {
      state.currentUser = null;
      state.organization = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload?.users ?? action.payload ?? [];
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load users';
      });
  },
});

export const { setCurrentUser, setOrganization, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
