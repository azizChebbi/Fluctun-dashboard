export type FullTeacherData = {
  id: string;
  cin: string;
  createdAt: string;
  lastUpdatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  instituteId: string;
  number: number;
  photo: string;
  subject: string;
};

export type FullStudentData = {
  id: string;
  code: string;
  createdAt: string;
  lastUpdatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  instituteId: string;
  photo: string;
  level: string;
  dateOfBirth: string;
};

export const mapTeachersDataToColumns = (teachers: FullTeacherData[]) => {
  return teachers.map((t) => {
    const { id, firstName, lastName, cin, subject, email, number } = t;
    return {
      id,
      name: lastName,
      firstName,
      cin,
      subject,
      email,
      number,
      actions: id,
    };
  });
};

export const mapStudentsDataToColumns = (students: FullStudentData[]) => {
  return students.map((t) => {
    const { id, firstName, lastName, code, level } = t;
    return {
      id,
      name: lastName,
      firstName,
      code,
      level,
      actions: id,
    };
  });
};
