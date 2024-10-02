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
    console.log(result)
    setCourseList(result)
    setUserCourseList(result)
  }
  
  useEffect(() => {
    user&&getUserCourse(); 
  }, [user])
  

  return (
    <div>
      <h2 className='font-medium text-xl mt-10'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
      {courseList.map((course, index) => (
        <CourseCard course={course} key={index} refreshData={()=>getUserCourse()}/>
      ))}
    </div>
    </div>
  )
}

export default UserCourseList