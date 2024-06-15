import { BrowserRouter , Route , Routes } from 'react-router-dom'
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Home} from "./pages/Home"
import { Dashboard } from './pages/Dashboard'
import {PrivateRoute} from './components/PrivateRoute'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
