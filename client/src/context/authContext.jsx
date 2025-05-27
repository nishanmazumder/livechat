import { useState, createContext, useEffect } from 'react';
import { parseJwt } from '../utils/jwtParser';
import API, { refreshAccessToken } from '../utils/api';
import { io } from 'socket.io-client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const socket = io('http://localhost:3000'); // 5173
  const [user, setUser] = useState({});

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
        setUser({ id: decode?.id, username: decode?.username });
        socket.emit('register', decode?.id);
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
          setUser([]);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    // <AuthContext.Provider value={{ user, login, logout }}>
    <AuthContext.Provider value={{ user, socket, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
