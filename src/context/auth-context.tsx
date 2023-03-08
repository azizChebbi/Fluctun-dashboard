import FullPageSpinner from "@pages/FullPageSpinner";
import { api } from "api";
import axios from "axios";
import * as React from "react";
import { notifyError } from "@utils/notify";
import useLocalStorage from "@hooks/useLocalstorage";

const AuthContext = React.createContext<Auth | null>(null);
AuthContext.displayName = "AuthContext";

export type Auth = {
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  token: string | null;
  setToken: any;
};

function AuthProvider(props: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [token, setToken] = useLocalStorage<string | null>("ata", null);

  async function getAccessToken() {
    try {
      const res = await api.post("/auth/refresh");
      console.log(res);
      setToken(res.data.access_token);
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
        const res = await api.post("/auth/loginAdmin", {
          email,
          password,
        });
        setToken(res.data.access_token);
      } catch (error: any) {
        if (error.code == "ERR_NETWORK")
          notifyError("Une erreur s'est produite, essayez plus tard");
        else notifyError("L'adresse email ou le mot de passe est incorrect");
      }
    },
    []
  );

  const logout = React.useCallback(async () => {
    try {
      await api.post("/auth/logout");
      setToken(null);
    } catch (error) {
      notifyError("Error has occured, try to refresh the page");
    }
  }, []);

  const value: Auth = React.useMemo(
    () => ({ login, logout, token, setToken }),
    [login, logout, token, setToken]
  );

  return isLoading ? (
    <FullPageSpinner />
  ) : (
    <AuthContext.Provider value={value} {...props} />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext) as Auth;
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
