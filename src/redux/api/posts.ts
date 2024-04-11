import { Pagination } from 'interfaces/pagination'
import { Post } from 'interfaces/post'
import { axiosBaseQuery } from 'lib/axios'
import { CreatePostSchema } from '@/schemas'
import { createApi } from '@reduxjs/toolkit/query/react'
import * as z from 'zod'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: axiosBaseQuery({ urlPrefix: 'posts' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], Pagination>({
      query: ({ limit, page }) => ({
        url: '',
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
