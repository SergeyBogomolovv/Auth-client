import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import $api from 'lib/axios'
import { User } from '@/interfaces/user'
import { setCurrentUser } from '@/redux/slices/profile'

export const useProfile = () => {
  const [isLoading, setLoading] = useState(false)
  const { currentUser } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const updateName = async (name: string) => {
    if (!currentUser) return { error: 'Please login' }
    setLoading(true)
    const { data: user } = await $api.put<User>(
      `users/rename/${currentUser.id}`,
      { name }
    )
    setLoading(false)
    dispatch(setCurrentUser(user))
    return { succes: `Name updated to ${user.name}` }
  }
  const updateAvatar = async (image: File) => {
    if (!currentUser) return { error: 'Please login' }
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
  }
  return { updateName, loading: isLoading, updateAvatar }
}
