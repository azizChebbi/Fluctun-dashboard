import React from "react";

const useAccessToken = () => {
  const sat = localStorage.getItem("at");
  if (typeof sat == "string" && sat.length != 0) {
    const at: string = JSON.parse(sat);
    return { token: at };
  }
  return { token: null };
};

export default useAccessToken;
