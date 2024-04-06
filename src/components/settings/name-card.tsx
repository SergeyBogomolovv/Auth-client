import { User } from '@/interfaces/user'
import { FaEdit } from 'react-icons/fa'

export default function NameCard({ user }: { user: User }) {
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border px-4 py-3 gap-2'>
      <p className='font-medium'>{user.name}</p>
      <button>
        <FaEdit className='w-6 h-6' />
      </button>
    </div>
  )
}
