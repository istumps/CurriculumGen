'use client'
import React, {useState, useContext} from 'react'
import {useUser} from '@clerk/clerk-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {UserCourseListContext} from '@/app/_context/UserCourseListContext'

function AddCourse() {

    const { user } = useUser()
    const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)
    const [hasBoards, setHasBoards] = useState(false)


    

  return (
    <div className='flex items-center justify-between'> 
        <div>
        <h2 className='text-2xl '>
            Hello, <span className='font-bold'>{user?.fullName}</span>
        </h2>
        <p className='text-gray-500 text-sm'>Create new course with AI, Share with Friends, </p>
        </div>
        
        {userCourseList.length >= 5 ? (
          <div className='flex flex-col'>
            <h2 className='mt-4 text-red-500'>You have reached the course limit!</h2>
            <Button disabled={true}>+ Create AI course</Button>
          </div>
        ) : (
          <Link prefetch={true} href={'/create-course'}>
            <Button>+ Create AI course</Button>
          </Link>
        )}
              
       

        </div>
  )
}

export default AddCourse