import { Tooltip } from "@mui/material";
import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
  registration: Partial<UseFormRegisterReturn>;
}

const Input: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  className,
  errorMessage,
  onChange,
  registration,
  ...props
}) => {
  return (
    <Tooltip
      title={errorMessage ? <p className=" text-sm">{errorMessage}</p> : null}
      arrow
      sx={{ fontSize: "20px" }}
    >
      <input
        className={` outline-none flex-1 ${
          errorMessage && " text-red-500 border-red-500"
        } ${className}`}
        placeholder={placeholder}
        {...props}
        {...registration}
      />
    </Tooltip>
  );
};

export default Input;
