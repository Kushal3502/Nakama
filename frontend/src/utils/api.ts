import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

const baseURL: string = import.meta.env.VITE_BACKEND_URI;

const api: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api/v1`,
  withCredentials: true,
});

export const get = async (endpoint = "", params = {}) => {
  try {
    const response: AxiosResponse = await api.get(endpoint, {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const post = async (endpoint = "", data = {}) => {
  try {
    const response: AxiosResponse = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const patch = async (endpoint = "", data = {}) => {
  try {
    const response: AxiosResponse = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const del = async (endpoint = "", params = {}) => {
  try {
    const response: AxiosResponse = await api.delete(endpoint, {
      params,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any): void => {
  toast.error(error.response.data.message);
  if (axios.isAxiosError(error)) {
    console.error("API error :: ", error.response?.data || error.message);
  } else {
    console.error("Unexpected error :: ", error);
  }
};
