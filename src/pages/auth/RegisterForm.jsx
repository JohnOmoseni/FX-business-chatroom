import { useEffect, useRef, useState } from "react";
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
import { db, storage } from "../../config/firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { cookies } from "@constants/constants";
import logo from "@assets/images/logo.png";
import sectionbg from "@assets/images/section-bg (4).png";
import { toast } from "react-toastify";
import useAuthContext from "@context/AuthContext";
import { v4 as uuid } from "uuid";
import { setAccounts } from "@redux/features/fxSlice";
import PhoneNoInput from "./PhoneNoInput";

const Top = () => (
  <div>
    <div className="w-[250px] p-3 mx-auto mb-6 drop-shadow-md">
      <img src={logo} alt="Osho Free" />
    </div>
    <h2 className="text-center tracking-tight md:text-3xl px-3 leading-tight text-shadow">
      Create your free <br />
      account
    </h2>
    <p className="m-2 text-center text-base">
      Our friendly team would love <br /> to hear from you.
    </p>
  </div>
);

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { createUser, setIsAuthenticated } = useAuthContext();
  const [preview, setPreview] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmit = async (values, actions) => {
    const file = fileRef.current.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader?.result);
    };

    file && fileReader?.readAsDataURL(file);

    try {
      const res = await createUser(values.email, values.password);
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
              displayName: values.firstName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              avatar: downloadURL,
              fullName: `${values?.firstName} ${values?.lastName}`,
              businessName: values?.businessName,
              phoneNo: phoneNumber ? `+${phoneNumber}` : "",
              country: values?.country,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});

            await setDoc(doc(db, "userAccounts", res.user.uid), {
              id: uuid(),
              uid: res.user.uid,
              userAccounts: [{ balance: 0, currency: "NGN" }],
              currentAccount: { balance: 0, currency: "NGN" },
            });

            await setDoc(doc(db, "transactions", res.user.uid), {
              transactions: [],
            });

            dispatch(setAccounts({ balance: 0, currency: "NGN" }));
            dispatch(
              setCurrentuser({
                uid: res.user.uid,
                displayName: values.firstName,
                email: values.email,
                avatar: downloadURL,
                fullName: `${values?.firstName} ${values?.lastName}`,
                businessName: values?.businessName,
                phoneNo: phoneNumber ? `+${phoneNumber}` : "",
                country: values?.country,
              })
            );
            cookies.set("auth-token", res.user.refreshToken);
            setIsAuthenticated(true);
            localStorage.setItem("auth-token", res.user.refreshToken);

            toast.success("Registration successful");
            navigate("/home");
          });
        }
      );
    } catch (err) {
      console.log(err.message, "Something went wrong");
      if (err.message.includes("(auth/email-already-in-use)")) {
        toast.error("Email already in use");
      } else {
        toast.error("Something went wrong");
      }
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
      businessName: "",
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <motion.section
      className="w-full md:h-screen relative flex-column md:grid md:justify-center grid-cols-auth overflow-hidden max-sm:gap-8"
      id="register"
      initial="hidden"
      animate="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full hidden md:block h-screen bg-green-300">
        <img src={sectionbg} alt="" className="h-full w-full" />
      </div>
      <div className="bg-inherit h-full pt-[10%] pb-6 w-full mx-auto px-[4%] md:shadow-md overflow-y-auto">
        <Top />

        <form
          onSubmit={handleSubmit}
          className="mt-12 mb-8 mx-auto w-[94%] flex-column gap-6"
        >
          <FormGroup
            name="businessName"
            label="Business Name"
            required
            value={values.businessName}
            placeholder="Your business name"
            Icon={AiFillLock}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="w-full flex-row gap-4">
            <FormGroup
              name="firstName"
              label="First Name"
              required
              value={values.firstName}
              placeholder="First name"
              Icon={FaUser}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormGroup
              name="lastName"
              label="Last Name"
              value={values.lastName}
              placeholder="Last name"
              Icon={FaUser}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="w-full flex-row gap-4">
            <PhoneNoInput
              required
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
            <FormGroup
              name="country"
              label="Country"
              value={values.country}
              placeholder="Your country"
              Icon={FaUser}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <FormGroup
            name="email"
            label="Email"
            required
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
            required
            placeholder="Your password"
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
            required
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

          {preview && (
            <div className="rounded-md w-[90%] mx-auto h-[140px] -mt-2">
              <img src={preview} alt="" />
            </div>
          )}

          <Button
            type="submit"
            title="Submit"
            textGradient
            disabled={isSubmitting}
            className="bg-green-400 font-kinn w-[80%] mx-auto mt-6 md:mt-8 transition-all  hover:bg-grad-100 hover:opacity-80 hover:scale-[1.02] translate-y-0 active:translate-y-1 active:origin-bottom active:scale-y-90"
          />
        </form>
        <p className="px-4 mx-auto max-w-[60ch] text-[0.8rem] text-neutral- text-center">
          By creating an account, you agree to the Terms of Service and Privacy
          policy
        </p>

        <p className="text-center mt-2 text-xs flex-row">
          Already have an account?{" "}
          <Link
            to="/auth/sign-in"
            className="text-green-600 mx-1 font-semibold relative transition-colors hover:scale-95 hover:text-green-600 after:absolute after:-bottom-1 after:left-0 after:right-0 after:bg-neutral-600 hover:after:bg-green-600 after:w-[30px] after:shadow-md after:mx-auto after:h-[2px]"
          >
            Log in
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

export default RegisterForm;
