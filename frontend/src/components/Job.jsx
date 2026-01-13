import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
const Job = () => {
    const navigate = useNavigate();
    const jobId = "433"
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>2 days ago</p>
            <Button variant="outline" className="rounded-xl" size="icon"><Bookmark/></Button>
        </div>
        
            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="https://template.canva.com/EAE1YAgPM_U/1/0/400w-R-Meu_EcnME.jpg" />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg font-medium'>Company Name</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>

                
            </div>
            <div className='grid'>
                <h1 className='font-bold text-center mt-4 text-xl'>Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, laudantium in amet est atque officiis incidunt dignissimos.</p>
            </div>

            <div className='flex items-center gap-2 mt-3.5'>
            <Badge className="text-blue-800" variant="outline"> Remote </Badge>
            <Badge className="text-[#6A38C2]" variant="ghost"> 36LPA </Badge>
            <Badge className="text-red-500" variant="ghost"> 10 positions </Badge>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={()=>navigate(`/description/${jobId}`)} variant="outline">Details</Button>
                <Button className="bg-[#6A38C2]">Save for later </Button>
            </div>
    </div>
  )
}

export default Job