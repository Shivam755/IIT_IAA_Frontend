'use client';
import React from 'react'
import { useInstances } from '@/app/context/InstanceContext';

const InstanceTable = () => {
  let { Instances } = useInstances();
  return (
    <div className="p-4">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Course Title</th>
            <th className="border px-4 py-2">Year-Sem</th>
            <th className="border px-4 py-2">Course Code</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {Instances.map((instance) => (
            <tr key={instance.id} className="text-center">
              <td className="border px-4 py-2">{instance.course_title}</td>
              <td className="border px-4 py-2">{instance.course_code}</td>
              <td className="border px-4 py-2">{instance.year}-{instance.semester}</td>
              <td className="border px-4 py-2">{instance.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InstanceTable