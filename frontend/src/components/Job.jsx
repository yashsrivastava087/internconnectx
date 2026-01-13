import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '@/hooks/useGetAllJobs'
const Job = ({job}) => {
    
    const navigate = useNavigate();
    useGetAllJobs();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
            <Button variant="outline" className="rounded-xl" size="icon"><Bookmark/></Button>
        </div>
        
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://template.canva.com/EAE1YAgPM_U/1/0/400w-R-Meu_EcnME.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg font-medium'>{job?.companyName}</h1>
                    <p className='text-sm text-gray-500'>{job?.location}</p>
                </div>

                
            </div>
            <div className='grid'>
                <h1 className='font-bold text-center mt-4 text-xl'>{job?.title}</h1>
                <p>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-3.5'>
            <Badge className="text-blue-800" variant="outline">{job?.jobType}  </Badge>
            <Badge className="text-[#6A38C2]" variant="ghost">{job?.salary} 36LPA </Badge>
            <Badge className="text-red-500" variant="ghost"> {job?.positions} positions </Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#6A38C2]">Save for later </Button>
            </div>
    </div>
  )
}

export default Job