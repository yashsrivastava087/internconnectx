import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'

import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
const Signup = () => {

  const [input, setinput] = useState({
    fullname: "",
    collegeemail: "",
    email: "",
    pw: "",
    phonenumber: "",
    role: "",
    file: ""
  });

  const {loading} = useSelector(store=>store.auth);


  const inputhandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }
  const filehandler = (e) => {
    setinput({ ...input, file: e.target.files?.[0] });
  }
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const submithandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("collegeemail", input.collegeemail)
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("pw", input.pw);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  return (

    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submithandle} className='w-1/2 border border-gray-150 rounded-md p-4 my-12'>
          <h1 className='font-bold text-center mb-5 text-2xl'>Signup</h1>
          <div className='my-3'>
            <Label>Full Name</Label>
            <Input
              value={input.fullname}
              name="fullname"
              onChange={inputhandler}
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className='my-3'>
            <Label>Email</Label>
            <Input
              value={input.email}
              name="email"
              onChange={inputhandler}
              type="email"
              placeholder="email@gmail.com"
            />
          </div>
          <div className='my-3'>
            <Label>Password</Label>
            <Input
              value={input.pw}
              name="pw"
              onChange={inputhandler}
              type="password"
              placeholder="Create your password"
            />
          </div>

          <div className='my-3'>
            <Label>Phone Number</Label>
            <Input
              value={input.phonenumber}
              name="phonenumber"
              onChange={inputhandler}
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>


          <div className='flex items-center justify-between'>

            <RadioGroup className="flex items-center gap-4 my-5">
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

            <div className='flex items-center gap-2'>

              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={filehandler}
                className="cursor-pointer bg-gray-100"
              />
            </div>

          </div>
          {input.role === "student" && (
            <div className='my-3'>
              <Label>
                College Email<span className="text-red-500">*</span>
              </Label>
              <Input
                value={input.collegeemail}
                name="collegeemail"
                onChange={inputhandler}
                type="email"
                placeholder="email@ac.in (only if you are a student)"
              />
            </div>
          )}
          {
            loading ? <Button > <Loader2 className="w-full my-4 animate-spin"> Please wait..</Loader2></Button>:
          <Button type="submit" className="w-full my-4 cursor-pointer">SignUp</Button>
          }
          <span className='text-sm'>Already have an account?<Link to="/Login" className="text-blue-600">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Signup
