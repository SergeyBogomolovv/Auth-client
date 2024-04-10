import { User } from './user'

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  author?: User
}
