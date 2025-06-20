import React, { useState } from "react";
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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useCourses } from "@/app/context/CourseContext";
import CourseViewDTO from "@/app/models/CourseViewDTO";

interface CourseSelectProps {
  onChange: (selected: CourseViewDTO | CourseViewDTO[]) => void;
  multi?: boolean;
  label: string;
}

const CoursesDropdown = ({ multi = false, onChange, label }: CourseSelectProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selected, setSelected] = useState<CourseViewDTO[]>([]);
  const { courses, refetchCourses } = useCourses();
  const refreshCourses = async (e: React.FormEvent) => {
    e.preventDefault();
    refetchCourses();
  };

  const isSelected = (course: CourseViewDTO) =>
    selected.some((s) => s.id === course.id);

  const toggleSelect = (course: CourseViewDTO) => {
    if (multi) {
      const newSelected = isSelected(course)
        ? selected.filter((c) => c.id !== course.id)
        : [...selected, course];

      setSelected(newSelected);
      onChange(newSelected);
    } else {
      const newSelected = isSelected(course) ? [] : [course];
      setSelected(newSelected);
      onChange(newSelected[0] ?? null);
      setPopoverOpen(false);
    }
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">{label}</Label>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <div className="w-full flex">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={popoverOpen}
              className="flex-4 justify-between"
            >
              {selected.length > 0
                ? selected.map((c) => c.title).join(", ")
                : "Select course(s  )..."}
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
                    onSelect={() => toggleSelect(course)}
                  >
                    <div
                      title={course.title}
                      className="truncate max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {course.title}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        isSelected(course) ? "opacity-100" : "opacity-0"
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
  );
};

export default CoursesDropdown;
