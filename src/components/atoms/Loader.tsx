import React, { FC, ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IProps {
  isLoading: boolean;
  loader?: ReactNode;
  children?: ReactNode;
}

const Loader: FC<IProps> = ({ isLoading, loader = <ClipLoader color="#142B33" size={24} />, children }) => {
  return <>{isLoading ? loader : children}</>;
};

export default Loader;
