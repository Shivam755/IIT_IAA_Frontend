import React, { useState } from 'react';
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
import InstanceViewDTO from '@/app/models/InstanceViewDTO';
import { Eye } from "lucide-react";

const ViewInstanceDetail = (data: InstanceViewDTO) => {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex">
        <Button className="flex-end" onClick={() => setOpen(true)}>
          <Eye />
        </Button>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data.course_title}</DialogTitle>
          <DialogDescription>
            {data.course_description}
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="grid gap-4">
            <div title={data.course_code} className="grid gap-3 max-w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              Course Code : {data.course_code}
            </div>
            <div title={data.year} className="grid gap-3 max-w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              Delivery year : {data.year}
            </div>
            <div title={data.semester.toString()} className="grid gap-3 max-w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              Delivery semester : {data.semester}
            </div>
            <div title={data.prerequisite_course_names === "" ? "-" : data.prerequisite_course_names} className="max-w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              Pre-requisite courses : {data.prerequisite_course_names === "" ? "-" : data.prerequisite_course_names}
            </div>
            <div title={data.dependent_course_names === "" ? "-" : data.dependent_course_names} className="max-w-[300px] truncate overflow-hidden text-ellipsis whitespace-nowrap">
              Dependent courses : {data.dependent_course_names === "" ? "-" : data.dependent_course_names}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewInstanceDetail