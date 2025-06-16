'use client';
import React from 'react';
import { toast } from 'sonner';
import { deleteCourse } from '@/app/services/CourseService';
import { useCourses } from '@/app/context/CourseContext';
import Response from "@/app/models/Response";


const DeleteCourseButton = ({id}:{id:number}) => {
    const { refetchCourses } = useCourses();
    const DeleteCourse = async () =>{
        let response:Promise<Response<undefined>> = deleteCourse(id);
        toast.promise(response,{
          loading: "Deleting course...",
          success: (data: Response<undefined>) => {
            if (data.success){
              // refreshing 
              refetchCourses();
              return data.message;
            }else{
              return data.message;
            }
          }
        });
    }
  return (
    <button onClick={DeleteCourse}>{id}</button>
  )
}

export default DeleteCourseButton