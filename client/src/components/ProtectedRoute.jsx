import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

export default function ProtectedRoute({ children }) {
  const { username } = useContext(AuthContext);
  return username ? children : <Navigate to='/login' />;
}
