import { useLogoutMutation } from '@/redux/api/profile'
import { cn } from 'lib/utils'

export default function LogoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [logout] = useLogoutMutation()
  return (
    <span
      className={cn(className)}
      onClick={() => {
        logout(undefined)
      }}
    >
      {children}
    </span>
  )
}
