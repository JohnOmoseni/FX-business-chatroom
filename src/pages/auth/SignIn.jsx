import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import { signInSchema } from "@schema/validate";
import { useFormik } from "formik";
import { FormGroup } from "./FormGroup";
import { motion } from "framer-motion";
import { cookies } from "@constants/constants";
import useAuthContext from "@context/AuthContext";
import Button from "@components/Button";
import logo from "@assets/images/logo.png";

import sectionbg from "@assets/images/section-bg (5).jpg";

const Top = () => (
  <div className="w-full self-center">
    <div className="w-[250px] p-3 mx-auto mb-4 drop-shadow-md">
      <img src={logo} alt="Osho Free" />
    </div>
    <h2 className="text-center text-shadow">Welcome back!</h2>
    <p className="text-center text-regular">Please login to your account.</p>
  </div>
);

const Error = ({ error }) => (
  <div className="w-max mx-auto mt-6 mb-4 drop-shadow-sm bg-rose-300 rounded-md py-2 px-6 text-shadow text-red-600">
    <p className="text-center text-regular capitalize">{error}</p>
  </div>
);

function SignIn() {
  const navigate = useNavigate();
  const { handleSignIn, setIsAuthenticated } = useAuthContext();
  const [error, setError] = useState("");

  const onSubmit = async (values) => {
    error && setError("");
    try {
      const res = await handleSignIn(values?.email, values?.password);
      if (res?.user) {
        cookies.set("auth-token", res.user.refreshToken);
        localStorage.setItem("auth-token", res.user.refreshToken);
        navigate("/home");
      }
    } catch (err) {
      console.error(err.message, "Something went wrong");
      if (err.message.includes("auth/invalid-login-credentials")) {
        // toast.error("Invalid login credentials", { position: "bottom-right" });
        setError("Invalid login credentials");
      } else if (err.message.includes("auth/network-request-failed")) {
        setError("Network Error");
      } else {
        setError("Something went wrong");
      }
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit,
    });

  return (
    <section
      className="w-full h-[100svh] relative md:grid grid-cols-2 overflow-hidden"
      id="login"
    >
      <div className="w-full hidden md:block h-screen self-stretch bg-green-300">
        <img src={sectionbg} alt="" className="h-full w-full" />
      </div>
      <div className="bg-inherit pt-[3rem] md:pt-[10%] pb-3 w-full h-full mx-auto px-[4%] shadow-md overflow-y-auto">
        <Top />

        <div className="w-full relative">
          {error && <Error error={error} />}
          <form
            onSubmit={handleSubmit}
            className="mt-10 mb-4 mx-auto w-[95%] flex-column gap-6"
          >
            <FormGroup
              name="email"
              label="Email"
              value={values.email}
              placeholder="example@gmail.com"
              Icon={AiOutlineMail}
              errors={errors}
              touched={touched}
              onChange={handleChange}
            />

            <FormGroup
              name="password"
              label="Password"
              type="password"
              value={values.password}
              errors={errors}
              touched={touched}
              onChange={handleChange}
            />

            <p className="w-full text-sm text-end -mt-3">
              <Link
                to="/auth/reset-password"
                className="transition hover:text-green-800 hover:scale-95 !underline"
              >
                Forgot Password?
              </Link>
            </p>

            <Button
              type="submit"
              title="Submit"
              disabled={isSubmitting}
              loadingText="Signing in"
              textGradient
              className="bg-gradient-100 font-kinn w-[80%] flex-row mx-auto mt-6 md:mt-6 hover:bg-grad-100 hover:scale-[1.02]"
            />
          </form>
          <div>
            <p className="text-sm my-2 text-center flex-row">
              Don’t have an account?
              <Link
                to="/auth/sign-up"
                className="px-1 !text-green-500 !underline transition-100 hover:text-green-800 hover:scale-95"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
