import { FcGoogle } from 'react-icons/fc'
import { Button } from 'components/ui/button'
import { Link } from 'react-router-dom'

const Social = () => {
  return (
    <div className='flex items-center justify-center w-full gap-x-2'>
      <Button size='lg' className='w-full' variant='outline' asChild>
        <Link to='http://localhost:5174/auth/login/google'>
          <FcGoogle className='h-5 w-5 mr-2' />
          Continue with Google
        </Link>
      </Button>
    </div>
  )
}

export default Social
