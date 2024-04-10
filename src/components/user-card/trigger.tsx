import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

interface Props {
  image: string
  label: string
  name: string
}

export default function Trigger({ image, label, name }: Props) {
  return (
    <Badge variant={'outline'} className='cursor-pointer'>
      <Avatar className='w-9 h-9 mr-3'>
        <AvatarImage src={image} className='aspect-square object-cover' />
      </Avatar>
      <div className='flex flex-col'>
        <p className='text-sm font-semibold'>{label}</p>
        <p className='text-sm text-muted-foreground font-semibold'>{name}</p>
      </div>
    </Badge>
  )
}
