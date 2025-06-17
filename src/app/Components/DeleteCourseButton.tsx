"use client";
import React from "react";
import { toast } from "sonner";
import { deleteCourse } from "@/app/services/CourseService";
import { useCourses } from "@/app/context/CourseContext";
import Response from "@/app/models/Response";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteCourseButton = ({ id }: { id: number }) => {
  const { refetchCourses } = useCourses();
  const DeleteCourse = async () => {
    let response: Promise<Response<void>> = deleteCourse(id);
    toast.promise(response, {
      loading: "Deleting course...",
      success: (data: Response<void>) => {
        if (data.success) {
          // refreshing
          refetchCourses();
          return data.message;
        } else {
          return data.message;
        }
      },
    });
  };
  return (
    <Button onClick={DeleteCourse}>
      <Trash2 />
    </Button>
  );
};

export default DeleteCourseButton;
