import { useProfile } from '@/hooks/use-profile'
import { User } from 'interfaces/user'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'sonner'

export default function NameCard({ user }: { user: User }) {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState(user.name)
  const { updateName } = useProfile()
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border px-4 py-3 gap-2 shadow-md'>
      {editMode ? (
        <input
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          className='p-0 m-0 focus:outline-none bg-transparent font-medium'
          autoFocus
          onBlur={() => {
            if (name.length < 3) {
              setName(user.name)
              toast.error('Name must be more than 3 charachters')
              setEditMode(false)
              return
            }
            updateName(name).then((res) => {
              if (res?.error) toast.error(res.error)
              if (res?.succes) toast.success(res.succes)
            })
            setEditMode(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (name.length < 3) {
                setName(user.name)
                toast.error('Name must be more than 3 charachters')
                setEditMode(false)
                return
              }
              updateName(name).then((res) => {
                if (res?.error) toast.error(res.error)
                if (res?.succes) toast.success(res.succes)
              })
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
