'use client';
import React from 'react';
import { deleteCourse } from '@/app/services/CourseService';
import { useCourses } from '@/app/context/CourseContext';

const DeleteCourseButton = ({id}:{id:number}) => {
    const { refetchCourses } = useCourses();
    const DeleteCourse = async () =>{
        await deleteCourse(id);
        // refreshing list
        refetchCourses();
    }
  return (
    <button onClick={DeleteCourse}>{id}</button>
  )
}

export default DeleteCourseButton