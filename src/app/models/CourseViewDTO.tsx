export default interface CourseViewDTO {
  id: number;
  title: string;
  course_code: string;
  description: string;
  dependent_courses: [];
  prerequisites: [];
  created_date: Date;
  modified_date: Date;
}
