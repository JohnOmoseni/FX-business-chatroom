import { useRef, useState } from "react";
import { useFormik } from "formik";
import Button from "@components/Button";
import PaneHeading from "./PaneHeading";
import { FaUser } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { registerSchema } from "@schema/validate";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import gallery from "@icons/gallery.svg";
import { toast } from "react-toastify";
import { FormGroup } from "../../../pages/auth/FormGroup";
import { db, storage } from "../../../config/firebase-config";
import placeholderImg from "@assets/images/logo.png";

const currentUser = {
  uid: "",
  businessName: "Enny Perf",
  displayName: "Enny",
  lastName: "Gbadebo",
  avatar: "",
  phoneNo: "09012603169",
  country: "Nigeria",
};

function EditProfile({ setEditProfile }) {
  const { currentUser, isActive } = useSelector((state) => state.authUser);
  const {
    businessName = "",
    displayName = "",
    lastName = "",
    avatar = "",
    phoneNo = "",
    country = "",
  } = currentUser;
  const [preview, setPreview] = useState(avatar);
  const [fileInput, setFileInput] = useState("");
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const testSubmit = (e) => {
    e.preventDefault();
    console.log("Running", fileInput);
  };

  const onSubmit = async (values, actions) => {
    e.preventDefault();
    console.log(values, "Running", fileInput);

    if (fileInput) {
      const storageRef = ref(storage, fileInput);
      const uploadTask = uploadBytesResumable(storageRef, fileInput);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          console.log(err.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(`File available at ${downloadURL}`);
            await updateDoc(doc(db, "users", currentUser?.uid), {
              ...values,
              avatar: downloadURL,
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "users", currentUser?.uid), {
        ...values,
      });
    }

    setEditProfile(false);
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
      businessName: businessName ?? "",
      firstName: displayName ?? "",
      lastName: lastName ?? "",
      phoneNo: phoneNo ?? "",
      country: country ?? "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log(file, "running");
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPreview(fileReader?.result);
    };
    file && fileReader?.readAsDataURL(file);
    setFileInput(file);
  };

  return (
    <>
      <PaneHeading
        title="Edit Profile"
        onClick={() => setEditProfile(false)}
        isVisible
      />
      <section
        className="w-full h-100dvh relative pt-3 overflow-y-auto"
        id="editProfile"
      >
        <div className="group relative w-[140px] h-[140px] mx-auto md:w-[100px] md:h-[100px] rounded-[50%] border border-solid border-neutral-200 shadow-md grid place-items-center">
          <img
            src={preview ? preview : placeholderImg}
            alt=""
            className="group-hover:scale-105 transition-100 hover:drop-shadow-md"
          />
          <span
            className={
              "absolute z-20 bottom-[2px] p-1 right-[4px] w-[30px] h-[30px] rounded-[50%] shadow-sm bg-green-100 border border-solid border-neutral-300"
            }
          >
            <label htmlFor="file" className="cursor-pointer select-none">
              <img src={gallery} alt="" className="w-[26px]" />
              <input
                ref={fileRef}
                id="file"
                type="file"
                name="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </span>
        </div>
        <div className="bg-inherit flex-1 w-full pt-[10%] pb-6 px-[6%] shadow-sm overflow-y-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full flex-column mt-6 gap-6"
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
            <FormGroup
              name="phoneNo"
              label="Phone Number"
              required
              value={values.phoneNo}
              placeholder="Your phone number"
              Icon={FaUser}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
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

            <Button
              type="submit"
              title="Save"
              textGradient
              className="bg-green-400 font-kinn w-[80%] mx-auto mt-6 md:mt-8 transition-all  hover:bg-grad-100 hover:opacity-80 hover:scale-[1.02] translate-y-0 active:translate-y-1 active:origin-bottom active:scale-y-90"
            />
          </form>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
