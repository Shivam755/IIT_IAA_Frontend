import CourseCreateDTO from "@/app/models/CourseCreateDTO";

export const CreateCourse = async (course: CourseCreateDTO) => {
  let baseurl = getBaseUrl();
  const res = await fetch(baseurl + "/api/courses/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(course),
  });
  let data = await res.json();
  if (res.ok) {
    return undefined;
  } else {
    return data;
  }
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

export const deleteCourse = async (id: number) => {
  let baseurl = getBaseUrl();
  let res = await fetch(`${baseurl}/api/courses/${id}/`, {
    method: "DELETE",
  });

  if (res.ok) {
    console.log(`Course deleted with Id: ${id}`);
  } else {
    console.log("There was some issue while deleting course!");
  }
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
