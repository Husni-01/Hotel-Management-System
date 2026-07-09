import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  // if user is there?

  const { loading, user } = useAuth();

  if (loading) return <p> Loading..... </p>;

  if (!user) return <Navigate to="/login" />;

  if (user) return children;
}
