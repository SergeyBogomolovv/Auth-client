import { configureStore } from '@reduxjs/toolkit'
import profileSlice from './slices/profile'
import { userApi } from './api/user-api'

export const makeStore = () => {
  return configureStore({
    reducer: { profile: profileSlice, [userApi.reducerPath]: userApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
