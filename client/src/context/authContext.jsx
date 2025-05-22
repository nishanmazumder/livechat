import { useState, createContext, useEffect } from 'react';
import { parseJwt } from '../utils/jwtParser';
import API, { refreshAccessToken } from '../utils/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) await refreshAccessToken();
      } catch (error) {
        logout();
        throw new Error(error);
      }
    };

    checkToken();
    // const interval = setInterval(checkToken, 30000);
    // return () => clearInterval(interval);
  }, []);

  const login = async (crendential) => {
    return await API.post('/login', { crendential })
      .then((response) => {
        localStorage.setItem('accessToken', response.data?.accessToken);
        const decode = parseJwt(response.data?.accessToken);
        setUsername(decode?.username);
        return true;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const logout = async () => {
    await API.post('/logout')
      .then((response) => {
        if (204 === response.status) {
          localStorage.removeItem('accessToken');
          setUsername('');
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
