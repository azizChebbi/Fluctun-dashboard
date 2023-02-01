import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Tooltip from "@mui/material/Tooltip";

const columns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 70, hideable: false },
  {
    field: "name",
    headerName: "Nom",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "firstName",
    headerName: "Prénom",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "cin",
    headerName: "CIN",
    type: "string",
    headerAlign: "center",
    align: "center",

    flex: 1,

    // width: 130,
  },
  {
    field: "subject",
    headerName: "Matiére",
    headerAlign: "center",
    align: "center",

    flex: 1,

    // width: 90,
  },
  {
    field: "email",
    headerName: "Email",
    // width: 160,
    headerAlign: "center",
    align: "center",

    flex: 1,
  },
  {
    field: "number",
    headerName: "Numéro",
    headerAlign: "center",
    align: "center",

    flex: 1,

    // width: 160,
  },
  {
    field: "actions",
    headerName: "",
    filterable: false,
    align: "center",

    flex: 0.5,

    // width: 160,
    renderCell: (params) => {
      return (
        <div className=" flex items-center justify-center gap-2">
          <Tooltip title="delete">
            <DeleteOutlineOutlinedIcon
              sx={{ color: "#8E8E8E", cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <ModeEditOutlinedIcon
              sx={{ color: "#8E8E8E", cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      );
    },
  },
];

interface IProps {
  rows: any[];
}

const StudentsTable: React.FC<IProps> = ({ rows }) => {
  return (
    <div className=" w-full h-full  flex flex-col  justify-center">
      <p className=" text-blue text-2xl font-semibold mb-6">Etudiants</p>
      <div className=" h-[500px]  w-full">
        <DataGrid
          sx={{ fontSize: "12px" }}
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default StudentsTable;
