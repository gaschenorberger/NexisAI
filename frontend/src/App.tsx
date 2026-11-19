import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import LoginPage from './features/auth/pages/loginPage/loginPage'
import WelcomePage from './pages/WelcomePage/welcomePage'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
