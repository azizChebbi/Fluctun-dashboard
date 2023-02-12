import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";

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

const TeachersTable: React.FC<IProps> = ({ rows }) => {
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
