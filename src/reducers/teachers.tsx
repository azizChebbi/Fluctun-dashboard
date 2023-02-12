import { updateTeachers } from "@helpers/updateTeachersFields";

export type TeacherField =
  | "isValid"
  | "id"
  | "firstName"
  | "lastName"
  | "cin"
  | "subject"
  | "email"
  | "number"
  | "instituteId";

export type Teacher = {
  isValid: boolean;
  id: string;
  firstName: string;
  lastName: string;
  cin: string;
  subject: string;
  email: string;
  number: number;
  instituteId: string;
};

export type AddTeachersState = {
  teachers: Teacher[];
};

export type ActionsTypes =
  | "UPDATE_TEACHER"
  | "DELETE_TEACHER"
  | "DELETE_TEACHERS";

export type Action = {
  type: ActionsTypes;
  payload: Teacher;
};

export const addTeachersInitialState: AddTeachersState = {
  teachers: [],
};

export const addTeachersReducer = (
  state: AddTeachersState,
  action: Action
): AddTeachersState => {
  switch (action.type) {
    case "UPDATE_TEACHER":
      const id = action.payload.id;
      const idx = state.teachers.findIndex((t) => t.id == id);
      if (idx == -1) {
        return {
          teachers: [...state.teachers, action.payload],
        };
      } else {
        const newTeachers = state.teachers;
        newTeachers.splice(idx, 1);
        return {
          teachers: [...newTeachers, action.payload],
        };
      }
    case "DELETE_TEACHER":
      let teachers = state.teachers;
      const teacherIndex = teachers.findIndex((t) => t.id == action.payload.id);
      if (teacherIndex > -1) {
        teachers.splice(teacherIndex, 1);
      }
      return {
        teachers,
      };
    case "DELETE_TEACHERS":
      return {
        teachers: [],
      };

    default:
      return state;
  }
};
