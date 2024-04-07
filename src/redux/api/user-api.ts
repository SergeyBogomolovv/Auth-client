import { User } from 'interfaces/user'
import { SERVER_URL } from 'lib/axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${SERVER_URL}/users` }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<User, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = userApi
