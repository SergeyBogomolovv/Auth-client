import { Avatar, AvatarImage } from '../ui/avatar'

interface Props {
  image: string
  id: string
  email: string
  role: string
}

export default function Content({ image, id, email, role }: Props) {
  return (
    <div className='flex items-center gap-x-4'>
      <Avatar className='w-32 h-32'>
        <AvatarImage src={image} className='aspect-square object-cover' />
      </Avatar>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-2 shadow-md gap-2'>
          <p className='text-sm font-medium'>ID</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {id}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-2 shadow-md gap-2'>
          <p className='text-sm font-medium'>Email</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {email}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-2 shadow-md gap-2'>
          <p className='text-sm font-medium'>Role</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {role}
          </p>
        </div>
      </div>
    </div>
  )
}
