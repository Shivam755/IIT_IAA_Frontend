"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CourseCreateDTO from "@/app/models/CourseCreateDTO";
import { CreateCourse } from "@/app/services/CourseService";
import { useCourses } from "@/app/context/CourseContext";
import CourseViewDTO from "@/app/models/CourseViewDTO";
import Response from "@/app/models/Response";

const CreateCourseForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CourseCreateDTO>({
    title: "",
    course_code: "",
    description: "",
  });

  const { refetchCourses } = useCourses();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title === undefined || formData.title === "") {
      return toast.error("Course Name cannot be empty");
    }
    if (formData.course_code === undefined || formData.course_code === "") {
      return toast.error("Course Code cannot be empty");
    }
    if (formData.description === undefined || formData.description === "") {
      return toast.error("Description cannot be empty");
    }
    // making the api call
    let res = CreateCourse(formData);
    toast.promise(res, {
      loading: "Saving Details...",
      error: "Something went wrong while saving course Details!",
      success: (data: Response<CourseViewDTO | undefined>) => {
        if (data.success) {
          // clearing fields
          setFormData({
            title: "",
            course_code: "",
            description: "",
          });
          // refreshing
          refetchCourses();
          setOpen(false);
          return "Course saved successfully!";
        } else {
          return data.message;
        }
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-end">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Add Course
        </Button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>
            Add details of the course you want to create. Click save when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Course Name</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="course_code">Course Code</Label>
              <Input
                id="course_code"
                name="course_code"
                value={formData.course_code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseForm;
