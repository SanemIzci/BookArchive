import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  books: [],
  book: null,
  loading: false,
  error: null,
  isAuth: null,
  success: false
}

export const getBooks = createAsyncThunk(
  'book/getBooks',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      
      const response = await fetch('http://localhost:3000/books', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch books');
      }
      return data.books; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);
export const getBookDetail = createAsyncThunk(
  'book/getBookDetail',
  async (id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch book');
      }
      return data.book; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const starReview = createAsyncThunk(
  'book/starReview',
  async ({ id, rating }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/books/${id}/rating`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update rating');
      }
      return data.book; // Güncellenmiş kitap objesi
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const updateReadingStatus = createAsyncThunk(
  'book/updateReadingStatus',
  async ({ id, readingStatus }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/books/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ readingStatus }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update reading status');
      }
      return data.book; // Güncellenmiş kitap objesi
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);




export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(starReview.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload; // Güncellenmiş kitap objesini store'a yaz
      })
      .addCase(starReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReadingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload; // Güncellenmiş kitap objesini store'a yaz
      })
      .addCase(updateReadingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const { setAuth, clearError } = bookSlice.actions

export default bookSlice.reducer