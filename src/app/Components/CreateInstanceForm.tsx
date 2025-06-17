"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import { useCourses } from "@/app/context/CourseContext";
import { CreateInstance } from "@/app/services/InstanceService";
import InstanceViewDTO from "@/app/models/InstanceViewDTO";
import Response from "@/app/models/Response";

const CreateInstanceForm = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [formData, setFormData] = useState<InstanceCreateDTO>({
    course_id: 0,
    year: "",
    semester: 0,
  });

  const { courses, refetchCourses } = useCourses();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const refreshCourses = async (e:React.FormEvent) =>{
    e.preventDefault();
    refetchCourses();
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const yearRegex = /^(19|20)\d{2}$/;
    if (formData.course_id === undefined || formData.course_id === 0){
      return toast.error("Please select a course");
    }
    if (formData.semester === undefined || formData.semester === 0){
      return toast.error("Please select a semester greater than 0");
    }
    if (formData.year === undefined || formData.year === "" || !yearRegex.test(formData.year)){
      return toast.error("Please enter a year between 1900 and 2099");
    }
    // making the api call
    let result = CreateInstance(formData);
    toast.promise(result,{
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
      }
    })
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="w-full flex flex-end">
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Add Course
        </Button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Course Instance</DialogTitle>
          <DialogDescription>
            Add details of the course Instance you want to create. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Course</Label>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="w-full flex">
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    className="flex-4 justify-between"
                  >
                    {formData.course_id != 0
                      ? courses.find(
                          (course) => course.id === formData.course_id
                        )?.title
                      : "Select course..."}
                  </Button>
                  <Button className="flex-1 flex-end" onClick={refreshCourses}>Refresh</Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput
                      placeholder="Search Courses..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No courses found.</CommandEmpty>
                      <CommandGroup>
                        {courses.map((course) => (
                          <CommandItem
                            key={course.id}
                            value={course.id.toString()}
                            onSelect={(currentValue) => {
                              formData.course_id =
                                Number(currentValue) === formData.course_id
                                  ? 0
                                  : Number(currentValue);
                              setPopoverOpen(false);
                            }}
                          >
                            {course.title}
                            <Check
                              className={cn(
                                "ml-auto",
                                formData.course_id === course.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
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
