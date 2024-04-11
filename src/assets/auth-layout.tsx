import { useAppSelector } from '@/hooks/redux'
import { Navigate, Outlet } from 'react-router'

export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.profile)
  if (currentUser) return <Navigate to='/settings' />
  return (
    <div className='flex flex-col items-center justify-center min-h-[100svh]'>
      <Outlet />
    </div>
  )
}
