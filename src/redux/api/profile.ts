import { LoginResponse } from '@/interfaces/login-response'
import { RefreshResponse } from '@/interfaces/refresh-response'
import { User } from '@/interfaces/user'
import { axiosBaseQuery } from '@/lib/axios'
import { LoginSchema, RegisterSchema } from '@/schemas'
import { createApi } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'
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
        transformResponse: (response: { user: User; accesToken: string }) => {
          return response.user
        },
      }),
      providesTags: ['Profile'],
    }),
    login: build.mutation<LoginResponse, z.infer<typeof LoginSchema>>({
      query: ({ email, password }) => ({
        url: 'login',
        method: 'POST',
        data: { email, password },
        transformResponse: (response: { user: User; accesToken: string }) => {
          return response.user
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    registration: build.mutation<
      RegisterResponse,
      z.infer<typeof RegisterSchema>
    >({
      query: ({ email, password, passwordRepeat, name }) => ({
        url: 'registration',
        method: 'POST',
        data: { email, password, passwordRepeat, name },
        transformResponse: (response: { message: string }) => {
          return toast.success(response.message)
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    logout: build.mutation<null, undefined>({
      query: () => ({
        url: 'logout',
        transformResponse: () => {
          return null
        },
        invalidatesTags: ['Profile'],
      }),
    }),
  }),
})

export const { useRefreshQuery, useLoginMutation, useLogoutMutation } =
  profileApi
