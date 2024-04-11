import { Route, Routes } from 'react-router'
import MainLayout from './assets/main-layout'
import MainPage from './pages/main'
import LoginPage from './pages/login'
import RegistrationPage from './pages/registration'
import Settings from './pages/settings'
import AuthLayout from './assets/auth-layout'
import SettingLayout from './assets/settings-layout'
import Private from './hoc/Private'
import { useEffect } from 'react'
import { useAuth } from './hooks/use-auth'
import { PropagateLoader } from 'react-spinners'
import GoogleRoute from './assets/google-route'
import BlogPage from './pages/blog'
import CreatePostPage from './pages/create-post'
import { useRefreshQuery } from './redux/api/profile'
import { useAppDispatch } from './hooks/redux'
import { setCurrentUser } from './redux/slices/profile'

function App() {
  const { user } = useAuth()
  const { refetch, isLoading } = useRefreshQuery(null)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!user && localStorage.getItem('accesToken')) {
      refetch().then((data) => {
        if (data.data?.accesToken && data.data.user) {
          localStorage.setItem('accesToken', data.data.accesToken)
          dispatch(setCurrentUser(data.data.user))
        }
      })
    }
  }, [])

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-[100svh]'>
        <PropagateLoader color='white' />
      </div>
    )

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='api/google/callback' element={<GoogleRoute />} />
        <Route index element={<MainPage />} />
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='registration' element={<RegistrationPage />} />
        </Route>
        <Route path='settings' element={<SettingLayout />}>
          <Route
            index
            element={
              <Private>
                <Settings />
              </Private>
            }
          />
        </Route>
        <Route path='blog' element={<BlogPage />} />
        <Route
          path='create-post'
          element={
            <Private>
              <CreatePostPage />
            </Private>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
