import Links from './links'
import ProfileButton from './profile-button'

export default function Header() {
  return (
    <div className='w-full fixed top-0 px-20 py-3 flex items-center justify-between bg-white'>
      <Links />
      <ProfileButton />
    </div>
  )
}
