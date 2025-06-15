'use client';
import React from 'react';
import { useCourses } from '@/app/context/CourseContext';
import DeleteCourseButton from './DeleteCourseButton';

const ViewAllCourse = () => {
    let { courses } = useCourses();
  return (
    <div className="p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Course Title</th>
            <th className="border px-4 py-2">Course Code</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="text-center">
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.course_code}</td>
              <td className="border px-4 py-2"><DeleteCourseButton id={course.id} ></DeleteCourseButton></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewAllCourse