import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  // Show loading spinner or nothing while checking authentication
  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};