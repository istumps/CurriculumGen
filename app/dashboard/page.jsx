import { UserButton } from '@clerk/nextjs'
import AddCourse from './_components/AddCourse'
import React from 'react'
import UserCourseList from './_components/UserCourseList'
function Dashboard() {
  return (
    <div>
      <AddCourse/>
      {/* List of Courses */}
      <UserCourseList/>
      </div>
  )
}

export default Dashboard