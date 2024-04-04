import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces/user'

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
})

export const { setCurrentUser } = profileSlice.actions
export default profileSlice.reducer
