import CourseCreateDTO from '@/app/models/CourseCreateDTO';
import { useCourses } from '@/app/context/CourseContext';

export const CreateCourse = async (course:CourseCreateDTO) =>{
    let baseurl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseurl){
      console.log("Base api url is not set! Pleaseset an environment variable with name NEXT_PUBLIC_API_URL")
    }
    const res = await fetch(baseurl+'/api/courses/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    let data = await res.json();
    if (res.ok){
        return undefined;
    }
    else{
        return data;
    }
}

export const fetchAllCourses = async () => {
    let baseurl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseurl){
        console.log("Base api url is not set! Pleaseset an environment variable with name NEXT_PUBLIC_API_URL")
    }
    let res = await fetch(`${baseurl}/api/courses/`,{
        method: 'GET'
    })

    if (res.ok){
        let data = await res.json();
        return data;
    }else{
        console.log('There was some problem while fetching users')
    }
}

export const deleteCourse = async (id:number) => {
    let baseurl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseurl){
        console.log("Base api url is not set! Pleaseset an environment variable with name NEXT_PUBLIC_API_URL")
    }
    let res = await fetch(`${baseurl}/api/courses/${id}/`,{
        method: 'DELETE'
    })

    if (res.ok){
        console.log(`Course deleted with Id: ${id}`);
        await fetchAllCourses();
    }else{
        console.log("There was some issue while deleting course!");
    }
}