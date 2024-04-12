import { Post } from '@/interfaces/post'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import { format, parseISO } from 'date-fns'
import UserCard from 'components/user-card'
import { Button } from 'components/ui/button'
import { useDeletePostMutation } from '@/redux/api/posts'
import { toast } from 'sonner'
import EditPostModal from './edit-post-modal'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  const [deletePost, { isLoading }] = useDeletePostMutation()
  const handledelete = async () => {
    await deletePost(post.id)
      .unwrap()
      .then(() => toast.success(`Post deleted`))
      .catch(() => toast.error('Failed to delete post'))
  }
  const date = format(parseISO(post.createdAt), 'eeee do MMM, yyyy')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardHeader>{post.content}</CardHeader>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div>Created: {date}</div>
        <UserCard user={post.author!} label='Author' />
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <Button
          className='w-full'
          disabled={isLoading}
          variant={'destructive'}
          onClick={handledelete}
        >
          Delete
        </Button>
        <EditPostModal post={post}>
          <Button className='w-full' variant={'outline'} disabled={isLoading}>
            Edit
          </Button>
        </EditPostModal>
      </CardFooter>
    </Card>
  )
}
