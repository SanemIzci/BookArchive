import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuth: false,
  accessToken: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async(data)=>{
    const requestOptions={
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(data)
    };
    const res=await fetch(`http://localhost:3000/user/register`,requestOptions)
    const responseData = await res.json();
    localStorage.setItem("token", responseData?.token);
    return responseData;
  }
);


export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      console.log('Token:', token);
      if (!token) {
        return rejectWithValue('No access token available');
      }
      const response = await fetch('http://localhost:3000/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          return rejectWithValue('Token expired or invalid');
        }
        return rejectWithValue(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

export const forgot=createAsyncThunk(
  "user/forgotPassword",
  async(email,{rejectWithValue,getState})=>{
    try {
      const requestOptions={
        method:"POST",
        headers:{'Content-Type':'Application/json'},
        body:JSON.stringify({email})
      }
      const response = await fetch(`http://localhost:3000/user/forgot-password`, requestOptions);
      const data=await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || 'Something went wrong');
      }
      return data
    } catch (error) {
        return rejectWithValue(data.message|| "Something went wrong")
    }
  }
)


export const resetPassword=createAsyncThunk(
  "user/resetPassword",
  async (params, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resetToken: params.resetToken,
          newPassword: params.password
        })
      };
      const response = await fetch(`http://localhost:3000/user/reset-password`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to reset the password');
      }
      return data;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.isAuth = false;
      state.accessToken = null;
      state.error = null;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuth = true;
        state.accessToken = localStorage.getItem('accessToken'); // Token'ı state'e ekle
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
        state.isAuth = false;
        state.accessToken = null; // Token'ı temizle
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isAuth = true; // Bu satırı ekledim
        localStorage.setItem('accessToken', action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuth = false; // Bu satırı ekledim
      })
      .addCase(register.pending,(state)=>{
        state.loading=true;
        state.error=null;
      })
      .addCase(register.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=action.payload.user;
        state.isAuth=true;
        localStorage.setItem('accessToken',action.payload.accessToken);
      })
      .addCase(register.rejected,(state,action)=>{
        state.loading=false;
        state.error=false;
      }).addCase(forgot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //reset
      .addCase(resetPassword.pending, (state,action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const { clearUser, setAuth } = userSlice.actions;
export default userSlice.reducer;
