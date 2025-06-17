import { getBaseUrl } from "@/app/services/CourseService";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import Response from "@/app/models/Response";
import InstanceViewDTO from "@/app/models/InstanceViewDTO";

export const CreateInstance = async (
  course: InstanceCreateDTO
): Promise<Response<InstanceViewDTO | undefined>> => {
  let baseurl = getBaseUrl();
  let response: Response<InstanceViewDTO | undefined> = {
    success: true,
    message: "",
    data: undefined,
  };
  // making api call
  const res = await fetch(baseurl + "/api/instances/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  let data = await res.json();
  // returning data based on the response code
  if (res.ok) {
    response.success = true;
    response.data = data;
  } else {
    response.success = false;
    response.message = "There was some issue while saving instance";
    console.log(`Create call failed with status: ${res.statusText}`);
  }
  return response;
};

export const fetchAllInstances = async ({
  year,
  semester,
  course_id,
}: InstanceCreateDTO) => {
  let baseurl = getBaseUrl();

  let fetchUrl = `${baseurl}/api/instances/${year}/${semester}/`;
  if (course_id) {
    fetchUrl += `${course_id}/`;
  }
  // making the api call
  let res = await fetch(fetchUrl, {
    method: "GET",
  });

  // returning data based on the response code
  if (res.ok) {
    let data = await res.json();
    return data;
  } else {
    console.log("There was some problem while fetching instances");
  }
};

export const deleteInstance = async ({
  year,
  semester,
  course_id,
}: InstanceCreateDTO): Promise<Response<void>> => {
  let baseurl = getBaseUrl();
  let response: Response<void> = {
    success: true,
    message: "",
    data: undefined,
  };

  // making the api call
  let res = await fetch(
    `${baseurl}/api/instances/${year}/${semester}/${course_id}/`,
    {
      method: "DELETE",
    }
  );

  // logging data based on the response code
  if (res.ok) {
    response.success = true;
    response.message = `Instance deleted successfully!`;
  } else {
    response.success = false;
    response.message = "There was some issue while deleting Instance!";
    console.log(`Delete call failed with status: ${res.statusText}`);
  }
  return response;
};
