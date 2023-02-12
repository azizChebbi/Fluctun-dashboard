import React, { FC } from "react";
import Select from "react-select";

interface Option {
  label: string;
  value: string;
}

const customStyles = {
  option: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    color: state.isSelected ? "#000" : "#667085",
  }),

  control: (defaultStyles: any) => ({
    ...defaultStyles,
    border: "none",
    boxShadow: "none",
    borderRadius: "8px",
    // width: "150px",
  }),
  singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#000" }),
};

interface IProps {
  options: Option[];
  className?: string;
  placeholder?: string;
  isMulti?: boolean;
  onChange?: (e: any) => void;
}

const SelectOption: FC<IProps> = ({
  options,
  className,
  onChange,
  ...props
}) => {
  return (
    <Select
      components={{
        IndicatorSeparator: () => null,
      }}
      menuPlacement="auto"
      options={options}
      styles={customStyles}
      {...props}
      onChange={onChange}
      className={` ${className}`}
    />
  );
};

export default SelectOption;
