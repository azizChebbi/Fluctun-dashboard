import FullPageSpinner from "@pages/FullPageSpinner";
import { api } from "api";
import * as React from "react";

const AuthContext = React.createContext(null);
AuthContext.displayName = "AuthContext";

export type Auth = {
  data: any;
  login: () => void;
  register: () => void;
  logout: () => void;
};

function AuthProvider(props: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any>(null);

  async function getAccessToken() {
    try {
      const res = await api.post("/auth/refresh");
      console.log(res.data);
      setData({ accessToken: res.data.access_token });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getAccessToken();
  }, []);

  const login = React.useCallback(() => {}, []);
  const register = React.useCallback(() => {}, []);
  const logout = React.useCallback(() => {}, []);

  const value = React.useMemo(
    () => ({ data, login, logout, register }),
    [data, login, logout, register]
  );

  return isLoading ? (
    <FullPageSpinner />
  ) : (
    <AuthContext.Provider value={value} {...props} />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
