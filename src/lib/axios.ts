import { RefreshResponse } from 'interfaces/refresh-response'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

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

export const axiosBaseQuery =
  (
    { urlPrefix }: { urlPrefix: string } = { urlPrefix: '' }
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await $api({
        url: urlPrefix + '/' + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
