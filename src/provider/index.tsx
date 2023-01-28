import React, { FC, ReactNode, useContext, useEffect } from "react";
import { api } from "../api";
import { setAccessToken, store, StoreProvider } from "context/index";

interface IProps {
  children: ReactNode;
}

const AppProviders: FC<IProps> = ({ children }) => {
  const d = useContext(store);
  console.log("Store: ", d);
  useEffect(() => {}, []);
  async function getAccessToken() {
    try {
      const res = await api.post("/auth/refresh");
      console.log(res.data);
      // dispatch(setAccessToken(res.data.access_token));
    } catch (error) {
      console.log(error);
    }
  }
  return <StoreProvider>{children}</StoreProvider>;
};

export default AppProviders;
