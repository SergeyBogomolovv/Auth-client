import { useAppSelector } from 'hooks/redux'
import { Navigate, Outlet } from 'react-router'

export default function AuthLayout() {
  const { currentUser } = useAppSelector((state) => state.profile)
  if (currentUser) return <Navigate to='/settings' />

  return (
    <div className='flex items-center justify-center mt-32'>
      <Outlet />
    </div>
  )
}
