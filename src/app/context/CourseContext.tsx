"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchAllCourses } from "@/app/services/CourseService";
import CourseViewDTO from "@/app/models/CourseViewDTO";

const CoursesContext = createContext<
  | {
      courses: CourseViewDTO[];
      setCourses: React.Dispatch<React.SetStateAction<CourseViewDTO[]>>;
      refetchCourses: () => void;
    }
  | undefined
>(undefined);

interface CouresesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CouresesProviderProps) => {
  const [courses, setCourses] = useState<CourseViewDTO[]>([]);
  const refetchCourses = async () => {
    let data = await fetchAllCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchAllCourses().then((data) => {
      setCourses(data);
    });
  }, []);
  return (
    <CoursesContext.Provider value={{ courses, setCourses, refetchCourses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a Coursesprovider");
  }
  return context;
};
