
import './App.css'
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'

import SignUpPage from './Pages/SignUpPage'

function App() {


  return (
    <>

<Router>
  <Routes>
    <Route  path="/signup" element={<SignUpPage />} />
  </Routes>
</Router>

      

    </>
  )
}

export default App
