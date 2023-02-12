import React from "react";
import jwt_decode from "jwt-decode";
import useAccessToken from "./useAccessToken";

export type JwtPayload = {
  id: string;
  role: string;
  instituteId: string;
};

function usePayload() {
  const { token } = useAccessToken();
  let decoded: JwtPayload = {
    id: "",
    role: "",
    instituteId: "",
  };
  if (token) decoded = jwt_decode(token);
  return decoded;
}

export default usePayload;
