'use client';
import React, { useState } from 'react'
import CourseCreateDTO from '@/app/models/CourseCreateDTO';
import { CreateCourse } from '@/app/services/CourseService';
import { useCourses } from '@/app/context/CourseContext';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState<CourseCreateDTO>({
    title: '',
    course_code: '',
    description: ''
  });

  const { refetchCourses } = useCourses();

  const handleChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }

  const handleSubmit = async (e:React.FormEvent) =>{
     e.preventDefault();
    // making the api call
    let res = await CreateCourse(formData);
    console.log(`res: ${res}`);
    if (res === undefined) {
      // clearing fields
      setFormData({
        title: '',
        course_code: '',
        description: ''
      });
      // refreshing 
      refetchCourses();
    } else {
      console.log(`Error: ${res.error || 'Something went wrong'}`);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
         <label className="Label">Course Name: </label>
        <input className='Text' type="Text" name="title" value={formData.title} onChange={handleChange} required/>
        <br/>

        <label className="Label">Course Code: </label>
        <input className='Text' type="Text" name="course_code" value={formData.course_code} onChange={handleChange} required/>
        <br/>

        <label className="Label">Description: </label>
        <input className='Text' type="Text" name="description" value={formData.description} onChange={handleChange} required/>
        <br/>
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Add Course</button>


    </form>
  )
}

export default CreateCourseForm