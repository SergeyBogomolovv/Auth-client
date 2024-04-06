import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarImage } from '../ui/avatar'
import { FaUserCircle } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'

export default function ProfileButton() {
  const { user } = useAuth()
  const logo = user?.image.startsWith('/avatars')
    ? `https://nest-auth.storage.yandexcloud.net/${user.image}`
    : user?.image
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className='w-8 h-8'>
              <AvatarImage src={logo} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className='hover:cursor-pointer'>
              <Link to='/settings'>Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FaUserCircle className='w-8 h-8' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Authorize</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link to='/auth/login'>Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link to='/auth/registration'>Registration</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  )
}
