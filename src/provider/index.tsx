import React, { FC, ReactNode } from "react";
import { StoreProvider } from "context/index";

interface IProps {
  children: ReactNode;
}

const AppProviders: FC<IProps> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default AppProviders;
