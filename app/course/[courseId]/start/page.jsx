'use client'
import React, {useState, useEffect} from 'react'
import {db} from '@/configs/db'
import {Chapters, CourseList} from '@/configs/schema'
import {eq,and} from 'drizzle-orm'
import ChapterListCard from '@/app/course/[courseId]/start/_components/ChapterListCard'
import ChapterContent from '@/app/course/[courseId]/start/_components/ChapterContent'

function CourseStart({
    params, 
}) {
    const [course, setCourse] = useState()
    const [selectedChapter, setSelectedChapter] = useState()
    const [chapterContent, setChapterContent] = useState()
    const GetCourse=async()=>{
        const result = await db.select().from(CourseList)
        .where(eq(CourseList?.courseId, params?.courseId))

        setCourse(result[0])
       
        //console.log("First chapter", chapterContent)
    }
    useEffect(() => {
        params&&GetCourse()
    }, [params])
   
     useEffect(() => {
    course&&setSelectedChapter(course?.courseOutput?.chapters[0])
         course&&GetSelectedChapterContent(0)
     }, [course])

    const GetSelectedChapterContent=async(chapterId)=>{
        const result = await db.select().from(Chapters)
        .where(and(eq(Chapters?.chapterId,chapterId),eq(Chapters?.courseId, course?.courseId) ))
        setChapterContent(result[0])
       // console.log('THis is the content', result)
    }

  return (
    <div>
        {/* ChapterListSideBar */}
       <div className=' fixed md:w-80 hidden md:block h-screen border-r shadow-sm '>
        <h2 className='mt-5 font-medium text-2xl p-8 text-black'>{course?.courseOutput?.name}</h2>
        <div>
            {course?.courseOutput?.chapters.map((chapter, index) => (
                <div key={index} 
                className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.chapterName == chapter?.chapterName && 'bg-purple-50'}`}
                onClick={()=>{setSelectedChapter(chapter);GetSelectedChapterContent(index) }} >
                   <ChapterListCard chapter={chapter} index={index}
                   
                   />
                    </div>
                
            ))}
        </div>

       </div>
         {/* Content */}
         <div className='md:ml-64 p-10'>    
            <ChapterContent chapter={selectedChapter} content={chapterContent} />
         </div>
        


    </div>
  )
}

export default CourseStart