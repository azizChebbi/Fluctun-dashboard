import React, { FC } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  register?: any;
  name?: string;
}

const Input: FC<IProps> = ({
  value,
  setValue,
  placeholder,
  className,
  register = (n: string) => null,
  name,
  onChange,
  ...props
}) => {
  return (
    <input
      className={` border-none outline-none flex-1  ${className}`}
      placeholder={placeholder}
      {...props}
      {...register(name)}
    />
  );
};

export default Input;
