import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const { token } = useSelector((state) => state.login);

  const token = null; // Placeholder for token logic

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
