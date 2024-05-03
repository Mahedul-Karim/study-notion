import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  validateStatus: (status) => {
    return status < 510;
  },
});

export const apiConnector = async (endpoint, options, getProgress) => {
  try {
    const { data } = await axiosInstance({
      ...options,
      url: endpoint,
      onDownloadProgress: (progress) => {
        if (!getProgress) return;

        let percent = Math.round((progress.loaded * 100) / progress.total);

        getProgress(percent);
      },
    });

    if (!data.success) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
