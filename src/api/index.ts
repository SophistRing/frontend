import { useProfileStore } from "@/features/login/store/useProfileStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshRes = await axios.post(
          `/member/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axiosInstance(error.config);
      } catch (refreshError) {
        useProfileStore.getState().clear();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
