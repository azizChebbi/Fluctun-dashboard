import {
  Action,
  AddTeachersState,
  Teacher,
  TeacherField,
} from "@reducers/teachers";
import { actions } from "context";

const initTeacher: Teacher = {
  isValid: false,
  id: "",
  firstName: "",
  lastName: "",
  cin: "",
  subject: "",
  email: "",
  number: 0,
};

export const updateTeachers = (
  state: AddTeachersState,
  action: Action,
  attribute: TeacherField
) => {
  const teacher = state.teachers.find((t) => t.id == action.payload.id);
  if (!teacher) {
    return {
      teachers: [
        ...state.teachers,
        {
          ...initTeacher,
          id: action.payload.id,
          [attribute]: action.payload.field,
        },
      ],
    };
  } else {
    let teachers = state.teachers;
    const teacherIndex = teachers.findIndex((t) => t.id == action.payload.id);
    if (teacherIndex > -1) {
      teachers.splice(teacherIndex, 1);
    }
    return {
      teachers: [
        ...teachers,
        {
          ...teacher,
          [attribute]: action.payload.field,
        },
      ],
    };
  }
};
