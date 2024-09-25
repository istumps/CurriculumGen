import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
function Header() {
  return (
    //Can add search bar here
    <div className='flex justify-between items-center p-5 shadow-sm'>
      <Image src={'/logo.svg'} width={50} height={50}/>
      <UserButton  />
    </div>
  )
}

export default Header