import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { signInSchema } from "@schema/validate";
import { useFormik } from "formik";
import { FormGroup } from "./FormGroup";
import Button from "@components/Button";
import { motion } from "framer-motion";

import sectionbg from "@assets/images/section-bg.png";

const Top = () => (
  <div className="w-full self-center">
    <h2 className="text-center">Welcome back!</h2>
    <p className="text-center">Please login to your account.</p>
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
      className="w-full h-screen relative grid grid-cols-auth overflow-hidden"
      id="login"
      initial="hidden"
      animate="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full h-screen self-stretch bg-green-300">
        <img src={sectionbg} alt="" className="h-full w-full" />
      </div>
      <div className="bg-inherit pt-[4rem] md:pt-[25%] pb-3 w-full h-full flex-column mx-auto px-[4%] shadow-md overflow-y-auto">
        <Top />

        <div className="flex-1 w-full">
          <form
            onSubmit={handleSubmit}
            className="mt-10 mb-4 mx-auto w-[96%] flex-column gap-6"
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
          <p className="text-sm text-center">
            Don’t have an account?
            <Link to="/auth/sign-up" className="px-1">
              Sign up
            </Link>
          </p>
        </div>

        <div className="w-full mt-8 mb-2">
          <div className="flex-row gap-3">
            <hr className="w-[50%] border border-solid border-br-light bg-br-light " />
            <span className="text-base font-kinn font-extrabold ">Or</span>
            <hr className="w-[50%] border border-solid border-br-light bg-br-light" />
          </div>
          <button className="w-[60%] flex mx-auto my-4 py-2 px-3 flex-row gap-3 border border-solid border-br-light rounded-md shadow-sm leading-5 min-w-[20ch]">
            <FcGoogle className="h-7 w-7" />
            Continue with Google
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default SignIn;
