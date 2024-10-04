'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHome,  AiOutlineCompass, AiOutlineRocket, AiOutlineLogout } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import {Progress} from '@/components/ui/progress'
import {UserCourseListContext} from '@/app/_context/UserCourseListContext'
import { useClerk } from '@clerk/clerk-react';
function Sidebar() {

  const { signOut } = useClerk(); // Clerk's signOut method

  const path = usePathname()
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)
  const Menu =[
    {
      id:1,
      name: 'Home',
      icon: <AiOutlineHome />, 
      path: '/dashboard'

    },
    {
      id:2,
      name: 'Explore ',
      icon: <AiOutlineCompass />, 
      path: '/dashboard/explore'

    },
    {
      id:3,
      name: 'Upgrade ',
      icon: <AiOutlineRocket />, 
    path: '/dashboard/' // /dashboard/upgrade

    },
    {
      id:4,
      name: 'Log Out',
      icon: <AiOutlineLogout />, 
      path: '/sign-out'

    }
   
  

  ]
  const handleLogout = async () => {
    try {
      await signOut(); // Sign out the user using Clerk
     // console.log('User has logged out');
      // Optionally, redirect to homepage or any other path
      window.location.href = '/'; // Redirect to homepage after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src='/logo.svg' alt='logo' width={50} height={50}/>
        <hr className='py-5'/>
        <ul>
      {Menu.map((item, index) => (
        item.name === 'Log Out' ? (
          <div
            key={index}
            className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3`}
            onClick={handleLogout} // Call handleLogout on click
          >
            <div className='text-2xl'>{item.icon}</div>
            <h2>{item.name}</h2>
          </div>
        ) : (
          <Link href={item.path} key={index}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3
              ${item.path === path ? 'bg-gray-100 text-black' : ''}`}
            >
              <div className='text-2xl'>{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        )
      ))}
    </ul>

        <div className='absolute bottom-10 w-[80%]'>
          <Progress className='mt-5' value={(userCourseList?.length/5) *100} />
          <h2 className='text-sm my-2'>{userCourseList?.length} out of 5 Course created</h2>
          <h2 className='text-xs text-gray-500 '>Upgrade your plan for unlimited courses</h2>

        </div>
         
    </div>
  )
}

export default Sidebar