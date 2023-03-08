export type TeacherField =
  | "isValid"
  | "id"
  | "firstName"
  | "lastName"
  | "code"
  | "level"
  | "email"
  | "instituteId";

export type Student = {
  isValid: boolean;
  id: string;
  firstName: string;
  lastName: string;
  code: string;
  level: string;
  email: string;
  instituteId: string;
};

export type EditStudentState = {
  student: Partial<Student> | null;
};

export type ActionsTypes = "UPDATE_STUDENT";

export type Action = {
  type: ActionsTypes;
  payload: Partial<Student>;
};

export const editStudentInitialState: EditStudentState = {
  student: { isValid: true },
};

export const editStudentReducer = (
  state: EditStudentState,
  action: Action
): EditStudentState => {
  switch (action.type) {
    case "UPDATE_STUDENT":
      return {
        student: {
          ...state.student,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
