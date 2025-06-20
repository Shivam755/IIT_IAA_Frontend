"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import CoursesDropdown from "./CoursesDropdown";
import CourseViewDTO from "../models/CourseViewDTO";

const InstanceInputFields = ({
  formData,
  setFormData,
}: {
  formData: InstanceCreateDTO;
  setFormData: React.Dispatch<React.SetStateAction<InstanceCreateDTO>>;
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const CourseSelectChange = (course:CourseViewDTO | CourseViewDTO[]) =>{
    if (!Array.isArray(course)){
      setFormData({
        ...formData,
        course_id: course.id
      });
    }
  }

  return (
    <div className="grid gap-4">
      <CoursesDropdown multi={false} onChange={CourseSelectChange} label="Course"/>
      <div className="grid gap-3">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="semester">Semester</Label>
        <Input
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default InstanceInputFields;
