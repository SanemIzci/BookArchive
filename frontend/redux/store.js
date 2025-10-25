import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './BookSlice'
import userReducer from './UserSlice'
import authReducer from  './AuthSlice'
import statsReducer from './StatsSlice'
export const store = configureStore({
  reducer: {
    book:bookReducer,
    user:userReducer,
    auth: authReducer,
    stats: statsReducer,
  },
})
export default store;