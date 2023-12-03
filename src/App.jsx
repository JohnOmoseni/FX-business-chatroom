import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm";
import SignIn from "./pages/auth/SignIn";

const Home = React.lazy(() => import("./pages/Home"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./config/firebase-config";
import { ProtectedRoute } from "./ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "../redux/features/authUserSlice";

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
        <Suspense fallback="Loading...">
          <Routes>
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="users" element="Users" />
              <Route path="users/:id" element="UsersDetails" />
            </Route>

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
