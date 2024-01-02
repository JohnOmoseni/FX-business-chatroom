import { Navigate } from "react-router-dom";
import useAuthContext from "@context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("auth-token");
  const { isAuthenticated } = useAuthContext();

  console.log(isAuthenticated, authToken);
  if (!isAuthenticated && !authToken) {
    return <Navigate to="/auth/sign-in" />;
  }

  return children;
};
