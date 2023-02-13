import React, { useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import TeacherActionCell from "@atoms/TeacherActionCell";

const columns: GridColDef[] = [
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
    align: "center",
    flex: 0.5,
    renderCell: (params) => {
      const id = params.value;
      return <TeacherActionCell id={id} />;
    },
  },
];

interface IProps {
  rows: any[];
}

const TeachersTable: React.FC<IProps> = ({ rows }) => {
  const [teacherInformationsModalIsOpen, setTeacherInformationsModalIsOpen] =
    useState<boolean>(false);

  return (
    <Box
      className=" h-[500px]  w-full"
      sx={{
        "& .teachers-header": {
          color: "#8E8E8E",
        },
      }}
    >
      <DataGrid
        sx={{ fontSize: "12px" }}
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        // components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default TeachersTable;
