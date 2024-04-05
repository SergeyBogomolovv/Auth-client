import { useAuth } from '@/hooks/use-auth'
import { Navigate, Outlet } from 'react-router'

export default function AuthLayout() {
  const { user } = useAuth()
  if (user) return <Navigate to='/settings' />
  return (
    <div className='flex flex-col items-center justify-center min-h-[100svh]'>
      <Outlet />
    </div>
  )
}
