import Navbar from 'components/header'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className='min-h-[100svh]'>
        <Outlet />
      </div>
    </>
  )
}
