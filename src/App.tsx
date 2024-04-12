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
import { PropagateLoader } from 'react-spinners'
import GoogleRoute from './assets/google-route'
import BlogPage from './pages/blog'
import CreatePostPage from './pages/create-post'
import { useRefreshQuery } from 'api/profile'
import { useAppSelector } from 'hooks/redux'

function App() {
  const { currentUser } = useAppSelector((state) => state.profile)
  const { refetch, isLoading } = useRefreshQuery(null)

  useEffect(() => {
    if (!currentUser && localStorage.getItem('accesToken')) {
      refetch()
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
