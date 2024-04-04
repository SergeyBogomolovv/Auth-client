import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='py-3 px-20 text-sm flex gap-4 bg-white'>
      <Link to={'/'}>Home</Link>
      <Link to={'/settings'}>Settings</Link>
      <Link to={'/auth/login'}>Login</Link>
    </div>
  )
}
