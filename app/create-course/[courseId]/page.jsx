'use client'
import React, { useEffect,useState,useContext } from 'react'

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
import { toast } from 'sonner'
import { UserInputContext } from '@/app/_context/UserInputContext'


function CourseLayout({params}) {
  const {userCourseInput, setUserCourseInput}=useContext(UserInputContext)

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

    const GenerateChapterContent = async () => {
  setLoading(true);
  const chapters = course?.courseOutput?.chapters;

  try {
    // Process chapters sequentially using a for...of loop
    for (const [index, chapter] of chapters.entries()) {
      const prompt =
        'Explain the concept in Detail on Topic: ' +
        course?.name +
        ', Chapter: ' +
        chapter?.chapterName +
        ' ,in JSON format with list of array fields as title explanation on given chapter in detail and example if Code example (code field in <precode> format) when applicable';

      //console.log({ prompt });
      let videoId = '';
      if (userCourseInput?.displayVideo == "Yes") {
      // Generate Video
  

      // Await video response
      const videoResp = await service.getVideos(course?.name + ':' + chapter?.chapterName);
      //console.log(videoResp);
      videoId = videoResp[0]?.id?.videoId || '';
      }
      else{
        

       // console.log('No video to generate');
      }

      // Generate Chapter Content from AI
      const result = await GenerateChapterContent_AI.sendMessage(prompt);
      const textResponse = await result.response?.text(); // Await text response
      const content = JSON.parse(textResponse);
      //console.log(content);

      // Save chapter content + video URL to the database
      const NewContent = await db.insert(Chapters).values({
        courseId: course?.courseId,
        chapterId: index,
        content: content,
        videoId: videoId,
        publish: true,
      });

      if (!NewContent) {
        throw new Error('Failed to save chapter content');
      }
    }

    // After all chapters are processed, navigate to finish page
    router.replace(`/create-course/${course?.courseId}/finish`);
  } catch (e) {
    setLoading(false);
   // console.error('Error:', e);
    
    toast.error('Failed to generate course content, please try again!');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='mt-10 md:px-20 lg:px-44 ' >
        <h2 className='font-bold text-center text-2xl'>Preview Course Layout</h2>
        
        <LoadingDialog loading={loading} />
        {/* BasicInfo */}
        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>

        {/* courseDetails */}
        <CourseDetails course={course} />

        {/* ListofLessons */}
        <ChapterList course={course} refreshData={()=>GetCourse()}/>
        
        <div className='w-full flex justify-end'>
            <Button onClick={GenerateChapterContent} className='my-10'>
                Generate Course Content
            </Button>
        </div>
        
    </div>
  )
}

export default CourseLayout