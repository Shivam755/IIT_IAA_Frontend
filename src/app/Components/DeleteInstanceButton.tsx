import React from "react";
import { toast } from "sonner";
import { useInstances } from "@/app/context/InstanceContext";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import { deleteInstance } from "@/app/services/InstanceService";
import Response from "@/app/models/Response";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DeleteInstanceButton = ({
  course_id,
  year,
  semester,
}: InstanceCreateDTO) => {
  const { refreshInstances } = useInstances();
  const DeleteInstance = async () => {
    let response: Promise<Response<void>> = deleteInstance({
      year,
      semester,
      course_id,
    });
    toast.promise(response, {
      loading: "Deleting course...",
      success: (data: Response<void>) => {
        if (data.success) {
          // refreshing
          refreshInstances({ year, semester, course_id });
          return data.message;
        } else {
          return data.message;
        }
      },
    });
  };
  return (
    <Button onClick={DeleteInstance}>
      <Trash2 />
    </Button>
  );
};

export default DeleteInstanceButton;
