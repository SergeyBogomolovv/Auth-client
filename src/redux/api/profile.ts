import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '@/lib/axios'
import { User } from '@/interfaces/user'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery({ urlPrefix: 'users' }),
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    updateLogo: build.mutation<User, FormData>({
      query: (data) => ({
        url: `update-image`,
        method: 'PUT',
        data,
      }),
    }),
    updateUserName: build.mutation<User, string>({
      query: (name) => ({
        url: `rename`,
        method: 'PUT',
        data: { name },
      }),
    }),
  }),
})

export const { useUpdateLogoMutation, useUpdateUserNameMutation } = profileApi
