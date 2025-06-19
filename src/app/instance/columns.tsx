"use client";
import { ColumnDef } from "@tanstack/react-table";
import InstanceViewDTO from "@/app/models/InstanceViewDTO";
import DeleteInstanceButton from "../components/DeleteInstanceButton";
import CourseViewDTO from "@/app/models/CourseViewDTO";
import DeleteCourseButton from "@/app/components/DeleteCourseButton";

export const InstanceColumns: ColumnDef<InstanceViewDTO>[] = [
  {
    accessorKey: "course_title",
    header: "Course Title",
    cell: ({ row }) => (
      <div
        title={row.getValue("course_title")} // optional tooltip on hover
        className="max-w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {row.getValue("course_title")}
      </div>
    ),
  },
  {
    accessorKey: "course_code",
    header: "Code",
    cell: ({ row }) => (
      <div
        title={row.getValue("course_code")} // optional tooltip on hover
        className="max-w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {row.getValue("course_code")}
      </div>
    ),
  },
  {
    id: "year-sem",
    header: "Year-Sem",
    cell: ({ row }) => {
      let instance = row.original;
      return `${instance.year}-${instance.semester}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      let instance = row.original;
      return (
        <DeleteInstanceButton
          course_id={Number(instance.course_id)}
          semester={instance.semester}
          year={instance.year}
        />
      );
    },
  },
];

export const CourseColumns: ColumnDef<CourseViewDTO>[] = [
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => (
      <div
        title={row.getValue("title")} // optional tooltip on hover
        className="max-w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "course_code",
    header: "Code",
    cell: ({ row }) => (
      <div
        title={row.getValue("course_code")} // optional tooltip on hover
        className="max-w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {row.getValue("course_code")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      let course = row.original;
      return <DeleteCourseButton id={course.id} />;
    },
  },
];
