import axios from "axios";
import { message } from "antd";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true,
  timeoutErrorMessage: "请求超时，请稍后再试",
});

instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const data = response.data;
    if (data.code === 40001) {
      window.location.href = "/login";
    } else if (data.code !== 200) {
      message.error(data.msg);
    }
    return data.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return instance.get(url, { params });
  },
  post<T>(url: string, params?: object): Promise<T> {
    return instance.post(url, params);
  },
  put<T>(url: string, params?: object): Promise<T> {
    return instance.put(url, params);
  },
  delete<T>(url: string, params?: object): Promise<T> {
    return instance.delete(url, { params });
  }
};
