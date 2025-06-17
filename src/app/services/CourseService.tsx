import CourseCreateDTO from "@/app/models/CourseCreateDTO";
import CourseViewDTO from "@/app/models/CourseViewDTO";
import Response from "@/app/models/Response";

export const CreateCourse = async (
  course: CourseCreateDTO
): Promise<Response<CourseViewDTO | undefined>> => {
  let baseurl = getBaseUrl();
  const result = await fetch(baseurl + "/api/courses/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  let data: CourseViewDTO = await result.json();
  let response: Response<CourseViewDTO | undefined> = {
    success: true,
    message: "",
    data: undefined,
  };
  if (result.ok) {
    response.success = true;
    response.data = data;
  } else {
    response.success = false;
    response.message = `Create call failed with status: ${result.statusText}`;
  }

  return response;
};

export const fetchAllCourses = async () => {
  let baseurl = getBaseUrl();
  let res = await fetch(`${baseurl}/api/courses/`, {
    method: "GET",
  });

  if (res.ok) {
    let data = await res.json();
    return data;
  } else {
    console.log("There was some problem while fetching courses");
  }
};

export const deleteCourse = async (id: number): Promise<Response<void>> => {
  let baseurl = getBaseUrl();
  let response: Response<void> = {
    success: true,
    message: "",
    data: undefined,
  };

  // making the api call
  let res = await fetch(`${baseurl}/api/courses/${id}/`, {
    method: "DELETE",
  });

  // setting response
  if (res.ok) {
    response.success = true;
    response.message = `Course deleted with Id: ${id}`;
  } else {
    response.success = false;
    response.message = "There was some issue while deleting course!";
  }
  return response;
};

export const getBaseUrl = () => {
  let baseurl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseurl) {
    console.log(
      "Base api url is not set! Please set an environment variable with name NEXT_PUBLIC_API_URL"
    );
  }
  return baseurl;
};
