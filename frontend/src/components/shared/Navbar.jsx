import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
const Navbar = () => {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

     const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'> Intern<span className='text-[#a3bc00]'>connectX </span></h1>
                </div>

                <div className=' flex items-center gap-6'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Jobs">Jobs</Link></li>
                        <li><Link to="/Browse">Browse</Link></li>
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button
                                        variant="ghost"
                                        className="bg-gray-50 text-black hover:bg-black hover:text-white  cursor-pointer"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup"><Button variant="outline" className=" bg-[#c1d63a] hover:bg-[#a3bc00] cursor-pointer">Signup</Button></Link>

                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80">

                                    <div className='flex items-center gap-5 space-y-1'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>

                                        <div>
                                            <h2 className='font-medium'>{user?.fullname}</h2><p className="text-sm text-muted-foreground">
                                                {user?.profile?.bio
                                                    ?.split(" ")
                                                    ?.slice(0, 10)
                                                    ?.join(" ") + (user?.profile?.bio?.split(" ").length > 10 ? "..." : "")
                                                }
                                            </p>

                                        </div>
                                    </div>

                                    <div className='flex flex-col text-gray-600'>

                                        <div className='flex w-fit my-2 items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Link to="/profile">
                                                <Button className="cursor-pointer" variant="link">View profile</Button>
                                            </Link>
                                        </div>
                                        <div className='flex w-fit items-center  gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Link to="/login">
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>  
                                            </Link>
                                        </div>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>-
        </div>
    )
}

export default Navbar