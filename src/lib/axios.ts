import { RefreshResponse } from 'interfaces/refresh-response'
import axios from 'axios'

const $api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.APP_SERVER_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `${localStorage.getItem('accesToken')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get<RefreshResponse>(
          `${import.meta.env.APP_SERVER_URL}/auth/refresh`,
          { withCredentials: true }
        )
        localStorage.setItem('accesToken', response.data.accesToken)
        return $api.request(originalRequest)
      } catch (error) {
        localStorage.removeItem('accesToken')
      }
    }
    throw error
  }
)
export default $api
