import { useAuth } from '@/hooks/use-auth'

export default function LogoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout } = useAuth()
  return <span onClick={() => logout()}>{children}</span>
}
