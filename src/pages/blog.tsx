import PostCard from '@/components/post'
import { useGetPostsQuery } from '@/redux/api/posts'

export default function BlogPage() {
  const { data, isLoading } = useGetPostsQuery({ limit: 100, page: 1 })
  return (
    <main className='flex flex-col items-center justify-center gap-y-10 container my-10'>
      <div className='text-6xl font-extrabold text-white'>Welcome to blog</div>
      {isLoading ? (
        <h1 className='text-3xl text-white'>Loading...</h1>
      ) : (
        <div className='grid grid-cols-4 gap-10'>
          {data?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
