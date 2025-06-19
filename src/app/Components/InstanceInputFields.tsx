"use client";
import React, {useState} from 'react';
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { useCourses } from "@/app/context/CourseContext";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";

const InstanceInputFields = ({formData, setFormData} : {formData: InstanceCreateDTO, setFormData: React.Dispatch<React.SetStateAction<InstanceCreateDTO>>}) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { courses, refetchCourses } = useCourses();
      const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const refreshCourses = async (e: React.FormEvent) => {
    e.preventDefault();
    refetchCourses();
  };
  return (
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
                  <Button className="flex-1 flex-end" onClick={refreshCourses}>
                    Refresh
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput
                    placeholder="Search Courses..."
                    className="h-9 truncate max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis"
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
                          <div title={course.title} className="truncate max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                            {course.title}
                          </div>
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
  )
}

export default InstanceInputFields