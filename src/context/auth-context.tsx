import FullPageSpinner from "@pages/FullPageSpinner";
import { api } from "api";
import axios from "axios";
import * as React from "react";
import { notifyError } from "@utils/notify";
import useLocalStorage from "@hooks/useLocalstorage";

const AuthContext = React.createContext(null);
AuthContext.displayName = "AuthContext";

export type Auth = {
  login: ({ email, password }: { email: string; password: string }) => void;
  register: () => void;
  logout: () => void;
  token: string;
  setToken: any;
};

function AuthProvider(props: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [token, setToken] = useLocalStorage("at", null);

  async function getAccessToken() {
    try {
      const res = await api.post("/auth/refresh");
      localStorage.setItem("at", JSON.stringify(res.data.access_token));
    } catch (error) {
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getAccessToken();
  }, []);

  const login = React.useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const res = await axios.post(
          "http://localhost:9000/auth/loginAdmin",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        setToken(res.data.access_token);
      } catch (error: any) {
        if (error.code == "ERR_NETWORK")
          notifyError("Une erreur s'est produite, essayez plus tard");
        else notifyError("L'adresse email ou le mot de passe est incorrect");
      }
    },
    []
  );
  const register = React.useCallback(() => {}, []);
  const logout = React.useCallback(async () => {
    console.log("clicked");
    try {
      await api.post("/auth/logout");
      setToken(null);
    } catch (error) {
      notifyError("Error has occured, try to refresh the page");
    }
  }, []);

  const value = React.useMemo(
    () => ({ login, logout, register, token, setToken }),
    [login, logout, register, token, setToken]
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
