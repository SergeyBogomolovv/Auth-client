import { useAuth } from 'hooks/use-auth'
import { Navigate, useLocation } from 'react-router'

interface Props {
  children: React.ReactNode
}

export default function Private({ children }: Props) {
  const location = useLocation()
  const { user } = useAuth()
  if (!user) {
    return <Navigate to='/auth/login' state={{ from: location }} />
  }
  return children
}
