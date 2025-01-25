import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import rootRoutes from "./routes/root.routes";

<<<<<<< HEAD
export default function App() {
  return (
    <>
      <RouterProvider router={rootRoutes} />
      <Toaster />
=======
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



>>>>>>> parent of 3dc7d4e (Included the analytics)
    </>
  );
}
