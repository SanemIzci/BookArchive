import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserStats = createAsyncThunk(
  "user/profileStats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const token = user.accessToken || localStorage.getItem('accessToken');

      const res = await fetch(`http://localhost:3000/user/profile/stats?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || "Failed to fetch stats");
      }

      const data = await res.json();
      return data.stats; 
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching stats");
    }
  }
);

const statsSlice = createSlice({
  name: "profileStats",
  initialState: {
    loading: false,
    error: null,
    stats: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
