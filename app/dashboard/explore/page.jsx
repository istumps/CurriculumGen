'use client'
import { CourseList } from '@/configs/schema'
import { db } from '@/configs/db';
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';

function Explore() {

  const [courseList, setCourseList] = useState([])

  useEffect(() => {
    GetAllCourse()
  }, [])

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList)
    .limit(6)
    .offset(0)
    setCourseList(result)
    //console.log('This is result', result)
  }

  return (
    <div className=''>
      <h2 className='font-bold text-3xl'>Explore More Projects</h2>
      <p>Explore Community AI courses</p>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList.map((item, index) => (  
          <div >
            <CourseCard course={item} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default Explore