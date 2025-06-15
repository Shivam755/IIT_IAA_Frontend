import { getBaseUrl } from "@/app/services/CourseService";
import InstanceCreateDTO from "@/app/models/InstanceCreateDTO";
import InstanceRequest from "@/app/models/InstanceRequest";

export const CreateInstance = async (course: InstanceCreateDTO) => {
  let baseurl = getBaseUrl();

  // making api call
  const res = await fetch(baseurl + "/api/instances/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  let data = await res.json();
  // returning data based on the response code
  if (res.ok) {
    return undefined;
  } else {
    return data;
  }
};

export const fetchAllInstances = async ({ year, semester }: InstanceRequest) => {
  let baseurl = getBaseUrl();

  // making the api call
  let res = await fetch(`${baseurl}/api/instances/${year}/${semester}/`, {
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

export const deleteInstance = async({ year, semester, course_id } : InstanceRequest) => {
    let baseurl = getBaseUrl();

    // making the api call
    let res = await fetch(`${baseurl}/api/instances/${year}/${semester}/${course_id}/`, {
        method: "DELETE",
    });

    // logging data based on the response code
    if (res.ok) {
        console.log(`Instance deleted successfully!`);
    } else {
        console.log("There was some issue while deleting course!");
    }
}