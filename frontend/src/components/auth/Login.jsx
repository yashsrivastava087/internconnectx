import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {

  const [input, setinput] = useState({
    email: "",
    pw: "",
    role: ""

  })

  const { loading } = useSelector(store => store.auth);

  const inputhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submithandle = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(setLoading(false));
    }

  }
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto space-y-3'>
        <form onSubmit={submithandle} className='w-1/2 border border-gray-150 rounded-md p-4 my-12'>
          <h1 className='font-bold text-center mb-5 text-2xl'>Login</h1>

          <div className='my-5'>
            <Label>Email</Label>
            <Input
              value={input.email}
              name="email"
              type="email"
              onChange={inputhandler}
              placeholder="email@gmail.com"
            />
          </div>
          <div className='my-5'>
            <Label>Password</Label>
            <Input
              value={input.pw}
              name="pw"
              onChange={inputhandler}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className='flex items-center justify-center font-semibold'>

            <RadioGroup className="flex items-center gap-4 my-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={inputhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={inputhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Student</Label>
              </div>
            </RadioGroup>


          </div>
          {
            loading
              ? (
                <Button disabled className="w-full my-4 flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin"/>
                  Please wait..
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4">Login</Button>
              )
          }


          <span className='text-sm'>Dont have an account?<Link to="/Signup" className="text-blue-600">SignUp</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Login
