import Image from 'next/image'
import {Button} from '@/components/ui/button'
import React from 'react'
import { User } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm '>
        <Image  alt='logo' src={'/logo.svg'} width={50} height={50}/>
        <UserButton/>
        
    </div>
  )
}

export default Header