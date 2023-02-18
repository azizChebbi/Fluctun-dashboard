import { FullTeacherData } from "@helpers/generateTables";
import { Teacher } from "@reducers/teachers";
import { api } from "api";

type TeachersResponse = {
  data: FullTeacherData[];
};

export const getTeachers = (): Promise<TeachersResponse> => {
  return api.get("/admin/teachers");
};

export const deleteTeacher = (id: string): Promise<any> => {
  return api.delete(`/admin/teacher?id=${id}`);
};

export const updateTeacher = (
  data: Omit<Teacher, "isValid" | "id"> & { id: string }
) => {
  return api.put("/admin/teacher", data);
};

export const registerTeachers = (teachers: Teacher[]): Promise<any> => {
  return api.post("/auth/register-teachers", teachers);
};
