import { useEffect } from "react";
// import { getAuth } from "firebase/auth";
import LeftNav from "@components/SideNav/LeftNav";
import SideLayout from "@components/SideNav/SideLayout";
import Main from "@components/Main/Main";
import RightNav from "@components/SideNav/RightNav";

function Home() {
  // useEffect(() => {
  //   const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
  //     console.log(`User Cred: ${user}`);
  //     if (user) {
  //       // user is signed in
  //       const uid = user.id;
  //     } else {
  //       // user is signed out
  //       console.log("User is logged out");
  //     }
  //   });
  //   return () => {
  //     unsubscribeAuth();
  //   };
  // }, []);

  return (
    <div className="h-screen grid grid-cols-main overflow-hidden">
      <SideLayout>
        <LeftNav />
      </SideLayout>

      <Main />

      <SideLayout>
        <RightNav />
      </SideLayout>
    </div>
  );
}
export default Home;
