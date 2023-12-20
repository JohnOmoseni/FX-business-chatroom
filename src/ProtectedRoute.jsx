import { Navigate } from "react-router-dom";
import { cookies } from "@constants/constants";
import useAuthContext from "@context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const isCookie = cookies.get("auth-token");
  const { isAuthenticated } = useAuthContext();

  console.log(isAuthenticated);
  // if (!isAuthenticathed) {
  //   return <Navigate to="/auth/sign-in" />;
  // }

  return children;
};
