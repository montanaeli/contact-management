import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// TODO: Refresh expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      window.location.href = "/login";
    } else if (status === 404) {
      // TODO: Handle not found errors
    } else {
      // TODO: Handle other errors
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
