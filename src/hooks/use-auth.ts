import { useAppDispatch, useAppSelector } from './redux'
import { LoginResponse } from '@/interfaces/login-response'
import $api, { SERVER_URL } from '@/lib/axios'
import { setCurrentUser } from '@/redux/slices/profile'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import * as z from 'zod'
import { LoginSchema, RegisterSchema } from '../schemas'

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false)
  const { currentUser } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const login = async ({ email, password }: z.infer<typeof LoginSchema>) => {
    try {
      const { data } = await $api.post<LoginResponse>(`/auth/login`, {
        email,
        password,
      })
      dispatch(setCurrentUser(data.user))
      localStorage.setItem('accesToken', data.accesToken)
      navigate('/settings')
      return { succes: `Logined as ${data.user.email}` }
    } catch (error) {
      return { error: 'Failed to login' }
    }
  }
  const logout = async () => {
    try {
      await $api.get('/auth/logout')
      localStorage.removeItem('accesToken')
      dispatch(setCurrentUser(null))
      navigate('/auth/login')
    } catch (error) {
      return { error: 'Failed to logout' }
    }
  }
  const checkAuth = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get<LoginResponse>(
        `${SERVER_URL}/auth/refresh`,
        { withCredentials: true }
      )
      setLoading(false)
      localStorage.setItem('accesToken', data.accesToken)
      dispatch(setCurrentUser(data.user))
    } catch (error) {
      console.log(error)
    }
  }
  const registration = async ({
    name,
    email,
    password,
    passwordRepeat,
  }: z.infer<typeof RegisterSchema>) => {
    try {
      const { data } = await axios.post(`${SERVER_URL}/auth/registration`, {
        name,
        email,
        password,
        passwordRepeat,
      })
      return { message: data.message }
    } catch (error) {
      return { error: 'User already exists' }
    }
  }

  return {
    login,
    user: currentUser,
    logout,
    checkAuth,
    isLoading,
    registration,
  }
}
