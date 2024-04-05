import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'

export default function GoogleRoute() {
  const [searchParams] = useSearchParams()
  const { google } = useAuth()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      google(token).then(() => navigate('/settings'))
    }
  }, [])

  return (
    <div className='flex items-center justify-center w-full h-[100svh]'>
      <PropagateLoader color='white' />
    </div>
  )
}
