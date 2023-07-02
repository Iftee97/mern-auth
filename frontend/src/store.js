import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { apiSlice } from './slices/apiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, // basic rtk slice reducer
    [apiSlice.reducerPath]: apiSlice.reducer, // rtk query slice reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },
  devTools: true,
})
