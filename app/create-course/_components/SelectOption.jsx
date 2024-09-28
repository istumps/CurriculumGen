
import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext'

function SelectOption() {

    const {userCourseInput, setUserCourseInput}=useContext(UserInputContext)

    const handleInputChange=(fieldName, value)=>{
      setUserCourseInput(prev=>({
        ...prev,
        [fieldName]:value
      }))
    }

    return (
        <div className='px-10 md:px-20 lg:px-24'>
            <div className='grid grid-cols-2 gap-10'>
                <div>
                    <label className='text-sm'>Difficulty Level</label>
                    <Select onValueChange={(value)=>handleInputChange('level', value)}
                    defaultValue={userCourseInput?.level}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>Course Duration</label>
                    <Select onValueChange={(value)=>handleInputChange('duration', value)}
                    defaultValue={userCourseInput?.duration}
                    >

                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1 Hour">1 Hour</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="3+ Hours">3+ Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>Add Video</label>
                    <Select onValueChange={(value)=>handleInputChange('displayVideo', value)}
                    defaultValue={userCourseInput?.displayVideo}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>No of Chapter </label>
                    <Input type="number" className=''
                    onChange={(event)=>handleInputChange('noOfChapter', event.target.value)} 
                    defaultValue={userCourseInput?.noOfChapter}
                    />
                </div>


            </div>
        </div>
    )
}

export default SelectOption