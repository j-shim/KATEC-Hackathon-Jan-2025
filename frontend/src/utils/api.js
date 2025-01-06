import axios from "axios";

const getCsrfToken = () => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return csrfToken ? csrfToken.split("=")[1] : "";
};

const api = axios.create({
  // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCsrfToken(),
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (request) => {
    request.headers["X-CSRFToken"] = getCsrfToken();
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
