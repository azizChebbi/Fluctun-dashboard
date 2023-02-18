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

export type EditTeacherState = {
  teacher: Partial<Teacher> | null;
};

export type ActionsTypes = "UPDATE_TEACHER";

export type Action = {
  type: ActionsTypes;
  payload: Partial<Teacher>;
};

export const editTeacherInitialState: EditTeacherState = {
  teacher: { isValid: true },
};

export const editTeacherReducer = (
  state: EditTeacherState,
  action: Action
): EditTeacherState => {
  switch (action.type) {
    case "UPDATE_TEACHER":
      return {
        teacher: {
          ...state.teacher,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
