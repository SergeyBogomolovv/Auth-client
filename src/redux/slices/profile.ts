import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'interfaces/user'
import { authApi } from '../api/auth'
import { profileApi } from '../api/profile'

interface ProfileState {
  currentUser: User | null
}

const initialState: ProfileState = {
  currentUser: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('accesToken', payload.accesToken)
        state.currentUser = payload.user
      }
    ),
      builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        localStorage.removeItem('accesToken')
        state.currentUser = null
      }),
      builder.addMatcher(
        authApi.endpoints.refresh.matchFulfilled,
        (state, { payload }) => {
          localStorage.setItem('accesToken', payload.accesToken)
          state.currentUser = payload.user
        }
      ),
      builder.addMatcher(
        authApi.endpoints.googleLogin.matchFulfilled,
        (state, { payload }) => {
          localStorage.setItem('accesToken', payload.accesToken)
          state.currentUser = payload.user
        }
      )
    builder.addMatcher(
      profileApi.endpoints.updateLogo.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload
      }
    )
    builder.addMatcher(
      profileApi.endpoints.updateUserName.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload
      }
    )
  },
})

export const { setCurrentUser } = profileSlice.actions
export default profileSlice.reducer
