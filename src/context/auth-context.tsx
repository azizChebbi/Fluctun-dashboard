import FullPageSpinner from "@pages/FullPageSpinner";
import { api } from "api";
import axios, { AxiosError } from "axios";
import * as React from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { notifyError } from "@utils/notify";

const AuthContext = React.createContext(null);
AuthContext.displayName = "AuthContext";

export type Auth = {
  login: ({ email, password }: { email: string; password: string }) => void;
  register: () => void;
  logout: () => void;
};

function AuthProvider(props: any) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function getAccessToken() {
    try {
      const res = await api.post("/auth/refresh");
      localStorage.setItem("at", JSON.stringify(res.data.access_token));
      return redirect("/");
    } catch (error) {
      console.log(error);
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
          "http://localhost:9000/auth/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        localStorage.setItem("at", JSON.stringify(res.data.access_token));
        window.location.reload();
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
    console.log(localStorage.getItem("at"));
    localStorage.removeItem("at");
    console.log("logout clicked");
    console.log(localStorage.getItem("at"));
    try {
      await api.post("/auth/logout");
      window.location.replace("http://localhost:3000/login");
    } catch (error) {
      notifyError("Error has occured, try to refresh the page");
    }
    // window.location.reload();
    // redirect("/logout");
  }, []);

  const value = React.useMemo(
    () => ({ login, logout, register }),
    [login, logout, register]
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
