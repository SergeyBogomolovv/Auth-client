import { Outlet } from 'react-router'

export default function SettingLayout() {
  return (
    <div className='flex flex-grow flex-col items-center justify-center mt-32'>
      <Outlet />
    </div>
  )
}
