'use client'
import React, { useEffect,useState } from 'react'

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import { Chapters } from '@/configs/schema'

import { GenerateChapterContent_AI } from '@/configs/AiModel'
import service from '@/configs/service'

import { and, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'

import CourseBasicInfo from './_components/CourseBasicInfo'
import CourseDetails from './_components/CourseDetails'
import ChapterList from './_components/ChapterList'
import LoadingDialog from './_components/LoadingDialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'




function CourseLayout({params}) {

    const {user} = useUser()
    const [course, setCourse]=useState([])
    const [loading, setLoading]=useState(false)

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

    const GenerateChapterContent= ()=>{
        setLoading(true)
        const chapters = course?.courseOutput?.chapters
        chapters.forEach(async(chapter,index)=>{
            const prompt= 'Explain the concept in Detail on Topic: '+course?.name+ ', Chapter: '+chapter?.chapterName+ ' ,in JSON format with list of array fields as title explanation on given chapter in detail and example if Code example (code field in <precode> format) when applicable'

            console.log({prompt})
           // if (index<3){
                try {
                    //Generate Video 
                    let videoId= ''
                     
                     service.getVideos(course?.name+':'+chapter?.chapterName).then((resp)=>{

                        console.log(resp)
                        videoId=resp[0]?.id?.videoId
                    }) 
                    //Generate ChapterContent
                    const result = await GenerateChapterContent_AI.sendMessage(prompt)
                    console.log(result.response?.text())
                    const content =JSON.parse(result.response?.text())
                   

                  

                    //Save chaptercontent + video URL 
                   await db.insert(Chapters).values({
                        courseId: course?.courseId,
                        chapterId: index,
                        content: content,
                        videoId: videoId
                    })

                    setLoading(false)
                }
                catch(e){
                    setLoading(false)
                    console.log("Error", e)
            }
            await db.update(CourseList).set({
                publish:true
            }).where(eq(CourseList.id, course?.id))
            router.replace('/create-course/'+course?.courseId+'/finish')
       // }
            
            } )
    }
  return (
    <div className='mt-10 md:px-20 lg:px-44' >
        <h2 className='font-bold text-center text-2xl'>Course Layout</h2>
        
        <LoadingDialog loading={loading} />
        {/* BasicInfo */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>

        {/* courseDetails */}
        <CourseDetails course={course} />

        {/* ListofLessons */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>

        <Button onClick={GenerateChapterContent} className='my-10'>Generate Course Content</Button>
    </div>
  )
}

export default CourseLayout