import React, { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const NoRowsIndicator: FC<IProps> = ({ children }) => {
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <p className=" text-xl">{children}</p>
    </div>
  );
};

export default NoRowsIndicator;
