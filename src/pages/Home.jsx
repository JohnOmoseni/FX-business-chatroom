import { useEffect } from "react";
import LeftNav from "@components/SideNav/LeftNav";
import SideLayout from "@components/SideNav/SideLayout";
import Main from "@components/Main/Main";
import RightNav from "@components/SideNav/RightNav/RightNav";
import { auth, db } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { cookies } from "@constants/constants";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentuser } from "@redux/features/authUserSlice";
import { setScreenSize } from "@redux/features/appStateSlice";

function Home() {
  const { visiblePane, screenSize } = useSelector((state) => state.appState);
  const showRight = visiblePane?.showRightPane;
  const dispatch = useDispatch();
  const isAuth = cookies.get("auth-token");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user && isAuth) {
        // user is signed in
        const docSnap = await getDoc(doc(db, "users", user?.uid));
        dispatch(setCurrentuser(docSnap.data()));
        console.log(docSnap.data());
      } else {
        console.log("User is logged out");
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    const getScreenSize = () => {
      dispatch(setScreenSize(window?.innerWidth));
    };

    window.addEventListener("resize", getScreenSize);
    getScreenSize();

    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, []);

  return (
    <div
      className={`h-screen w-full sm:grid sm:grid-cols-sm md:grid-cols-main overflow-hidden`}
    >
      <SideLayout>
        <LeftNav />
      </SideLayout>

      {screenSize < 768 && visiblePane?.showChat ? (
        <Main />
      ) : (
        screenSize > 630 && <Main />
      )}

      {/* <Main /> */}

      {showRight && (
        <SideLayout right>
          <RightNav />
        </SideLayout>
      )}
    </div>
  );
}
export default Home;
