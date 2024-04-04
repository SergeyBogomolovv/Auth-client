import { Outlet } from 'react-router'

export default function SettingLayout() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[100svh]'>
      <Outlet />
    </div>
  )
}
