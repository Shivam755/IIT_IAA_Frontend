"use client";
import React from "react";
import { useCourses } from "@/app/context/CourseContext";
import { CourseColumns } from "@/app/instance/columns";
import DataTable from "@/app/instance/data-table";

const ViewAllCourse = () => {
  let { courses } = useCourses();
  return (
    <div className="container py-10">
      <DataTable columns={CourseColumns} data={courses} />
    </div>
  );
};

export default ViewAllCourse;
