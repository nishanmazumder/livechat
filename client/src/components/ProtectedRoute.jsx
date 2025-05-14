import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  if (!getAuthToken()) {
    return <Navigate to='/login' />;
  }

  return children;
}
