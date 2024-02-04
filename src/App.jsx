import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm";
import SignIn from "./pages/auth/SignIn";
import LoaderBody from "./components/Loaders/LoaderBody";
import ReactModal from "react-modal";

const Home = React.lazy(() => import("./pages/Home"));
import { ProtectedRoute } from "./ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <>
      <div className="wrapper relative">
        <Suspense fallback={<LoaderBody />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<ProtectedRoute />} />

            <Route path="/auth/sign-up" element={<RegisterForm />} />
            <Route path="/auth/sign-in" element={<ProtectedRoute />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
