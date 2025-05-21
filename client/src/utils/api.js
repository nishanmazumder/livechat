import axios from 'axios';
import jwtDecode from 'jwt-decode';

let authToken = null;

export const getAuthToken = () => authToken;
export const setAuthToken = (token) => (authToken = token);

// export const fetchAuthToken = async () => {

// }

export const refreshToken = async () => {
  try {
    const res = await fetch('http://localhost:3000/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data?.authToken);
      setAuthToken(data?.authToken);
      console.log(data?.authToken);
      localStorage.setItem('token', data?.accessToken);
      return true;
    }

    return false;
  } catch (error) {
    return new Error({ error: error });
  }
};

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const refreshAccessToken = async () => {
  try {
    const response = await API.post('/refresh');
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh token expired, logging out...');
    localStorage.removeItem('accessToken');
    return null;
  }
};
