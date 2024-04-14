import { User } from 'interfaces/user'
import { RiImageEditLine } from 'react-icons/ri'
import { useRef } from 'react'
import { toast } from 'sonner'
import { useUpdateLogoMutation } from '@/redux/api/profile'

export default function ImageCard({ user }: { user: User }) {
  const inputRef: React.Ref<HTMLInputElement> = useRef(null)
  const imageUrl = user.image.startsWith('avatars')
    ? `https://nest-auth.storage.yandexcloud.net/${user.image}`
    : user.image
  const [updateAvatar] = useUpdateLogoMutation()
  return (
    <div className='group w-10/12 mx-auto'>
      <div className='relative'>
        <div
          onClick={() => inputRef.current?.click()}
          className='opacity-0 absolute group-hover:opacity-50 transition-opacity h-full w-full bg-black cursor-pointer rounded-lg'
        />
        <img
          src={imageUrl}
          alt='User image'
          className='aspect-square object-cover w-full z-10 rounded-lg shadow-md'
        />
        <input
          type='file'
          accept='.png,.jpeg,.jpg,.webp'
          ref={inputRef}
          onChange={async (e) => {
            if (e.target.files?.length) {
              const data = new FormData()
              data.append('image', e.target.files[0])
              await updateAvatar(data)
                .unwrap()
                .then(() => {
                  toast.success('Avatar succesful updated')
                })
                .catch(() => {
                  toast.error('Failed to update avatar')
                })
            }
          }}
          hidden
        />
        <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-3 transition-opacity py-2 outline-none'>
          <RiImageEditLine className='text-white transition-opacity w-8 h-8' />
        </button>
      </div>
    </div>
  )
}
