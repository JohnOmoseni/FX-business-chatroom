import { useEffect } from "react";
import LeftNav from "@components/SideNav/LeftNav";
import SideLayout from "@components/SideNav/SideLayout";
import Main from "@components/Main/Main";
import RightNav from "@components/SideNav/RightNav/RightNav";
import { auth, db } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { cookies } from "@constants/constants";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentuser } from "@redux/features/authUserSlice";

function Home() {
  const dispatch = useDispatch();
  const isAuth = cookies.get("auth-token");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      console.log(`User Cred: ${user}`);
      if (user && isAuth) {
        // user is signed in
        console.log("User is logged in", user);
        const docSnap = await getDoc(doc(db, "users", user?.uid));
        dispatch(setCurrentuser(docSnap.data()));
        console.log(docSnap.data());
      } else {
        // user is signed out
        console.log("User is logged out");
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="h-screen grid grid-cols-sm md:grid-cols-main overflow-hidden">
      <SideLayout left>
        <LeftNav />
      </SideLayout>

      <Main />

      <SideLayout right>
        <RightNav />
      </SideLayout>
    </div>
  );
}
export default Home;
