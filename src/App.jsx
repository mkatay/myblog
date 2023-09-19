import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

import { Detail } from './pages/Detail';
import { AddEditBlog } from './pages/AddEditBlog';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import {SignIn} from './pages/SignIn'
import {SignUp} from './pages/SignUp'
import { UserProvider } from './context/UserContext';
import { PwReset } from './pages/PwReset';

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<AddEditBlog/>}/>
        <Route path='/update/:id' element={<AddEditBlog/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/pwreset' element={<PwReset/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
