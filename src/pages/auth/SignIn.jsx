import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import logo from "@assets/images/app-logo.png";
import { signInSchema } from "@schema/validate";
import { useFormik } from "formik";
import { FormGroup } from "./FormGroup";
import Button from "@components/Button";
import { motion } from "framer-motion";

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

function SignIn({ setIsAuth }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (values, actions) => {
    console.log("Submitted", values, actions);
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
    <motion.section
      className="w-full h-screen relative md:grid grid-cols-2 overflow-hidden"
      id="login"
      initial="hidden"
      animate="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full hidden md:block h-screen self-stretch bg-green-300">
        <img src={sectionbg} alt="" className="h-full w-full" />
      </div>
      <div className="bg-inherit pt-[3rem] md:pt-[10%] pb-3 w-full h-full mx-auto px-[4%] shadow-md overflow-y-auto">
        <Top />

        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="mt-10 mb-4 mx-auto w-[95%]  flex-column gap-6"
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
            <Button
              type="submit"
              title="Submit"
              textGradient
              className="bg-gradient-100 font-kinn w-[80%] flex-row mx-auto mt-8 md:mt-12 hover:bg-grad-100 hover:scale-[1.02]"
            />
          </form>
          <p className="text-sm my-2 text-center flex-row">
            Don’t have an account?
            <Link
              to="/auth/sign-up"
              className="px-1 !text-green-500 transition-100 hover:text-green-800 hover:scale-95"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="w-full mt-8 mb-2">
          <div className="flex-row gap-3">
            <hr className="w-[50%] shadow-sm border border-solid border-br-light bg-br-light " />
            <span className="text-base font-kinn font-extrabold text-shadow">
              Or
            </span>
            <hr className="w-[50%] shadow-sm border border-solid border-br-light bg-br-light" />
          </div>
          <button className="w-[60%] flex mx-auto my-4 py-2 px-3 flex-row gap-3 border border-solid border-br-light rounded-md shadow-sm leading-5 min-w-[20ch] text-regular">
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default SignIn;
