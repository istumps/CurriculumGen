'use client'
import React, {useState, useContext, useEffect} from 'react'
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { MdTopic } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '@/app/_context/UserInputContext';
import { GenerateCourseLayout_AI } from '@/configs/AiModel';
import LoadingDialog from './_components/LoadingDialog';

function CreateCourse() {


    const StepperOptions=[
        {
        id:1, 
        name:'Category',
        icon:<HiMiniSquare3Stack3D />
    },
    {
        id:2, 
        name:'Topic & Desc',
        icon:<MdTopic />

    },
    {
        id:3, 
        name:'Options',
        icon:<IoMdSettings />

    }
]

const [activeIndex, setActiveIndex] =useState(0)
const {userCourseInput, setUserCourseInput}=useContext(UserInputContext)
const [loading, setLoading]=useState(false)

/*useEffect(()=>{
    console.log(userCourseInput)
},[userCourseInput])
*/
const checkStatus=()=>{
    if (userCourseInput?.length==0){
        return true
    }
    if (activeIndex==0 &&(userCourseInput?.category.length==0||userCourseInput?.category==undefined)){
        return true
    }
    if(activeIndex==1 &&(userCourseInput?.topic?.length==0||userCourseInput?.topic?.length==undefined)){
        return true
    }
    else if(activeIndex==2 &&(
        userCourseInput?.level==undefined||
        userCourseInput?.duration==undefined||
        userCourseInput?.displayVideo==undefined||
        userCourseInput?.noOfChapter==undefined 
        ))
        {
            return true
        }
    return false
}

const GenerateCourseLayout= async()=>{
    setLoading(true)
    //const BASIC_PROMPT =' '
    const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category +
    ', Topic: ' + userCourseInput?.topic +
    ', Level: ' + userCourseInput?.level +
    ', Duration: ' + userCourseInput?.duration +
    ', No Of Chapters: ' + userCourseInput?.noOfChapter +
    ', in JSON format';

    const FINAL_PROMPT = process.env.NEXT_PUBLIC_BASIC_PROMPT+USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT)

    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    console.log(JSON.parse(result.response?.text()))
    setLoading(false)
    

    
    

}


  return (
    <div>
        {/* Stepper */}
        <div className='flex flex-col items-center mt-10'>
            <h2 className='text-2xl text-primary font-medium'>Create Course</h2>
            <div className='flex mt-10'>
                {StepperOptions.map((item,index)=>(
                    <div className='flex items-center'>
                        <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                            <div className={`bg-gray-200 p-3 rounded-full text-white
                        ${activeIndex>=index&&'bg-purple-500'}`}> 
                            {item.icon}
                            </div>
                            <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
                        </div>
                     {index!=StepperOptions?.length-1&&<div className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 
                     ${activeIndex-1>=index&&'bg-purple-500'}`}>
                        </div>}
                        
                    </div>
                ))}
                
            </div>
        </div>

    <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {/* Content */}
        {activeIndex==0?<SelectCategory/>
        :activeIndex==1?<TopicDescription/>
        :               <SelectOption/>}

        {/* Buttons */}
        <div className='flex justify-between mt-10'>
            <Button disabled={activeIndex==0} variant='outline' onClick={()=>setActiveIndex(activeIndex-1)}>Previous</Button>
            {activeIndex<2&&<Button  disabled={checkStatus()} onClick={()=>setActiveIndex(activeIndex+1)}>Next</Button>}
            {activeIndex==2&&<Button disabled={checkStatus() }  onClick={()=>GenerateCourseLayout()}>Generate Course Layout</Button>}

            </div>

</div>
    <LoadingDialog loading={loading}/>
    </div>
  )
}

export default CreateCourse