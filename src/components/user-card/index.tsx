import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { User } from '@/interfaces/user'
import Content from './content'
import Trigger from './trigger'

interface Props {
  user: User
  label: string
}

export default function UserCard({ user, label }: Props) {
  const imageUrl = user.image.startsWith('avatars')
    ? `https://nest-auth.storage.yandexcloud.net/${user.image}`
    : user.image
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Trigger image={imageUrl} label={label} name={user.name} />
      </HoverCardTrigger>
      <HoverCardContent className='w-full'>
        <Content
          image={imageUrl}
          email={user.email}
          role={user.roles[0]}
          id={user.id}
        />
      </HoverCardContent>
    </HoverCard>
  )
}
