// import { auth } from "../../../firebase-config.js";
import { useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { pageVariant } from "@utils";
import { registerSchema } from "@schema/validate";
import { FormGroup } from "./FormGroup";
import { FaUser } from "react-icons/fa";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import Button from "@components/Button";
import { Link } from "react-router-dom";

const onSubmit = (values, actions) => {
  console.log("Submitted", values, actions);
};

const Top = () => (
  <div>
    <h2 className="text-center px-3">Create your free account</h2>
    <p className="m-2 text-center text-sm">
      Our friendly team would love <br /> to hear from you.
    </p>
  </div>
);

function RegisterForm() {
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      businessName: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <motion.section
      className="w-full min-h-screen relative grid place-items-center"
      id="register"
      initial="hidden"
      animate="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="bg-inherit w-full max-w-[700px] mx-auto py-8 px-[4%] shadow-md rounded-md">
        <Top />

        <form
          onSubmit={handleSubmit}
          className="my-12 mx-auto w-[94%] max-w-[800px] flex-column gap-4"
        >
          <FormGroup
            name="name"
            label="Full name"
            value={values.name}
            placeholder="Your name"
            Icon={FaUser}
            errors={errors}
            touched={touched}
            onChange={handleChange}
          />
          <FormGroup
            name="businessName"
            label="Business name"
            value={values.businessName}
            placeholder="Your business name"
            Icon={AiFillLock}
            errors={errors}
            touched={touched}
            onChange={handleChange}
          />
          <FormGroup
            name="address"
            label="Business Address"
            value={values.address}
            placeholder="Your business address"
            Icon={FaUser}
            errors={errors}
            touched={touched}
            onChange={handleChange}
          />
          <FormGroup
            name="email"
            label="Email"
            value={values.email}
            placeholder="Enter email address"
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
          <FormGroup
            name="confirmPassword"
            label="Confirm password"
            type="password"
            value={values.confirmPassword}
            errors={errors}
            touched={touched}
            onChange={handleChange}
          />

          {/* <FormGroup name="file" label="Add a business logo" type="file" /> */}

          <Button
            type="submit"
            title="Submit"
            textGradient
            className="bg-green-400 font-kinn w-[90%] mx-auto mt-10 hover:bg-grad-100 hover:scale-[1.02]"
          />
        </form>
        <p className="my-4 px-2 text-sm text-neutral- text-center">
          By creating an account, you agree to the Terms of Service and Privacy
          policy
        </p>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/sign-in"
            className="text-green-600 mx-1 font-semibold relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:bg-green-400 after:w-[80%] after:mx-auto after:h-[2px]"
          >
            Log in
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

export default RegisterForm;
