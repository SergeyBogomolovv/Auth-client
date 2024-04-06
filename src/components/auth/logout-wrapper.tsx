import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export default function LogoutWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { logout } = useAuth()
  return (
    <span className={cn(className)} onClick={() => logout()}>
      {children}
    </span>
  )
}
