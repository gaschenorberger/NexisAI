import LoginPage from './features/auth/pages/loginPage/loginPage'
import EmailAuthPage from './features/auth/pages/emailAuthPage/emailAuthPage'
import RegisterPage from './features/auth/pages/registerPage/registerPage'
import DashboardPage from './pages/DashboardPage/dashboardPage'
import WelcomePage from './pages/WelcomePage/welcomePage'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/auth/email' element={<EmailAuthPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
    </Routes>
  )
}

export default App
