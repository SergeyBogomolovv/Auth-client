import Navbar from 'components/header'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div className='min-h-[100svh] flex flex-col'>
      <Navbar />
      <div className='flex-grow'>
        <Outlet />
      </div>
    </div>
  )
}
