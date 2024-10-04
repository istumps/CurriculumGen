import React from 'react';
import { CiClock2 } from "react-icons/ci";

function ChapterListCard({
    chapter,
    index
}) {
  return (
    <div className='flex items-start p-5 border-b gap-4'>
      {/* Chapter Number */}
      <div>
        <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center justify-center'>{index + 1}</h2>
      </div>

      {/* Chapter Title and Duration */}
      <div>
        <h2 className='font-medium text-lg'>{chapter?.chapterName}</h2>
        <h2 className='flex items-center gap-2 text-sm text-primary mt-1'>
          <CiClock2 /> {chapter?.duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
