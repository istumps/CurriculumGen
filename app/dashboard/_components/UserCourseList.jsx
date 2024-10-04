'use client'
import React, {useContext, useEffect, useState} from 'react'
import {db} from '@/configs/db'
import {CourseList} from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import {eq} from 'drizzle-orm'
import CourseCard from './CourseCard'
import {UserCourseListContext} from '@/app/_context/UserCourseListContext'
function UserCourseList() {

  const {user} = useUser()
  const [courseList, setCourseList] = useState([])
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)
 const getUserCourse=async()=>{
   
    const result = await db.select()
    .from(CourseList)
    .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress))
    //console.log(result)
    setCourseList(result)
    setUserCourseList(result)
  }
  
  useEffect(() => {
    user&&getUserCourse(); 
  }, [user])
  

  return (
    <div>
      <h2 className='font-medium text-xl mt-10'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
      {courseList?.length>0?courseList.map((course, index) => (
        <CourseCard course={course} key={index} refreshData={()=>getUserCourse()}/>
      ))
      :
      <div className='text-center ju w-full mt-20 '>
      <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
        You don't have any courses yet
      </h2>
      <p className='text-gray-400 mb-6'>
        Click 'Create AI Course' to generate one!
      </p>
  
    </div>
       
        }
    </div>
    </div>
  )
}

export default UserCourseList