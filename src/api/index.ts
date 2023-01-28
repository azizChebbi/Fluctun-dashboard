import axios from "axios";
import { actions, getAccessToken, store } from "context/index";

export const api = axios.create({
  baseURL: "http://localhost:9000",
});

// add a request interceptor
api.interceptors.request.use(
  (config) => {
    const access_token = getAccessToken();
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest.url);
    if (
      error.response.status === 401
      //   &&
      //   originalRequest.url === "http://localhost:9000/auth/refresh"
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return api
        .post("/auth/refresh", { withCredentials: true })
        .then((res) => {
          if (res.status === 201) {
            // payload: res.data.access_token,
            localStorage.setItem("at", JSON.stringify(res.data.access_token));
            return api(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
