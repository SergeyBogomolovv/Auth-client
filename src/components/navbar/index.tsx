import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <div className='fixed w-fit h-full p-3 flex flex-col items-center gap-4'>
      <Button asChild variant={'outline'} size={'lg'} className='w-full'>
        <Link to={'/'}>Home</Link>
      </Button>
      <Button asChild variant={'outline'} size={'lg'} className='w-full'>
        <Link to={'/settings'}>Settings</Link>
      </Button>
      <Button asChild variant={'outline'} size={'lg'} className='w-full'>
        <Link to={'/auth/login'}>Login</Link>
      </Button>
    </div>
  )
}
