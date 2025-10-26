import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const PublicRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};