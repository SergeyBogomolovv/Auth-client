import { Pagination } from '@/interfaces/pagination'
import { Post } from '@/interfaces/post'
import { CreatePostSchema } from '@/schemas'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import * as z from 'zod'

//TODO: Сделать чтобы происходил рефреш, как в конфиге аксиоса

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.APP_SERVER_URL}/posts/`,
    prepareHeaders: (headers) => {
      headers.set('authorization', `${localStorage.getItem('accesToken')}`)
      return headers
    },
  }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], Pagination>({
      query: ({ limit, page }) => ({
        url: '/',
        params: { limit, page },
      }),
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<Post, z.infer<typeof CreatePostSchema>>({
      query: ({ content, title }) => ({
        url: 'create',
        method: 'POST',
        body: { content, title },
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const { useGetPostsQuery, useCreatePostMutation } = postsApi
