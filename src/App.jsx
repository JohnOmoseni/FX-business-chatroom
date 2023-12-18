import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm";
import SignIn from "./pages/auth/SignIn";
import LoaderBody from "./components/Loaders/LoaderBody";

const Home = React.lazy(() => import("./pages/Home"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../redux/features/authUserSlice";
import { ProtectedRoute } from "./ProtectedRoute";
import { RequireAuth } from "react-auth-kit";

function App() {
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
  return (
    <>
      <div className="wrapper relative">
        <Suspense fallback={<LoaderBody />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                // <RequireAuth loginPath="/auth/sign-up">
                <Home />
                // </RequireAuth>
              }
            />

            <Route path="/auth/sign-up" element={<RegisterForm />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
