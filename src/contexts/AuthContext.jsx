import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { cookies } from "@constants/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "@redux/features/authUserSlice";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				// user is signed in
				setIsAuthenticated(true);
				// dispatch(setIsAuth("true"));
				console.log("user is logged in");
			} else {
				setIsAuthenticated(false);
				// dispatch(setIsAuth("false"));

				console.log("User is logged out");
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const handleSignIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		const res = window.confirm("Do you wanna sign out?");
		if (res) {
			try {
				// user clicked OK
				cookies.remove("auth-token");
				localStorage.removeItem("auth-token");
				signOut(auth);
				navigate("/auth/sign-in");
			} catch (err) {
				console.log(err.message, "Error logging out");
			}
		} else {
			return;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				createUser,
				handleSignIn,
				logOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context)
		throw new Error("useAuthContext must be used within the AuthContext");

	return context;
}
