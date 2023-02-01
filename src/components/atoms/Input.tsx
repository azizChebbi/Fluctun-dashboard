import React, { FC } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

const Input: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  className,
  ...props
}) => {
  return (
    <input
      className={` border-none outline-none flex-1 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
