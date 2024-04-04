import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[100svh]'>
      <Outlet />
    </div>
  )
}
