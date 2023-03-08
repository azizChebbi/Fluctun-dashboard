import StudentActionCell from "@features/students/components/StudentActionCell";
import { TeacherActionCell } from "@features/teachers";
import { GridColDef } from "@mui/x-data-grid";

export const teachersColumns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nom",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "firstName",
    headerName: "Prénom",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",

    flex: 1,
  },
  {
    field: "cin",
    headerName: "CIN",
    type: "string",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "subject",
    headerName: "Matiére",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "number",
    headerName: "Numéro",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "",
    filterable: false,
    sortable: false,
    align: "right",
    flex: 0.7,
    renderCell: (params: any) => {
      const id = params.value;
      return <TeacherActionCell id={id} />;
    },
  },
];

export const studentsColumns: GridColDef[] = [
  {
    field: "lastName",
    headerName: "Nom",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "firstName",
    headerName: "Prénom",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "code",
    headerName: "Code d'inscription",
    type: "string",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "level",
    headerName: "Niveau",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    headerClassName: "teachers-header",
    align: "center",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "",
    filterable: false,
    align: "center",
    flex: 0.5,
    renderCell: (params) => {
      const id = params.value;
      return <StudentActionCell id={id} />;
    },
  },
];
