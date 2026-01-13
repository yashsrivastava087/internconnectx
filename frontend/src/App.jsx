
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './components/Home.jsx';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Jobdescription from './components/Jobdescription';


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/Browse',
    element:<Browse/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/description/:id',
    element:<Jobdescription/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
])
function App() {

  return (
   <>
   <RouterProvider router = {appRouter}/>
   </>
  )
}

export default App