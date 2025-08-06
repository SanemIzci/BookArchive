import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  books: [],
  book: null,
  currentReview: null,
  loading: false,
  error: null,
  isAuth: null,
  success: false,
  favorites:[]
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

export const postReview = createAsyncThunk(
  'book/postReview',
  async({id,review}, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/books/${id}/review`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({review}),
        credentials:'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to post review');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const getReviews = createAsyncThunk(
  'book/getReviews',
  async(id, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/books/${id}/reviews`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`,
        },
        credentials:'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to get reviews');
      }
      return data.review; // reviews array'i yerine tek review
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    } 
  }
)

export const updateReview = createAsyncThunk(
  'book/updateReview',
  async({id,review}, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:3000/books/${id}/review`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`,
        },
        body:JSON.stringify({review}),
        credentials:'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update review');
      }   
      return data.review;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
)
export const getFavorites = createAsyncThunk(
  'book/getFavorites',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.user.accessToken || localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:3000/books/favorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch favorites');
      }
      return data.favorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);
export const toggleFavorite = createAsyncThunk(
  'book/toggleFavorite',
  async({id}, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const token = state.user.accessToken || localStorage.getItem('accessToken');
        const response = await fetch(`http://localhost:3000/books/${id}/favorite`,{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
          },
          credentials:'include',
        });
        const data = await response.json();
        if(!response.ok){
          return rejectWithValue(data.message || 'Failed to toggle favorite');
        }
        return data.book;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
)

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
      })
      .addCase(postReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Eğer response'da güncellenmiş kitap objesi varsa, book state'ini güncelle
        if (action.payload.book) {
          state.book = action.payload.book;
        }
      })
      .addCase(postReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReview = action.payload; // currentReview state'ini güncelle
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Güncellenmiş review'ı store'a yaz
        if (action.payload) {
          state.currentReview = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  
  },
})

export const { setAuth, clearError } = bookSlice.actions

export default bookSlice.reducer