import { useAppSelector } from '@/hooks/redux'
import { Navigate, useLocation } from 'react-router'

interface Props {
  children: React.ReactNode
}

export default function Private({ children }: Props) {
  const location = useLocation()
  const { currentUser } = useAppSelector((state) => state.profile)
  if (!currentUser) {
    return <Navigate to='/auth/login' state={{ from: location }} />
  }
  return children
}
