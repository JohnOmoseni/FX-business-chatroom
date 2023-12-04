import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./config/firebase-config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "@redux/features/authUserSlice";
import { cookies } from "@constants/constants";

export const ProtectedRoute = ({ children, isLoggedIn }) => {
  const isAuth = cookies.get("auth-token");

  return <Outlet />;
  // return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-up" />;
};
