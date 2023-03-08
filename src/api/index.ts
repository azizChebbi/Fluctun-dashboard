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
    // const access_token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTY0OTZkYTdlNmRmNTQzMDFjNGJlNSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImluc3RpdHV0ZUlkIjoiNjNjZDVjMzFjODY4NmVkNDkzMmIxOWQzIiwiaWF0IjoxNjc3MjQ2ODQ1LCJleHAiOjE2NzcyNDY5MDV9._NjVu44VSxRg8DdzeTyAUyd6lhj9-_9uYTX2Jy8B-kg";
    console.log(access_token);
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
