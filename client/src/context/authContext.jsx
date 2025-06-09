import { useState, createContext, useEffect } from 'react';
import { parseJwt } from '../utils/jwtParser';
import API, { refreshAccessToken } from '../utils/api';
import { useSocket } from '../utils/socket';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const socket = useSocket(user);

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

  }, [user]);

  const login = async (crendential) => {
    return await API.post('/login', { crendential })
      .then((response) => {
        localStorage.setItem('accessToken', response.data?.accessToken);
        const decode = parseJwt(response.data?.accessToken);

        setUser({
          id: decode?.id,
          username: decode?.username,
        });

        return true;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const logout = async () => {
    await API.post('/logout', { userId: user.id })
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
    <AuthContext.Provider value={{ user, socket, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
