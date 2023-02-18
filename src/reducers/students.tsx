export type StundetField =
  | "isValid"
  | "id"
  | "firstName"
  | "lastName"
  | "code"
  | "level"
  | "instituteId";

export type Student = {
  isValid: boolean;
  id: string;
  firstName: string;
  lastName: string;
  code: string;
  level: string;
  instituteId: string;
};

export type AddStudentsState = {
  students: Student[];
};

export type ActionsTypes =
  | "UPDATE_STUDENT"
  | "DELETE_STUDENT"
  | "DELETE_STUDENTS"
  | "REMAIN_STUDENTS_WITH_IDS";

export type Action = {
  type: ActionsTypes;
  payload: any;
};

export const addStudentsInitialState: AddStudentsState = {
  students: [],
};

export const addStudentsReducer = (
  state: AddStudentsState,
  action: Action
): AddStudentsState => {
  switch (action.type) {
    case "UPDATE_STUDENT":
      const id = action.payload.id;
      const idx = state.students.findIndex((t) => t.id == id);
      if (idx == -1) {
        return {
          students: [...state.students, action.payload],
        };
      } else {
        const newTeachers = state.students;
        newTeachers.splice(idx, 1);
        return {
          students: [
            ...newTeachers,
            { ...action.payload, number: parseInt(action.payload.number, 10) },
          ],
        };
      }
    case "DELETE_STUDENT":
      let students = state.students;
      const teacherIndex = students.findIndex((t) => t.id == action.payload.id);
      if (teacherIndex > -1) {
        students.splice(teacherIndex, 1);
      }
      return {
        students,
      };
    case "DELETE_STUDENTS":
      return {
        students: [],
      };
    case "REMAIN_STUDENTS_WITH_IDS":
      if (action.payload.teachersIDS?.length == 0) return { students: [] };
      let studentsToBeRemaind = state.students.filter(
        (student) => action.payload.teachersIDS?.indexOf(student.id) != -1
      );
      return {
        students: studentsToBeRemaind,
      };
    default:
      return state;
  }
};
