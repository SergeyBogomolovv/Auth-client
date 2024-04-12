import { Pagination } from 'interfaces/pagination'
import { Post } from 'interfaces/post'
import { axiosBaseQuery } from 'lib/axios'
import { CreatePostSchema, UpdatePostSchema } from '@/schemas'
import { createApi } from '@reduxjs/toolkit/query/react'
import * as z from 'zod'
interface UpdatePostAtts {
  data: z.infer<typeof UpdatePostSchema>
  id: string
}
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
        data: { content, title },
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: build.mutation<Post, UpdatePostAtts>({
      query: ({ data, id }) => ({
        url: `${id}`,
        method: 'PUT',
        data: { ...data },
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation<Post, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const {
  useUpdatePostMutation,
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi
