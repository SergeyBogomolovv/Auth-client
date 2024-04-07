import { useAuth } from 'hooks/use-auth'
import { Avatar, AvatarImage } from 'components/ui/avatar'
import { FaUserCircle } from 'react-icons/fa'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import LogoutWrapper from 'components/auth/logout-wrapper'
import { RiUserAddFill } from 'react-icons/ri'
import { RiUserSharedFill } from 'react-icons/ri'
import { MdManageAccounts } from 'react-icons/md'
import { CiLogout } from 'react-icons/ci'

export default function ProfileButton() {
  const { user } = useAuth()
  const logo = user?.image.startsWith('avatars')
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
              <Link to='/settings'>
                <MdManageAccounts className='w-4 h-4 mr-2' />
                Settings
              </Link>
            </DropdownMenuItem>
            <LogoutWrapper>
              <DropdownMenuItem className='hover:cursor-pointer'>
                <CiLogout className='w-4 h-4 mr-2' />
                Logout
              </DropdownMenuItem>
            </LogoutWrapper>
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
                <Link to='/auth/login'>
                  <RiUserSharedFill className='w-4 h-4 mr-2' />
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='hover:cursor-pointer'>
                <Link to='/auth/registration'>
                  <RiUserAddFill className='w-4 h-4 mr-2' />
                  Registration
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  )
}
