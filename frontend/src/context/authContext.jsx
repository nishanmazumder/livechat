import { useState, createContext } from 'react';
import { parseJwt } from '../utils/jwtParser';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(
    localStorage.getItem('username') || ''
  );

  function login(token) {
    if (!token) return;

    const decode = parseJwt(token);
    if (decode && decode.username) {
      localStorage.setItem('username', decode.username);
      setUsername(decode.username);
    }
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
