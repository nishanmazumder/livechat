import axios from 'axios';
import { parseJwt } from './jwtParser';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  return await API.post('/refresh')
    .then((response) => {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    })
    .catch((error) => {
      localStorage.removeItem('accessToken');
      throw new Error(
        'Error: ' + error,
        'Refresh token expired, logging out...'
      );
    });
};

API.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem('accessToken');

    if (token) {
      const decode = parseJwt(token);
      const expire = decode.exp * 1000 < Date.now();

      if (expire) {
        token = await refreshAccessToken();

        if (!token) {
          return Promise.reject(
            new Error('Session expired, please log in again.')
          );
        }
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
