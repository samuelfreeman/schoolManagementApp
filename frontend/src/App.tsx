
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'

import LoginPage from './Pages/LoginPage'
import { InputOTPForm } from './components/ui/component/OtpForm'

import Dashboard from './Pages/DashboardPage'

function App() {


  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp-verification" element={<InputOTPForm />} />
        </Routes>
      </Router>



    </>
  )
}

export default App
