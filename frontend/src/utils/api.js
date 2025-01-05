import axios from "axios";

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response?.data || "Unknown error occurred";
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
