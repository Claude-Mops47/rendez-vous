import axios from "axios";
import Cookies from "js-cookie";
import { history } from "./history";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const sessionCookie = Cookies.get("session");
  // const sessionCookie = Cookies.get('connect.sid')
  // const authTokn = sessionCookie.split('.')[0]

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (sessionCookie) {
    // console.log(sessionCookie);
    // config.headers['Cookie'] = sessionCookie
  }
  return config;
});

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Rediriger vers la page de connexion
      history.navigate("/auth/login");
      localStorage.removeItem('user')
      Cookies.remove("session");
    }
    return Promise.reject(error);
  }
);

export { apiService };
