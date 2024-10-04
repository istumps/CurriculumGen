import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
function Header() {
  return (
    //Can add search bar here
    <div className='flex justify-between items-center p-5 shadow-sm '>
        <Link className='cursor-pointer' href={'/dashboard'}> <Image  alt='logo' src={'/logo.svg'} width={50} height={50}/></Link>
     
      <UserButton  />
    </div>
  )
}

export default Header