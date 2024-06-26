import Links from 'components/header/links'
import ProfileButton from 'components/header/profile-button'

export default function Header() {
  return (
    <div className='px-20 py-3 flex items-center justify-between bg-white'>
      <Links />
      <ProfileButton />
    </div>
  )
}
