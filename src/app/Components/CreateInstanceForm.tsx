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
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import { CreateInstance } from "@/app/services/InstanceService";
import InstanceViewDTO from "@/app/models/InstanceViewDTO";
import Response from "@/app/models/Response";
import InstanceInputFields from "@/app/components/InstanceInputFields";

const CreateInstanceForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<InstanceCreateDTO>({
    course_id: 0,
    year: "",
    semester: 0,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const yearRegex = /^(19|20)\d{2}$/;
    if (formData.course_id === undefined || formData.course_id === 0) {
      return toast.error("Please select a course");
    }
    if (formData.semester === undefined || formData.semester === 0) {
      return toast.error("Please select a semester greater than 0");
    }
    if (
      formData.year === undefined ||
      formData.year === "" ||
      !yearRegex.test(formData.year)
    ) {
      return toast.error("Please enter a year between 1900 and 2099");
    }
    // making the api call
    let result = CreateInstance(formData);
    toast.promise(result, {
      loading: "Saving Instance detail...",
      error: "There was some issue while saving the instance!",
      success: (data: Response<InstanceViewDTO | undefined>) => {
        if (data.success) {
          // clearing fields
          setFormData({
            course_id: 0,
            year: "",
            semester: 0,
          });
          setDialogOpen(false);
          return "Course Instance saved successfully!";
        } else {
          return data.message;
        }
      },
    });
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex items-center gap-4">
        <Button onClick={() => setDialogOpen(true)}>Add Course Instance</Button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Course Instance</DialogTitle>
          <DialogDescription>
            Add details of the course Instance you want to create. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <InstanceInputFields formData={formData} setFormData={setFormData} dropDownNeeded={true}/>
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

export default CreateInstanceForm;
