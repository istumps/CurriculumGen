import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import { BiCategory } from "react-icons/bi";
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebaseConfig';
import { getDownloadURL } from 'firebase/storage';
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';


function CourseBasicInfo({
    course,
    refreshData}) {

        /**
         * Select file and upload to firebase storage
         * @param {*} event
         */
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if(course){
            setSelectedFile(course?.courseBanner)
        }
    }, [course])
    const onFileSelected= async(event)=>{
        const file = event.target.files[0]; 
        setSelectedFile(URL.createObjectURL(file));
        const fileName=Date.now()+'.jpg'
        const storageRef=ref(storage,'ai-course/'+fileName)
        
        await uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded file completed');
        }).then(resp=>{
            getDownloadURL(storageRef).then(async(downloadURL) => {
                console.log(downloadURL)
                await db.update(CourseList).set({
                    courseBanner:downloadURL
                }).where(eq(CourseList.id, course?.id))
                })
            })
     
    }
  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
        <div className='grid gird-cols-1 md:grid-cols-2 gap-5'>
            <div>
                
                <h2 className='font-bold text-2xl flex'>{course?.courseOutput?.name} <EditCourseBasicInfo course={course} refreshData={()=>refreshData(true)}/> </h2>
                <p className='text-gray-400 mt-3 text-sm'>{course?.courseOutput?.description}</p>
                <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'> <BiCategory /> {course?.category}</h2>
                <Button className="w-full mt-5">Start</Button>
            </div>
            <div>
                <label htmlFor='upload-img' className='cursor-pointer'>
                <Image src={ selectedFile?selectedFile:'/placeholder.png'}  width={300} height={300} 
                    className='w-full max-w-[600px] h-full  max-h-[375px] object-fit rounded-xl'/> 
                    </label>
                <input type='file' id='upload-img' className=' opacity-0' onChange={onFileSelected} />
            </div>
        </div>
       
    </div>
  )
}

export default CourseBasicInfo