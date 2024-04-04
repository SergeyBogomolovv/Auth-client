import { Route, Routes } from 'react-router'
import MainLayout from './assets/main-layout'
import MainPage from './pages/main'
import LoginPage from './pages/login'
import RegistrationPage from './pages/registration'
import Settings from './pages/settings'
import AuthLayout from './assets/auth-layout'
import SettingLayout from './assets/settings-layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='registration' element={<RegistrationPage />} />
        </Route>
        <Route path='settings' element={<SettingLayout />}>
          <Route index element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
