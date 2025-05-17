import { useState, createContext } from 'react';
import { parseJwt } from '../utils/jwtParser';
import { getAuthToken } from '../utils/auth';
import { useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );

  useEffect(() => {
    // const getAuthTokenInt = setInterval(
    //   () => {
    //     if (!getAuthToken()) {
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('username');
    //       setUsername('');
    //     }
    //   },
    //   2 * 60 * 1000 // 2 min
    // );
    // return () => clearInterval(getAuthTokenInt);
  }, []);

  function login(token) {
    if (!token) return;

    const decode = parseJwt(token);
    if (decode && decode.username) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', decode.username);
      setUsername(decode.username);

      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
