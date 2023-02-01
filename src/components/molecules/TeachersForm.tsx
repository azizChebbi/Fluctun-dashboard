import Input from "@atoms/Input";
import SelectList from "@atoms/SelectList";
import React, { FC, useEffect, useId, useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";

interface IProps {
  setData: React.Dispatch<React.SetStateAction<number[]>>;
  id: number;
}

const TeachersForm: FC<IProps> = ({ setData, id }) => {
  const [focused, setFocused] = useState<boolean>(false);
  const onDelete = (e: any) => {
    e.preventDefault();
    setData((prevState) => {
      const arr = prevState;
      const ind = arr.lastIndexOf(id);
      arr.splice(ind, 1);
      return [...arr];
    });
  };
  return (
    <form
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={` relative flex items-center justify-between w-full gap-8 border-t-[1px] border-b-[1px] border-[#F2F2F2] p-4 px-24 ${
        focused ? "border-black" : ""
      }`}
    >
      <Input placeholder="Nom" />
      <Input placeholder="Prénom" />
      <Input placeholder="Cin" />
      <SelectList
        options={[
          { value: "Mathémathique", label: "Mathémathique" },
          { value: "Science", label: "Science" },
        ]}
      />
      <Input placeholder="Email" type={"email"} />
      <Input placeholder="Numéro" />
      <button
        className=" absolute top-1/2 transform -translate-y-1/2 right-12"
        onClick={onDelete}
      >
        <Tooltip title="Effacer">
          <DeleteOutlineOutlinedIcon sx={{ color: "#C5C5C5" }} />
        </Tooltip>
      </button>
    </form>
  );
};

export default TeachersForm;
