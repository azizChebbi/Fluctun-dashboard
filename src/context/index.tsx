import { api } from "api";
import { configureAuth } from "react-query-auth";

export const { useUser, useLogin, useLogout, AuthLoader } = configureAuth({
  userFn: () => api.get("/auth/refresh"),
  loginFn: (credentials) => api.post("/auth/login", credentials),
  registerFn: (credentials) => api.post("/auth/register", credentials),
  logoutFn: () => api.post("/logout"),
});
