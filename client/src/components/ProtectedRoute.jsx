import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/authContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user.id ? children : <Navigate to='/login' />;
}
