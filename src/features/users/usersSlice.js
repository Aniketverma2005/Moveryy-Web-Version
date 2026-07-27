import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersAPI, createEmployeeAPI, updateEmployeeAPI, deleteEmployeeAPI, fetchVehiclesAPI } from './usersAPI';

// ── Async thunks ──────────────────────────────────────────────────────────────

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => await fetchUsersAPI()
);

export const fetchVehicles = createAsyncThunk(
  'users/fetchVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchVehiclesAPI();
      return response?.vehicles ?? [];
    } catch (err) {
      return rejectWithValue(err?.message ?? 'Failed to load vehicles');
    }
  }
);

export const createEmployee = createAsyncThunk(
  'users/createEmployee',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createEmployeeAPI(payload);
      // Backend returns { success, message, data: employee }
      return response?.data ?? response ?? null;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message ?? err?.message ?? 'Failed to create employee');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'users/updateEmployee',
  async ({ employeeId, payload }, { rejectWithValue }) => {
    try {
      const response = await updateEmployeeAPI(employeeId, payload);
      // Backend returns { message, data: updatedEmployee } — unwrap .data
      const updated = response?.data ?? payload;
      return { employeeId, updated };
    } catch (err) {
      const message = err?.message ?? err?.response?.data?.message ?? 'Failed to update employee';
      return rejectWithValue(message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'users/deleteEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      await deleteEmployeeAPI(employeeId);
      return employeeId; // return the id to filter it out from list
    } catch (err) {
      const message = err?.message ?? err?.response?.data?.message ?? 'Failed to delete employee';
      return rejectWithValue(message);
    }
  }
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    currentUser: null,
    organization: null,
    loading: false,
    creating: false,
    createError: null,
    updating: false,
    updateError: null,
    deleting: false,
    deleteError: null,
    vehicles: [],
    vehiclesLoading: false,
    vehiclesError: null,
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
    addUser(state, action) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        // Real API returns { message, employees: [...] }
        state.list = action.payload?.employees ?? action.payload ?? [];
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load users';
      })
      // ── createEmployee ────────────────────────────────────────────────────
      .addCase(createEmployee.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.creating = false;
        // Append returned employee to local list so table updates instantly
        if (action.payload) state.list.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload ?? 'Failed to create employee';
      })
      // ── updateEmployee ────────────────────────────────────────────────────
      .addCase(updateEmployee.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.updating = false;
        if (action.payload) {
          const { employeeId, updated } = action.payload;
          // Use == (loose) to handle number/string mismatch
          const idx = state.list.findIndex((u) => u.employeeId == employeeId);
          if (idx !== -1) state.list[idx] = { ...state.list[idx], ...updated };
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload ?? 'Failed to update employee';
      })
      // ── deleteEmployee ────────────────────────────────────────────────────
      .addCase(deleteEmployee.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.deleting = false;
        // Use == (loose) to handle number/string mismatch from API
        state.list = state.list.filter((u) => u.employeeId != action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload ?? 'Failed to delete employee';
      })
      // ── fetchVehicles ─────────────────────────────────────────────────────
      .addCase(fetchVehicles.pending, (state) => {
        state.vehiclesLoading = true;
        state.vehiclesError = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehiclesLoading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.vehiclesLoading = false;
        state.vehiclesError = action.payload ?? 'Failed to load vehicles';
      });
  },
});

export const { setCurrentUser, setOrganization, clearUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;
