import React, { FC, ReactNode } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
}

const Button: FC<IProps> = ({ children, className, disabled, ...props }) => {
  return (
    <button
      className={` text-white text-base font-semibold bg-blue rounded py-3 px-8 text-center outline-none border-none ${
        disabled ? "cursor-not-allowed bg-gray-400" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
