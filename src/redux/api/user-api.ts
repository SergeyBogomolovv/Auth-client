import { User } from 'interfaces/user'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.APP_SERVER_URL}/users`,
  }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<User, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = userApi
