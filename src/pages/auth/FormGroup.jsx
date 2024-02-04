import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import gallery from "@icons/gallery.svg";

export const FormGroup = ({
  type = "text",
  required,
  label,
  name,
  value,
  fileRef,
  placeholder = "",
  Icon,
  errors,
  touched,
  onBlur,
  onChange,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
    inputRef.current.type = showPassword ? "password" : "text";
  };

  return (
    <div
      className={`w-full group ${className} ${
        errors[name] && touched[name] ? "is-error" : ""
      }`}
    >
      {name === "file" ? (
        <label htmlFor={name} className="flex-column gap-3">
          <span
            className={`text-sm relative inline-block tracking-wider text-shadow`}
          >
            {label}
          </span>
          <div className="flex-row gap-2 px-1 pb-3 !justify-start cursor-pointer select-none">
            <div className="w-[26px]">
              <img src={gallery} alt="" />
            </div>
            <input
              ref={fileRef}
              id={name}
              type={type}
              name={name}
              placeholder="Add business logo"
              className="text-tiny i-reset tracking-wide file:rounded-md file:border-none file:px-3 file:py-1 file:font-semibold file:bg-green-200 hover:file:bg-green-300 file:transition-colors file:placeholder: text-neutral-600 cursor-pointer"
            />
          </div>
        </label>
      ) : (
        <>
          <label
            htmlFor={name}
            className={`text-sm relative mb-1 inline-block tracking-wider text-shadow after:absolute ${
              required && "after:content-['*']"
            } after:-top-[2px] after:-right-2 after:text-red-800 after:text-sm`}
          >
            {label}
          </label>
          <div
            className={`${
              errors[name] && touched[name]
                ? "border-pink-400 bg-pink-100"
                : "border-grey-400 bg-green-100"
            } px-3 relative rounded-md shadow-sm border border-solid  form-group w-full flex-row gap-2 !justify-start align-middle`}
          >
            {type === "password" ? (
              <>
                <input
                  ref={inputRef}
                  type={type}
                  id={name}
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChange={onChange}
                  className="peer w-full py-2.5 i-reset placeholder:text-sm md:placeholder:text-regular"
                />

                <span
                  className="peer-focus:visible absolute center right-3"
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} fill="#888" />
                  ) : (
                    <FaEye size={16} fill="#888" />
                  )}
                </span>
              </>
            ) : (
              Icon && (
                <>
                  <span className="items-start leading-none icon pt-[1px]">
                    <Icon size={16} fill="#888" />
                  </span>

                  <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full py-2.5 i-reset leading-none placeholder:text-sm md:placeholder:text-regular"
                  />
                </>
              )
            )}
          </div>
          <p className="mt-1 ml-1 hidden group-[.is-error]:block text-pink-600 font-semibold text-tiny tracking-wide">
            {errors[name]}
          </p>
        </>
      )}
    </div>
  );
};
