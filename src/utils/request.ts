import Axios, { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';
import router from '../router';

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://192.168.1.13:9000',
  timeout: 10000,
  withCredentials: true
};

const axios = Axios.create(axiosConfig);

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    const { data } = res;
    if (data.code == 202) {
      // 登录失效状态码
      console.log('登录失效了');
      router.push('login');
    }
    return Promise.resolve(data);
  },
  (err: AxiosResponse) => {
    return Promise.reject(err);
  }
);

export default axios;
