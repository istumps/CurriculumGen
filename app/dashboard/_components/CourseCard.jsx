import Image from 'next/image'
import React from 'react'
import { IoMdBook } from "react-icons/io";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseCard({
   course,
   refreshData


}) {


   const handleOnDelete = async () => {
     const resp = await db.delete(CourseList)
     .where(eq(CourseList?.id, course?.id))
     .returning({id:CourseList.id})


     if (resp) {
       refreshData()
     }
   }
 return (


   <div className='shadow-sm rounded-lg border p-2 transition-all cursor-pointer mt-4'>
    <Link href={`/course/${course?.courseId}`}>
        <Image src={course?.courseBanner} alt={course?.name} width={300} height={200}
        className='w-full h-[200px] object-cover rounded-lg'/>
      </Link>

       <div className='p-2 '>
           <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.name}
         
           <DropdownOption handleOnDelete={()=>handleOnDelete()}> < IoEllipsisVerticalSharp /></DropdownOption>
           </h2>
           <p className='text-sm text-gray-500 my-1'>{course?.courseOutput?.category}</p>
           <div className='flex items-center justify-between'>
               <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'> <IoMdBook />{course?.courseOutput?.chapters.length}</h2>
               <h2 className=' text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.level}</h2>


           </div>
       </div>
   </div>
 
  )
}


export default CourseCard