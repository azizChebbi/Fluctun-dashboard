import React, { ReactNode } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import NoRowsIndicator from "@atoms/NoRowsIndicator";

interface IProps {
  rows: any[];
  columns: GridColDef[];
  noRowsIndicator?: ReactNode;
}

export const Table: React.FC<IProps> = ({ rows, columns, noRowsIndicator }) => {
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
        sx={{ fontSize: "14px", background: "white" }}
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[7]}
        // components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: () => <NoRowsIndicator>{noRowsIndicator}</NoRowsIndicator>,
        }}
      />
    </Box>
  );
};

// export default TeachersTable;
