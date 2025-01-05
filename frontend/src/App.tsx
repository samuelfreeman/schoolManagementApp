
import './App.css'
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'
import { LoginForm } from './components/ui/component/LoginForm'
import LoginPage from './Pages/LoginPage'

function App() {


  return (
    <>

<Router>
  <Routes>
    <Route  path="/signup" element={<SignUpPage />} />
    <Route  path="/login" element={<LoginPage />} />
  </Routes>
</Router>

      

    </>
  )
}

export default App
