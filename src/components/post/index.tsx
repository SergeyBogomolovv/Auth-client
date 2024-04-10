import { Post } from '@/interfaces/post'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { format, parseISO } from 'date-fns'
import UserCard from '../user-card'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
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
    </Card>
  )
}
