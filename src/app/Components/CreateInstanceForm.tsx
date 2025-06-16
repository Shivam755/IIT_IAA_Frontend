'use client';
import React, {useState} from 'react'
import InstanceCreateDTO from '@/app/models/InstanceCreateDTO';
import { useCourses } from '@/app/context/CourseContext';
import { CreateInstance } from '@/app/services/InstanceService';

const CreateInstanceForm = () => {
  const [formData, setFormData] = useState<InstanceCreateDTO>({
      course_id: 0,
      year: '',
      semester: 0
    });
  
    const { courses, refetchCourses } = useCourses();
  
    const handleChange  = (e:React.ChangeEvent<(HTMLInputElement | HTMLSelectElement)>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    }
  
    const handleSubmit = async (e:React.FormEvent) =>{
       e.preventDefault();
      // making the api call
      let res = await CreateInstance(formData);
      console.log(`res: ${res}`);
      if (res === undefined) {
        // clearing fields
        setFormData({
          course_id: 0,
          year: '',
          semester: 0
        });
        // refreshing 
      } else {
        console.log(`Error: ${res.error || 'Something went wrong'}`);
      }
    }
    return (
      <form className="space-y-4">
           <label className="Label">Course: </label>
           <select name="course_id" id="course" value={formData.course_id} onChange={handleChange}>
            {courses.map(course => (
                <option value={course.id}>{course.title}</option>
            ))}
           </select>
           <button onClick={refetchCourses} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Refresh</button>
          <br/>
  
          <label className="Label">Year: </label>
          <input className='Text' type="Text" name="year" value={formData.year} onChange={handleChange} required/>
          <br/>
  
          <label className="Label">Semester: </label>
          <input className='Text' type="Text" name="semester" value={formData.semester} onChange={handleChange} required/>
          <br/>
          <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Add Instance</button>

      </form>
    )
}

export default CreateInstanceForm