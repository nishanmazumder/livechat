import { useState, createContext, useEffect } from 'react';
import { parseJwt } from '../utils/jwtParser';
import API, { refreshAccessToken } from '../utils/api';
import { io } from 'socket.io-client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const socket = io('http://localhost:3000'); // 5173
  const [user, setUser] = useState({});
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('useEffect Authcontext', socket.id);
    });

    // console.log('useEffect Authcontext', socket.id);
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

    // console.log(parseJwt(token));

    // if (token) {
    //   const decode = parseJwt(token);
    //   const userData = {
    //     id: decode?.id,
    //     username: decode?.username,
    //   };

    //   console.log(decode);

    //   setUser(userData);
    // }
    // const interval = setInterval(checkToken, 30000);
    // return () => clearInterval(interval);

    return () => socket.disconnect();
  }, []);

  // console.log(activeUsers);

  const login = async (crendential) => {
    return await API.post('/login', { crendential })
      .then((response) => {
        localStorage.setItem('accessToken', response.data?.accessToken);
        const decode = parseJwt(response.data?.accessToken);

        const userData = {
          id: decode?.id,
          username: decode?.username,
          socketId,
        };

        setUser(userData);
        // console.log('login', socket.id);
        socket.emit('login', userData);
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
