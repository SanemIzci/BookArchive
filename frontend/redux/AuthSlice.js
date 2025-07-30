import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  user: null,
};




const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      // Save token to localStorage
      if (action.payload.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('accessToken');
    }
  }
});

export const { setAuthData, logout } = authSlice.actions;
export default authSlice.reducer;
