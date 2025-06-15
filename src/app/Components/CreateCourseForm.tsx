'use client';
import React, { useState } from 'react'
import CourseCreateDTO from '../models/CourseCreateDTO';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState<CourseCreateDTO>({
    title: '',
    course_code: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange  = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  }

  const handleSubmit = async (e:React.FormEvent) =>{
     e.preventDefault();
    setLoading(true);
    setMessage('');
    let baseurl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseurl){
      console.log("Base api url is not set! Pleaseset an environment variable with name NEXT_PUBLIC_API_URL")
    }
    const res = await fetch(baseurl+'/api/courses/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage('User created!');
    } else {
      setMessage(`Error: ${data.error || 'Something went wrong'}`);
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
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded' onClick={()=>console.log('hello')}>Add Course</button>


    </form>
  )
}

export default CreateCourseForm