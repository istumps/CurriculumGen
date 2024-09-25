import Image from 'next/image'
import {Button} from '@/components/ui/button'
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm '>
        <Image src={'/logo.svg'} width={50} height={50}/>
        <Button>Get Started</Button>
        
    </div>
  )
}

export default Header