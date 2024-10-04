'use client'
import React,{ useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import CourseBasicInfo from '../_components/CourseBasicInfo'
import { FaRegCopy } from "react-icons/fa";
import Link from 'next/link'


function FinishScreen({params}) {

    const {user} = useUser()
    const [course, setCourse]=useState([])

    const router= useRouter()

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
        //console.log(result)
    }
  return (
    <div className='px-10 md:px-20 lg:px-44 my-7'>
        <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats, Your Course Is Ready!</h2>
        <CourseBasicInfo course={course} refreshData={()=>console.log("Refresh")}/>
        <h2 className='mt-3 text-lg '>Course URL:</h2>
        <div className=' flex display-flex w-full'>
        <Link href={`${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}/start`}>
        <button className='cursor-pointer text-center text-blue-500 underline border p-10 rounded text-lg flex gap-5 items-center'>
            {process.env.NEXT_PUBLIC_HOST_NAME}/course/{course?.courseId}/start
        </button>
        </Link>
    <FaRegCopy onClick={async()=>await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST_NAME+'/course/view/'+course?.courseId)}className='h-5 w-5 text-black-500 cursor-pointer' />
        </div>
    </div>
  )
}

export default FinishScreen