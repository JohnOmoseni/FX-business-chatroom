import { auth, provider } from "@firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();
console.log(`Cookie constructor: ${cookies}`);

function GoogleAuth() {
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(`Signin result: ${res}`);
      cookies.set("auth-token", res.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  return <div onClick={signInWithGoogle}>GoogleAuth</div>;
}
export default GoogleAuth;
