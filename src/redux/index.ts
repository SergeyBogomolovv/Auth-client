import { configureStore } from '@reduxjs/toolkit'
import profileSlice from 'slices/profile'
import postApi from 'api/posts'

export const makeStore = () => {
  return configureStore({
    reducer: {
      profile: profileSlice,
      [postApi.reducerPath]: postApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
