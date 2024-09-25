import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React from 'react'
import { BiCategory } from "react-icons/bi";

function CourseBasicInfo({course}) {
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid gird-cols-1 md:grid-cols-2 gap-5'>
            <div>
                
                <h2 className='font-bold text-2xl'>{course?.courseOutput?.name}</h2>
                <p className='text-gray-400 mt-3 text-sm'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'> <BiCategory /> {course?.category}</h2>
                <Button className="w-full mt-5">Start</Button>
            </div>
            <div>
                <Image src={'/placeholder.png'} width={300} height={400} className=' w-full rounded-xl h-[250px] object-cover'/>

            </div>
        </div>
       
    </div>
  )
}

export default CourseBasicInfo