import Axios from "axios";
import { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "localhost:9000",
  timeout: 10000,
  withCredentials: true
};

const axios = Axios.create(axiosConfig);

export default axios;
