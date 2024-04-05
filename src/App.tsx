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
function App() {
  const { checkAuth, isLoading, user } = useAuth()

  useEffect(() => {
    if (!user && localStorage.getItem('accesToken')) checkAuth()
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
      </Route>
    </Routes>
  )
}

export default App
