import { configureStore } from '@reduxjs/toolkit'
import progressReducer from './progressSlice'
import uiReducer from './uiSlice'
import { localStorageMiddleware } from './localStorageMiddleware'

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})
