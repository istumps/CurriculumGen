'use client'
import React, { useState, useEffect } from 'react'
import {db} from '@/configs/db'
import {CourseList} from '@/configs/schema'
import {eq} from 'drizzle-orm'
import Header from '@/app/dashboard/_components/Header'
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList'

function Course({
    params
}) {
    const [course, setCourse] = useState()

    const GetCourse=async()=>{
        const result = await db.select().from(CourseList)
        .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(result[0])
       // console.log(result)
    }

    useEffect(() => {
        params&&GetCourse()
    }, [params])

return (
    <div>
        <Header/>
        <div className='px-10 p-10 md:px-20 lg:px-44'> 
        <CourseBasicInfo course={course} edit={false}/>
        <CourseDetails course={course}/>
        <ChapterList course={course} edit={false} />
        </div>
       

    </div>
  )
}

export default Course