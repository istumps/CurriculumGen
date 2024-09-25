'use client'
import React, { useEffect,useState } from 'react'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'

import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
function CourseLayout({params}) {

    const {user} = useUser()
    const [course, setCourse]=useState([])

    useEffect(() => {
        params&&GetCourse()
    },[params,user])


    const GetCourse=async ()=>{
        const result =await db.select()
        .from(CourseList)
        .where(and
            (eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)))
        
        setCourse(result[0])    
        console.log(result)
    }
  return (
    <div className='mt-10 md:px-20 lg:px-44' >
        <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
        {/* BasicInfo */}
        <CourseBasicInfo course={course}/>

        {/* courseDetail */}
        <CourseDetails course={course}/>

        {/* ListofLesson */}
        <ChapterList course={course}/>
    </div>
  )
}

export default CourseLayout