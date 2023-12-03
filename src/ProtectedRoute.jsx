import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./config/firebase-config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "@redux/features/authUserSlice";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  console.log(isLoggedIn, auth?.currentUser);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // user is signed in
        console.log("User is logged in", user);
        dispatch(setIsLoggedIn(true));
      } else {
        // user is signed out
        console.log("User is logged out");
        dispatch(setIsLoggedIn(false));
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/sign-up" />;
};
