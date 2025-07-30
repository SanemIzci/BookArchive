import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './BookSlice'
import userReducer from './UserSlice'
import authReducer from  './AuthSlice'
export const store = configureStore({
  reducer: {
    book:bookReducer,
    user:userReducer,
    auth: authReducer,
  },
})
export default store;