import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import $api from 'lib/axios'
import { User } from '@/interfaces/user'
import { setCurrentUser } from '@/redux/slices/profile'
import axios from 'axios'

export const useProfile = () => {
  const [isLoading, setLoading] = useState(false)
  const { currentUser } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const updateName = async (name: string) => {
    if (!currentUser) return { error: 'Please login' }
    try {
      setLoading(true)
      const { data: user } = await $api.put<User>(
        `users/rename/${currentUser.id}`,
        { name }
      )
      setLoading(false)
      dispatch(setCurrentUser(user))
      return { succes: `Name was updated to ${user.name}` }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
    }
  }

  const updateAvatar = async (image: File) => {
    if (!currentUser) return { error: 'Please login' }
    try {
      setLoading(true)
      const data = new FormData()
      data.append('image', image)
      const { data: user } = await $api.put<User>(
        `users/update-image/${currentUser.id}`,
        data
      )
      setLoading(false)
      dispatch(setCurrentUser(user))
      return { succes: 'Avatar was updated' }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
    }
  }
  return { updateName, loading: isLoading, updateAvatar }
}
