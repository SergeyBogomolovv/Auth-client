import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { LoginResponse } from 'interfaces/login-response'
import $api from 'lib/axios'
import { setCurrentUser } from 'slices/profile'
import axios from 'axios'
import { useState } from 'react'
import * as z from 'zod'
import { LoginSchema, RegisterSchema } from '@/schemas'

export const useAuth = () => {
  const [isLoading, setLoading] = useState(false)
  const { currentUser } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const login = async ({ email, password }: z.infer<typeof LoginSchema>) => {
    try {
      setLoading(true)
      const { data } = await $api.post<LoginResponse>(`/auth/login`, {
        email,
        password,
      })
      setLoading(false)
      dispatch(setCurrentUser(data.user))
      localStorage.setItem('accesToken', data.accesToken)
      return { succes: `Logined as ${data.user.email}` }
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
      return { error: 'Failed to login' }
    }
  }
  const logout = async () => {
    try {
      await $api.get('/auth/logout')
      localStorage.removeItem('accesToken')
      dispatch(setCurrentUser(null))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
      return { error: 'Failed to logout' }
    }
  }
  const checkAuth = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get<LoginResponse>(
        `${import.meta.env.APP_SERVER_URL}/auth/refresh`,
        { withCredentials: true }
      )
      setLoading(false)
      localStorage.setItem('accesToken', data.accesToken)
      dispatch(setCurrentUser(data.user))
    } catch (error) {
      setLoading(false)
      dispatch(setCurrentUser(null))
      localStorage.removeItem('accesToken')
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
    }
  }
  const google = async (token: string) => {
    try {
      const { data } = await axios.get<LoginResponse>(
        `${import.meta.env.APP_SERVER_URL}/auth/google/get-user?token=${token}`,
        { withCredentials: true }
      )
      localStorage.setItem('accesToken', data.accesToken)
      dispatch(setCurrentUser(data.user))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
    }
  }
  const registration = async ({
    name,
    email,
    password,
    passwordRepeat,
  }: z.infer<typeof RegisterSchema>) => {
    try {
      setLoading(true)
      const { data } = await axios.post(
        `${import.meta.env.APP_SERVER_URL}/auth/registration`,
        {
          name,
          email,
          password,
          passwordRepeat,
        }
      )
      setLoading(false)
      return { message: data.message }
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data.message }
      }
    }
  }

  return {
    login,
    user: currentUser!,
    logout,
    checkAuth,
    isLoading,
    registration,
    google,
  }
}
