"use client";

import React, { useState } from "react";
import { useCourses } from "@/app/context/CourseContext";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import { useInstances } from "../context/InstanceContext";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const GetInstanceForm = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [formData, setFormData] = useState<InstanceCreateDTO>({
    course_id: 0,
    year: "",
    semester: 0,
  });

  const { courses, refetchCourses } = useCourses();
  const { refreshInstances } = useInstances();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // making the api call
    let res = await refreshInstances(formData);
    console.log(`res: ${res}`);
    if (res === undefined) {
      // refreshing
      console.log("fetch successful!");
    } else {
      console.log(`Error: ${res || "Something went wrong"}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-5xl p-4 border rounded-md"
    >
      {/* Row 1: Course + Refresh */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col flex-grow">
          <Label className="mb-1">Course:</Label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={popoverOpen}
                className="w-full justify-between"
              >
                {formData.course_id != 0
                  ? courses.find((course) => course.id === formData.course_id)
                      ?.title
                  : "Select course..."}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Command>
                <CommandInput placeholder="Search Courses..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No courses found.</CommandEmpty>
                  <CommandItem
                    value="0"
                    onSelect={() => {
                      formData.course_id = 0;
                      setPopoverOpen(false);
                    }}
                  >
                    None
                    <Check
                      className={cn(
                        "ml-auto",
                        formData.course_id === 0 ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
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
        <Button type="button" className="h-10" onClick={refreshCourses}>
          Refresh
        </Button>
      </div>

      {/* Row 2: Year + Semester + Fetch */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <Label htmlFor="year" className="mb-1">
            Year:
          </Label>
          <Input
            className="w-40"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="semester" className="mb-1">
            Semester:
          </Label>
          <Input
            className="w-40"
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </div>

        <div className="pt-5">
          <Button type="submit">Fetch Instances</Button>
        </div>
      </div>
    </form>
  );
};

export default GetInstanceForm;
