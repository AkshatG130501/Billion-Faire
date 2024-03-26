import { Input, Navbar } from "./components"
import { Navigate, Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import {  useAuthContext } from './context/AuthContext.jsx'
import AuthGuard from "./components/AuthGuard.jsx"
import { Toaster } from "react-hot-toast";

function App() {

  const { authUser } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={authUser ? <Navigate to='/game' /> : <Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to='/game' /> : <Signup/>}/>
        <Route path='/game' element={authUser ? <Home /> : <Navigate to="/" replace />}/>
      </Route>
    )
  )

  return (
    <>  
      <RouterProvider router={router}/>
      <Toaster />
    </>
  )
}

export default App
