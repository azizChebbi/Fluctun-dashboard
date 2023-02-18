import React, { FC, ReactNode } from "react";

interface IProps {
  isLoading: boolean;
  loader: ReactNode;
  children?: ReactNode;
}

const Loader: FC<IProps> = ({ isLoading, loader, children }) => {
  return <>{isLoading ? loader : children}</>;
};

export default Loader;
