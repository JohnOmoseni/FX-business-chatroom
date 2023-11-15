import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@firebase";
import { toast } from "react-toastify";
import { signInSchema } from "@schema/validate";

const onSubmit = (values, actions) => {
  console.log("Submitted", values, actions);
};

const Top = () => (
  <div>
    <h2>Welcome back!</h2>
    <p className="">Please login to your account.</p>
  </div>
);

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = () => {};

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit,
  });

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      navigate("/");
      toast.success("Welcome");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="">
      <Top />
      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup
            name="email"
            label="Email"
            value={values.email}
            placeholder="example@gmail.com"
            Icon={FaEnvelope}
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
            className="bg-gradient-100 font-kinn w-full mx-auto mt-10 hover:bg-grad-100 hover:scale-[1.02]"
          />
        </form>
        <p className="">
          Don’t have an account?
          <Link to="/auth/sign-up" className="">
            Sign up
          </Link>
        </p>
      </div>

      <div>
        <div className="">
          <hr className="w-[142px] md:w-[237px] border border-solid border-br-light bg-br-light " />
          <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-br-light to-red-600">
            Or
          </span>
          <hr className="w-[142px] md:w-[237px] border border-solid border-br-light bg-br-light sm:w-[142px]" />
        </div>
        <button
          onClick={signInWithGoogle}
          className="w-full py-2 px-3 flex-row gap-3 border border-solid border-br-light rounded-md shadow-100"
        >
          <FcGoogle className="h-7 w-7" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;
