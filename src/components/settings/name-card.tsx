import { User } from '@/interfaces/user'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'

export default function NameCard({ user }: { user: User }) {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(user.name)

  return (
    <div className='flex flex-row items-center justify-between rounded-lg border px-4 py-3 gap-2 shadow-md'>
      {editMode ? (
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='p-0 m-0 focus:outline-none bg-transparent font-medium'
          autoFocus
          onBlur={() => setEditMode(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditMode(false)
            }
          }}
        />
      ) : (
        <p className='font-medium'>{name}</p>
      )}

      <button onClick={() => setEditMode(true)}>
        <FaEdit className='w-6 h-6' />
      </button>
    </div>
  )
}
