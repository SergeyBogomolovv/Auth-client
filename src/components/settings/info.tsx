import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useAuth } from '@/hooks/use-auth'

export default function UserInfo() {
  const { user, logout } = useAuth()
  return (
    <Card className='shadow-md'>
      <CardHeader>
        <p className='text-2xl font-semibold text-center tracking-widest'>
          User info
        </p>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md gap-2'>
          <p className='text-sm font-medium'>ID</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.id}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md gap-2'>
          <p className='text-sm font-medium'>Name</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.name}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md gap-2'>
          <p className='text-sm font-medium'>Email</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.email}
          </p>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md gap-2'>
          <p className='text-sm font-medium'>Role</p>
          <p className='truncate text-xs max-w-[180px] font-mono p-2 bg-secondary rounded-md'>
            {user?.role}
          </p>
        </div>
        <Button onClick={() => logout()} variant={'destructive'}>
          Logout
        </Button>
      </CardContent>
    </Card>
  )
}
