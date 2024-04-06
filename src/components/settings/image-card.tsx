import { User } from '@/interfaces/user'
import { RiImageEditLine } from 'react-icons/ri'

export default function ImageCard({ user }: { user: User }) {
  const image = user.image.startsWith('avatars')
    ? `https://yandex/${user.image}`
    : user.image
  return (
    <div className='group w-10/12 mx-auto'>
      <div className='relative'>
        <div className='opacity-0 absolute group-hover:opacity-50 transition-opacity h-full w-full bg-black cursor-pointer rounded-lg' />
        <img
          src={image}
          alt='User image'
          className='aspect-square w-full z-10 rounded-lg'
        />
        <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-3 transition-opacity py-2 outline-none'>
          <RiImageEditLine className='text-white transition-opacity w-8 h-8' />
        </button>
      </div>
    </div>
  )
}
