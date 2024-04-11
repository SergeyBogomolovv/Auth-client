import { useAppDispatch } from '@/hooks/redux'
import { useLogoutMutation } from '@/redux/api/profile'
import { setCurrentUser } from '@/redux/slices/profile'
import { cn } from 'lib/utils'

export default function LogoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()
  return (
    <span
      className={cn(className)}
      onClick={async () => {
        await logout(undefined)
          .unwrap()
          .then(() => {
            localStorage.removeItem('accesToken')
            dispatch(setCurrentUser(null))
          })
      }}
    >
      {children}
    </span>
  )
}
