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
  // return [
  //   {
  //     id: 1,
  //     name: "Kamel",
  //     firstName: "Chebbi",
  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 2,
  //     name: "Manel",
  //     firstName: "Chebbi",
  //     cin: "073645738",
  //     subject: "Science",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 3,
  //     name: "Kamel",
  //     firstName: "Chebbi",

  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 4,
  //     name: "Kamel",
  //     firstName: "Chebbi",

  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 5,
  //     name: "Kamel",
  //     firstName: "Chebbi",

  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 6,
  //     name: "Kamel",
  //     firstName: "Chebbi",
  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 7,
  //     name: "Kamel",
  //     firstName: "Chebbi",
  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  //   {
  //     id: 8,
  //     name: "Kamel",
  //     firstName: "Chebbi",
  //     cin: "073645738",
  //     subject: "Mathématique",
  //     email: "kamel@gmail.com",
  //     number: "99736457",
  //   },
  // ];
};
