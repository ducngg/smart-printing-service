import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import _ from 'lodash';

import { ResponseError } from 'types';

let callback401: (error: unknown) => void = () => {};

export function set401Callback(cb: (error: unknown) => void) {
  callback401 = cb;
}

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: ResponseError) => {
    const { response } = error;
    if (!_.isEmpty(response) && response.status === 401 && !_.isNull(callback401)) {
      callback401(response.data.payload);
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage.getItem('token');
    config.headers.authorization = `Bearer ${JSON.parse(token || '') as string}`;
    return config;
  },
  (error) => {
    console.log('Error in axios');
    Promise.reject(error);
  }
);

export { axiosInstance as axios };
