import { useState, createContext } from 'react';
import { parseJwt } from '../utils/jwtParser';
import { getAuthToken, refreshToken, setAuthToken } from '../utils/api';
import { useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    //   refreshToken();

    //   // if (!getAuthToken()) {
    //   //   console.log('Log out!');
    //   //   // logout();
    //   // }

    //   // console.log(loginStatus);

    // const authInterval = setInterval(login(getAuthToken()), 1 * 30 * 1000); // every 30s

    const refreshInterval = setInterval(refreshToken, 1 * 45 * 1000); // every 45s

    return () => {
      // clearInterval(authInterval);
      clearInterval(refreshInterval);
    };

    //   //   // const getAuthTokenInt = setInterval(
    //   //   //   () => {
    //   //   //     if (!getAuthToken()) {
    //   //   //       localStorage.removeItem('token');
    //   //   //       localStorage.removeItem('username');
    //   //   //       setUsername('');
    //   //   //     }
    //   //   //   },
    //   //   //   2 * 60 * 1000 // 2 min
    //   //   // );
    //   //   // return () => clearInterval(getAuthTokenInt);
  }, []);

  function login(token) {
    if (!token) return;

    setAuthToken(token?.accessToken);

    const decode = parseJwt(token?.accessToken);

    if (decode && decode.username) {
      localStorage.setItem('token', token?.accessToken);
      // localStorage.setItem('username', decode.username);
      setUsername(decode.username);
      setLoginStatus(true);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('username');
    setUsername('');
    setLoginStatus(false);
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
