import { Route, Routes } from 'react-router'
import MainLayout from './assets/main-layout'
import MainPage from './pages/main'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='auth/login' />
        <Route path='auth/registration' />
        <Route path='settings' />
      </Route>
    </Routes>
  )
}

export default App
