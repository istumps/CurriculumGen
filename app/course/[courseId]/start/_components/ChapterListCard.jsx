import React from 'react'
import { CiClock2 } from "react-icons/ci";

function ChapterListCard({
    chapter,
    index
}) {
  return (
    <div className=' grid-cols-5 p-3 items-center border-b gap-2'>
      <div>
        <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center'>{index+1}</h2>
      </div>

      <div className='cols-span-4'>
        <h2 className='font-medium'>{chapter?.chapterName}</h2>
        <h2 className='flex items-center gap-2 text-md text-primary'><CiClock2 />{chapter?.duration}</h2>

      </div>
      

    </div>
  )
}

export default ChapterListCard