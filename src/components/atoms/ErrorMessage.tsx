import React, { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
  className?: string;
}

const ErrorMessage: FC<IProps> = ({ children, className }) => {
  return <p className={` text-red-400 mt-1 ml-2 ${className}`}>{children}</p>;
};

export default ErrorMessage;
