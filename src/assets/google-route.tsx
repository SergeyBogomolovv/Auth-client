import { useGoogleLoginMutation } from '@/redux/api/profile'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'

export default function GoogleRoute() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const [googleAuth] = useGoogleLoginMutation()
  useEffect(() => {
    if (token) {
      googleAuth({ token })
        .unwrap()
        .then(() => {
          return navigate('/settings')
        })
    }
  }, [])

  return (
    <div className='flex items-center justify-center w-full'>
      <PropagateLoader color='white' />
    </div>
  )
}
