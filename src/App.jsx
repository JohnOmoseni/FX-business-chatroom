import { cookies } from "@constants/constants";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase-config";
import { Routes, Route } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm";
import Home from "./pages/Home";

console.log(auth);

function App() {
  // const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  return (
    <div className="wrapper relative">
      <Routes>
        <Route path="/sign-up" element={<RegisterForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
