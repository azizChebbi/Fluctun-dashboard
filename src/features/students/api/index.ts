import { FullStudentData } from "@helpers/generateTables";
import { Student } from "@reducers/students";
import { api } from "api";

type StudentsResponse = {
  data: FullStudentData[];
};

export const getStudents = (): Promise<StudentsResponse> => {
  return api.get("/admin/students");
};

export const deleteStudent = (id: string): Promise<any> => {
  return api.delete(`/admin/student?id=${id}`);
};

export const updateStudent = (
  data: Omit<Student, "isValid" | "id"> & { id: string }
) => {
  return api.put("/admin/student", data);
};

export const registerStudents = (students: Student[]): Promise<any> => {
  return api.post("/auth/register-students", students);
};
