"use client";

import React, { useState } from "react";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import { toast } from "sonner";
import { useInstances } from "../context/InstanceContext";
import { Button } from "@/components/ui/button";
import InstanceInputFields from "./InstanceInputFields";

const GetInstanceForm = () => {
  const [formData, setFormData] = useState<InstanceCreateDTO>({
    course_id: 0,
    year: "",
    semester: 0,
  });
  const { refreshInstances } = useInstances();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const yearRegex = /^(19|20)\d{2}$/;
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
    <div className="flex flex-col gap-4 max-w-5xl min-w-xl p-4 border rounded-md">
      <InstanceInputFields formData={formData} setFormData={setFormData} dropDownNeeded={false} />
      <div className="pt-5">
        <Button onClick={handleSubmit} type="submit">
          Fetch Instances
        </Button>
      </div>
    </div>
  );
};

export default GetInstanceForm;
