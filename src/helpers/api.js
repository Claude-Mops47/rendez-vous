import axios from "axios";
import Cookies from "js-cookie";
import { history } from "./history";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const sessionCookie = Cookies.get("session");
  const refreshToken = Cookies.get("refreshToken");
  // const authTokn = sessionCookie.split('.')[0]
  console.log(refreshToken);

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (refreshToken) {
    config.headers['X-Refresh-Token'] = refreshToken
  }
  return config;
});


apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log(error);
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { accessToken } = response.data;
        localStorage.setItem("token", accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Rediriger vers la page de connexion
        history.navigate("/auth/login");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        Cookies.remove("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { apiService };
