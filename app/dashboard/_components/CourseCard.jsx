'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { IoMdBook } from "react-icons/io";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import DropdownOption from './DropdownOption';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq, is } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Chapters } from '@/configs/schema';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
function CourseCard({
  course,
  refreshData


}) {
 
  const pathname = usePathname();
  
  const [isExplore,setIsExplore] = useState(false);

  useEffect(() => {
    if (pathname === '/dashboard/explore') {
      setIsExplore(true);
    }
    else{
      setIsExplore(false);
    }
  }
  )

  const handleOnDelete = async () => {
    
      const selectedChapterIDs = await db
        .select({
          chapterId: Chapters.chapterId,
          courseId: Chapters.courseId
        })
        .from(Chapters)
        .where(eq(Chapters.courseId, course.courseId)); 

        //console.log('Selected Chapters:', selectedChapterIDs);
  
      const deleteChapters = await db.delete(Chapters)
        .where(eq(Chapters.courseId, course.courseId)) // Deleting by courseId
        .returning({ id: Chapters.id }); // Returning deleted chapter ids for confirmation
        

      const deleteCourse = await db.delete(CourseList)
        .where(eq(CourseList.courseId, course.courseId)) 
        .returning({ id: CourseList.id }); 
  
      if (deleteCourse) {
        toast.success('Course Deleted Successfully');


        refreshData(); // Refresh the data after successful deletion
    }
  
  };
  
  return (


    <div className='shadow-sm rounded-lg border p-2 w-full max-w-md mt-4'>

      <Image src={course?.courseBanner} alt={course?.name} width={300} height={200}
        className='w-full h-[200px] object-cover rounded-lg' />


      <div className='p-2 '>
        <h2 className='font-medium text-lg flex justify-between items-center'>{course?.courseOutput?.name}

        {!isExplore && (
            <DropdownOption handleOnDelete={() => handleOnDelete(course.id)}>
              <IoEllipsisVerticalSharp />
            </DropdownOption>
          )}
        
        </h2>
        <p className='text-sm text-gray-500 my-1'>{course?.courseOutput?.category}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm'> <IoMdBook />{course?.courseOutput?.chapters.length}</h2>
          <h2 className=' text-sm bg-purple-50 text-primary p-1 rounded-sm'>{course?.level}</h2>


        </div>
        <hr className='mt-3 w-full'/>
        
      </div>
      <div>
      
        <Link href={`/course/${course?.courseId}`}>
          <Button className='w-full text-lg'> View</Button>      
          </Link>
          </div>
      
    </div>

  )
}


export default CourseCard