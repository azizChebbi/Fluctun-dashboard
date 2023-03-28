import axios from "axios";

export const getAccessToken = () => {
  const sat = localStorage.getItem("ata");
  if (typeof sat == "string" && sat.length != 0) {
    const at: string = JSON.parse(sat);
    return at;
  }
  return null;
};

export const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
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
