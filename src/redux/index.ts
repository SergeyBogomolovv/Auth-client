import { configureStore } from '@reduxjs/toolkit'
import profileSlice from 'slices/profile'
import { postsApi } from 'api/posts'
import { authApi } from './api/auth'
import { profileApi } from './api/profile'

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileSlice,
      [postsApi.reducerPath]: postsApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        postsApi.middleware,
        authApi.middleware,
        profileApi.middleware
      ),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
