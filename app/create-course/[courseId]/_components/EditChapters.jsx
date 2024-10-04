import React,{useEffect, useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { FaRegEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
function EditChapters({
  course,
  index,
  refreshData
}) {


  const Chapters = course?.courseOutput?.chapters
  const [name, setName] = useState()
  const [about, setAbout] = useState()

  useEffect(() => {
    setName(Chapters[index].chapterName)
    setAbout(Chapters[index].about)
  }, [course])

  const onUpdateHandler = async () => {
    Chapters[index].chapterName = name
    Chapters[index].about = about

    course.courseOutput.chapters = Chapters

    const result = await db.update(CourseList).set({
      courseOutput: course?.courseOutput
    }).where(eq(CourseList?.id, course.id))
    .returning({id:CourseList.id});

    refreshData(true)
    //console.log(result)
    

    
  
  }

  return (
    <div><Dialog>
    <DialogTrigger><FaRegEdit /> </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Course Chapter</DialogTitle>
        <DialogDescription>
        
        <div className='mt-3'>
          <label> Chapter Title</label>
          <Input defaultValue={Chapters[index].chapterName} 
          onChange={(event)=>setName(event?.target.value)}/>
        </div>
        <div className='mt-3'>
        <label> Chapter Description</label>
          <Textarea className="h-40" defaultValue={Chapters[index].about}  
          onChange={(event)=>setAbout(event?.target.value)}/>
        </div>


        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose>
          <Button onClick={onUpdateHandler}>Save</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </div>
  )
}

export default EditChapters