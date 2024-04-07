import { Button } from 'components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { useAuth } from '@/hooks/use-auth'
import InfoCard from './info-card'
import { format, parseISO } from 'date-fns'
import LogoutWrapper from 'components/auth/logout-wrapper'
import NameCard from './name-card'
import ImageCard from './image-card'

export default function UserInfo() {
  const { user } = useAuth()
  const date = format(parseISO(user.createdAt), 'eeee do MMM, yyyy')

  return (
    <Card className='shadow-md w-full'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center tracking-widest'>
          User info
        </p>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-x-8'>
        <div className='space-y-4'>
          <ImageCard user={user} />
          <NameCard user={user} />
        </div>
        <div className='flex flex-col justify-between'>
          <InfoCard label='ID' value={user?.id} />
          <InfoCard label='Email' value={user?.email} />
          <InfoCard label='Created' value={date} />
          <InfoCard label='Role' value={user?.roles[0]} />
        </div>
      </CardContent>
      <CardFooter>
        <LogoutWrapper className='w-full'>
          <Button className='w-full' variant={'destructive'}>
            Logout
          </Button>
        </LogoutWrapper>
      </CardFooter>
    </Card>
  )
}
