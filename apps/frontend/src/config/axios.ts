import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;
const API_VERSION = import.meta.env.VITE_API_VERSION;



const API_URL = `${API_BASE_URL}/${API_PREFIX}/${API_VERSION}`;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  function (config) {
    try {
      const accessToken = localStorage.getItem("accessToken");
      config.headers["authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.log(error);
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Interceptors
api.interceptors.response.use(
  (config) => {
    console.log(config);
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh-token`);

        const data = await response.data;
        localStorage.setItem("sessionToken", data);

        return api.request(originalRequest);
      } catch (err) {
        console.error(error.message);
      }
    }
    throw error;
  },
);

export default api;
