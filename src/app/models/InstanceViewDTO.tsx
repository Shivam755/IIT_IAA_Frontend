export default interface InstanceViewDTO {
  id: number;
  course_title: string;
  course_code: string;
  course_id: string;
  year: string;
  semester: number;
  course_description: string;
  prerequisite_course_names: string;
  dependent_course_names: string;
}
