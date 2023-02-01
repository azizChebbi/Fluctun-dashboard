import React, { FC } from "react";

export type Option = {
  value: string;
  label: string;
};

interface IProps {
  options: Option[];
}

const SelectList: FC<IProps> = ({ options }) => {
  return (
    <select name="cars" id="cars" className="flex-1">
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectList;
