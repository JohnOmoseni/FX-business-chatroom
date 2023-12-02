import React, { useState, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm";
import SignIn from "./pages/auth/SignIn";

const Home = React.lazy(() => import("./pages/Home"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cookies } from "@constants/constants";

function App() {
  const isAuth = cookies.get("auth-token");
  console.log(isAuth);

  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      // return <Navigate to="/auth/sign-up" />;
    } else {
      // return <Outlet />;
    }
    return children;
  };

  return (
    <>
      <div className="wrapper relative">
        <Suspense fallback="Loading...">
          <Routes>
            <Route path="/auth/sign-up" element={<RegisterForm />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/">
              <Route index element={<Navigate to="/home" />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="users" element="Users" />
              <Route path="users/:id" element="UsersDetails" />
            </Route>
          </Routes>
        </Suspense>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
