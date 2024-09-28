import React from 'react'
import { CiClock2 } from "react-icons/ci";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import EditChapters from './EditChapters';
function ChapterList({ course,refreshData }) {
  return (
    <div className="space-y-4">
      {course?.courseOutput?.chapters?.map((chapter, index) => (
        <div
          key={index}
          className="border cursor-pointer hover:scale-105 transform transition-transform duration-300 p-6 rounded-xl shadow-sm mt-3 flex space-y-4"
        >

          <div className="flex flex-col flex-grow space-y-2">

            <div className="flex items-center">
              <h2 className="text-xl font-medium flex">
                {`Chapter ${index + 1}: ${chapter?.chapterName}`}
              </h2>
              <div className="ml-2 text-2xl whitespace-nowrap">
                <EditChapters index={index} course={course} refreshData={refreshData} />
              </div>
            </div>



            <p className="text-gray-500 text-sm">{chapter?.about}</p>


            <div className="flex items-center gap-2 text-primary mt-4">
              <CiClock2 className="text-3xl text-primary" />
              <h2 className="font-medium text-lg">{chapter?.duration}</h2>
            </div>
          </div>

          <div className="flex items-center ml-4">
            <IoIosCheckmarkCircleOutline className="text-gray-300 text-4xl" />
          </div>
        </div>
      ))}
    </div>
  );

}

export default ChapterList