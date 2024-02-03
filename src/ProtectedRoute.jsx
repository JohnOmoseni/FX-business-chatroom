import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthContext from "@context/AuthContext";
import SignIn from "./pages/auth/SignIn.jsx";
import Home from "./pages/Home";

export const ProtectedRoute = ({ children }) => {
	let authToken = localStorage.getItem("auth-token");
	const { isAuthenticated } = useAuthContext();
	const location = useLocation();
	const path = location.pathname;

	console.log(isAuthenticated, Boolean(authToken), path);

	if (path === "/auth/sign-in") {
		return !isAuthenticated ? <SignIn /> : <Navigate to="/home" />;
	}

	if (path.includes("/home")) {
		return isAuthenticated ? <Home /> : <Navigate to="/auth/sign-in" />;
	}
	return <SignIn />;
};
