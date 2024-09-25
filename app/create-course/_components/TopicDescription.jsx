import React, { useContext } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UserInputContext } from '@/app/_context/UserInputContext'
function TopicDescription() {
  const {userCourseInput, setUserCourseInput}=useContext(UserInputContext)

  const handleInputChange=(fieldName, value)=>{
    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }

  return (
    <div className='mx-20 mt-5 lg:mx-44'>
        {/* Topic */}
        <div className='mt-10'>
            <label>Write the topic you want to generate a course (e.g Python Course, Yoga, etc.) </label>
            <Input placeholder={'Topic'}
            defaultValue={userCourseInput?.topic}
            onChange={(e)=>handleInputChange('topic', e.target.value)}
            />
        </div>
        <div className='mt-10'>
            <label>Write a description about the topic you want to generate a course</label>
            <Textarea placeholder={'About your course'}
            className='h-24 text-xl'
            defaultValue={userCourseInput?.description}
            onChange={(e)=>handleInputChange('description', e.target.value)}
            />
        </div>
        {/* Description */}

    </div>
  )
}

export default TopicDescription