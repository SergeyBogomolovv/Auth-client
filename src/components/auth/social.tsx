import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'

const Social = () => {
  return (
    <div className='flex items-center justify-center w-full gap-x-2'>
      <Button size='lg' className='w-full' variant='outline'>
        <FcGoogle className='h-5 w-5 mr-2' />
        Continue with Google
      </Button>
    </div>
  )
}

export default Social
