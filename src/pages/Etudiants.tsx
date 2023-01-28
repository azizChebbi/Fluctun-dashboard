import React from "react";
import Wrapper from "../components/layouts/Wrapper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const Etudiants = () => {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  return (
    <Wrapper>
      <div className=" h-full">
        {/* <DataGrid {...data} components={{ Toolbar: GridToolbar }} /> */}
      </div>
    </Wrapper>
  );
};

export default Etudiants;
