import { LoginResponse } from '@/interfaces/login-response'
import { RefreshResponse } from '@/interfaces/refresh-response'
import { axiosBaseQuery } from '@/lib/axios'
import { LoginSchema, RegisterSchema } from '@/schemas'
import { createApi } from '@reduxjs/toolkit/query/react'
import * as z from 'zod'

interface RegisterResponse {
  message: string
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery({ urlPrefix: 'auth' }),
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    refresh: build.query<RefreshResponse, null>({
      query: () => ({
        url: 'refresh',
      }),
    }),
    login: build.mutation<LoginResponse, z.infer<typeof LoginSchema>>({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        data: { email, password },
      }),
    }),
    googleLogin: build.mutation<LoginResponse, { token: string }>({
      query: ({ token }) => ({ url: `google/get-user?token=${token}` }),
    }),
    registration: build.mutation<
      RegisterResponse,
      z.infer<typeof RegisterSchema>
    >({
      query: ({ email, password, passwordRepeat, name }) => ({
        url: 'registration',
        method: 'POST',
        data: { email, password, passwordRepeat, name },
      }),
    }),
    logout: build.mutation<null, undefined>({
      query: () => ({
        url: 'logout',
        transformResponse: () => {
          return null
        },
      }),
    }),
  }),
})

export const {
  useRefreshQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegistrationMutation,
  useGoogleLoginMutation,
} = profileApi
