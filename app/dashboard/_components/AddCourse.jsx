'use client'
import React from 'react'
import {useUser} from '@clerk/clerk-react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
function AddCourse() {

    const { user } = useUser()
  return (
    <div className='flex item-center justify-between'> 
        <div>
        <h2 className='text-2xl '>
            Hello, <span className='font-bold'>{user?.fullName}</span>
        </h2>
        <p className='text-gray-500 text-sm'>Create new course with AI, Share with Friends, </p>
        </div>
        <Link href={'/create-course'}> <Button>+ Create AI course</Button></Link>
       
       

        </div>
  )
}

export default AddCourse