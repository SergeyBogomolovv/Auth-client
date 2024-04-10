import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from 'interfaces/post'

const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.APP_SERVER_URL}/posts`,
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], { limit: number; page: number }>({
      query: ({ limit, page }) => ({ url: '/', params: { limit, page } }),
      transformResponse: (response: { data: Post[] }) => response.data,
    }),
    getOnePost: build.query<Post, number>({
      query: (id) => ({ url: `/${id}` }),
      transformResponse: (response: { data: Post }) => response.data,
    }),
    createPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({ url: '/create', method: 'POST', body }),
    }),
  }),
})

export default postApi
