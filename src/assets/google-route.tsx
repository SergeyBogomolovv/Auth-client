import { useAppDispatch } from '@/hooks/redux'
import { useGoogleLoginMutation } from '@/redux/api/profile'
import { setCurrentUser } from '@/redux/slices/profile'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'

export default function GoogleRoute() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const [googleAuth] = useGoogleLoginMutation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token) {
      googleAuth({ token })
        .unwrap()
        .then((data) => {
          localStorage.setItem('accesToken', data.accesToken)
          dispatch(setCurrentUser(data.user))
          return navigate('/settings')
        })
    }
  }, [])

  return (
    <div className='flex items-center justify-center w-full h-[100svh]'>
      <PropagateLoader color='white' />
    </div>
  )
}
