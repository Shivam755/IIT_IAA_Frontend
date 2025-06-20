export default interface CourseCreateDTO {
  title: string;
  course_code: string;
  description: string;
  prerequisites: number[];
  dependent_courses: [];
}
