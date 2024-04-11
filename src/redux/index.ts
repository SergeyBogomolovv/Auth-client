import { configureStore } from '@reduxjs/toolkit'
import profileSlice from 'slices/profile'
import { postsApi } from 'api/posts'
import { profileApi } from './api/profile'

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileSlice,
      [postsApi.reducerPath]: postsApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware, profileApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
