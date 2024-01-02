import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm";
import SignIn from "./pages/auth/SignIn";
import LoaderBody from "./components/Loaders/LoaderBody";
import ReactModal from "react-modal";

const Home = React.lazy(() => import("./pages/Home"));
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <>
      <div className="wrapper relative">
        <Suspense fallback={<LoaderBody />}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/auth/sign-up" element={<RegisterForm />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
