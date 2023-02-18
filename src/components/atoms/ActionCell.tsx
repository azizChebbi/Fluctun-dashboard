import { Tooltip } from "@mui/material";
import React, { FC } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

interface IProps {
  handleDelete: () => void;
  handleEdit: () => void;
}

const ActionCell: FC<IProps> = ({ handleDelete, handleEdit }) => {
  return (
    <>
      <Tooltip title="delete">
        <button onClick={handleDelete} className=" bg-[#FCECEB] p-3 rounded">
          <DeleteOutlineOutlinedIcon
            fontSize="medium"
            sx={{ color: "#DD453A", cursor: "pointer" }}
          />
        </button>
      </Tooltip>
      <Tooltip title="Edit">
        <button onClick={handleEdit} className=" bg-[#E7F4F3] p-3 rounded">
          <DriveFileRenameOutlineOutlinedIcon
            sx={{ color: "#0E9384", cursor: "pointer" }}
          />
        </button>
      </Tooltip>
    </>
  );
};

export default ActionCell;
