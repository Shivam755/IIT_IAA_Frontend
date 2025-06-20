"use client";
import { ColumnDef } from "@tanstack/react-table";
import InstanceViewDTO from "@/app/models/InstanceViewDTO";
import DeleteInstanceButton from "../components/DeleteInstanceButton";
import CourseViewDTO from "@/app/models/CourseViewDTO";
import DeleteCourseButton from "@/app/components/DeleteCourseButton";
import { useCourses } from "@/app/context/CourseContext";
import ViewInstanceDetail from "../components/ViewInstanceDetail";

let courseList: CourseViewDTO[] = [];
const settingCourseTitles = () => {
  const { courses } = useCourses();
  courseList = courses;
};

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
        <div className="flex flex-row">
          <ViewInstanceDetail
            course_id={instance.course_id}
            course_code={instance.course_code}
            course_title={instance.course_title}
            dependent_course_names={instance.dependent_course_names}
            prerequisite_course_names={instance.prerequisite_course_names}
            id={instance.id}
            year={instance.year}
            semester={instance.semester}
            course_description={instance.course_description}
          />
          <DeleteInstanceButton
            course_id={Number(instance.course_id)}
            semester={instance.semester}
            year={instance.year}
          />
        </div>
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
    accessorKey: "prerequisites",
    header: "Pre-Requisite Courses",
    cell: ({ row }) => {
      let course = row.original;
      settingCourseTitles();
      let selectedCourses = course.prerequisites
        .map((id) => {
          return courseList.find((x) => x.id === id)?.title;
        })
        .join(",");
      return (
        <div
          title={selectedCourses} // optional tooltip on hover
          className="max-w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {selectedCourses === "" ? "-" : selectedCourses}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      let course = row.original;
      let disabled = course.dependent_courses.length !== 0;
      return <DeleteCourseButton disabled={disabled} id={course.id} />;
    },
  },
];
