import { useAppDispatch, useAppSelector } from './redux'
import { LoginResponse } from '@/interfaces/login-response'
import $api, { SERVER_URL } from '@/lib/axios'
import { setCurrentUser } from '@/redux/slices/profile'
import axios from 'axios'
import { useNavigate } from 'react-router'

interface LoginProps {
  email: string
  password: string
}

export const useAuth = () => {
  const { currentUser } = useAppSelector((state) => state.profile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const login = async ({ email, password }: LoginProps) => {
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
      const { data } = await axios.get<LoginResponse>(
        `${SERVER_URL}/auth/refresh`,
        { withCredentials: true }
      )
      localStorage.setItem('accesToken', data.accesToken)
      dispatch(setCurrentUser(data.user))
    } catch (error) {
      console.log(error)
    }
  }

  return { login, user: currentUser, logout, checkAuth }
}
