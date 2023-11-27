import { useRef, useState } from "react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "@components/Button";
import { FormGroup } from "./FormGroup";
import { FaUser } from "react-icons/fa";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCurrentuser } from "@redux/features/authUserSlice";
import { registerSchema } from "@schema/validate";
import { auth, db, storage } from "../../config/firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { cookies } from "@constants/constants";

import sectionbg from "@assets/images/section-bg.png";
import { toast } from "react-toastify";

const Top = () => (
  <div>
    <h2 className="text-center px-3">Create your free account</h2>
    <p className="m-2 text-center text-sm">
      Our friendly team would love <br /> to hear from you.
    </p>
  </div>
);

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const onSubmit = async (values, actions) => {
    const file = fileRef.current.files[0];

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      console.log(res);
      // upload an image
      const storageRef = ref(storage, values?.businessName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          console.log(err, "Something went wrong");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(`File available at ${downloadURL}`);
            await updateProfile(res.user, {
              displayName: values.name,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: values.name,
              businessName: values?.businessName,
              address: values?.address,
              email: values.email,
              avatar: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            dispatch(
              setCurrentuser({
                uid: res.user.uid,
                displayName: res.user.displayName,
                email: values?.email,
                avatar: downloadURL,
                businessName: values?.businessName,
                address: values?.address,
              })
            );
            cookies.set("auth-token", res.user.refreshToken);
            navigate("/");
          });
        }
      );
    } catch (err) {
      console.log(err, "Something went wrong");
      toast.error("Something went wrong", {
        className: "font-poppins tracking-wide",
      });
    } finally {
      // actions.resetForm();
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
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
      className="w-full h-screen relative grid justify-center grid-cols-auth overflow-hidden"
      id="register"
      initial="hidden"
      animate="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full h-screen self-stretch bg-green-300">
        <img src={sectionbg} alt="" className="h-full w-full" />
      </div>
      <div className="bg-inherit pt-[10%] pb-6 w-full mx-auto px-[4%] shadow-md overflow-y-auto">
        <Top />

        <form
          onSubmit={handleSubmit}
          className="my-12 mx-auto w-[94%] flex-column gap-4"
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          <FormGroup
            name="password"
            label="Password"
            type="password"
            value={values.password}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormGroup
            name="confirmPassword"
            label="Confirm password"
            type="password"
            value={values.confirmPassword}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormGroup
            name="file"
            label="Add a business logo"
            type="file"
            fileRef={fileRef}
            errors={errors}
            touched={touched}
          />

          <Button
            type="submit"
            title="Submit"
            textGradient
            disabled={isSubmitting}
            className="bg-green-400 font-kinn w-[90%] mx-auto mt-10  transition-all hover:bg-grad-100 hover:opacity-80 hover:scale-[1.02] translate-y-0 active:translate-y-1 active:origin-bottom active:scale-y-90"
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
