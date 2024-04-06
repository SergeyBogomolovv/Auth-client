import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function Links() {
  return (
    <div className='flex items-center '>
      <Button variant={'link'} asChild>
        <Link to={'/'}>Home</Link>
      </Button>
      <Button variant={'link'} asChild>
        <Link to={'/blog'}>Blog</Link>
      </Button>
      <Button variant={'link'} asChild>
        <Link to={'/create-post'}>Create post</Link>
      </Button>
    </div>
  )
}
