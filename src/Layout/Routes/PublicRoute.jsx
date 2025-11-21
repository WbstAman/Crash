import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = null; // Replace with real token logic

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
