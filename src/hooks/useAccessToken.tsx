import React, { useState, useCallback } from "react";

// const useToken = () => {
//   // Initialize the state
//   const [token, setToken] = useState(() => {
//     const sat = localStorage.getItem("at");
//     if (typeof sat == "string" && sat.length != 0) {
//       const at: string = JSON.parse(sat);
//       return at;
//     }
//     return null;
//   });

//   // Define and memorize toggler function in case we pass down the component,
//   // This function change the boolean value to it's opposite value
//   // const removeToken = useCallback((): void => setToken(state => !state), []);

//   return [token, setToken];
// };

const useAccessToken = () => {
  const sat = localStorage.getItem("at");
  if (typeof sat == "string" && sat.length != 0) {
    const at: string = JSON.parse(sat);
    return { token: at };
  }
  return { token: null };
};

export default useAccessToken;
