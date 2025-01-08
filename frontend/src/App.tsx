
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'

import LoginPage from './Pages/LoginPage'
import { InputOTPForm } from './components/ui/component/OtpForm'
import HomePage from './Pages/HomePage'

function App() {


  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp-verification" element={<InputOTPForm />} />
        </Routes>
      </Router>



    </>
  )
}

export default App
