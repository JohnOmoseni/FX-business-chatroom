import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const FormGroup = ({
  type = "text",
  label,
  name,
  value,
  placeholder = "",
  Icon,
  errors,
  touched,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
    inputRef.current.type = showPassword ? "password" : "text";
  };

  return (
    <div
      className={`w-full group ${
        errors[name] && touched[name] ? "is-error" : ""
      }`}
    >
      <label
        htmlFor={name}
        className="text-sm mb-1 inline-block tracking-wider text-shadow"
      >
        {label}
        {name === "file" && <img src="" alt="" />}
      </label>
      {name === "file" ? (
        <input id={name} type={type} name={name} className="hidden" />
      ) : (
        <>
          <div
            className={`${
              errors[name] && touched[name]
                ? "border-pink-400 bg-pink-100"
                : "border-grey-400 bg-green-100"
            } px-3 relative rounded-md shadow-sm border border-solid  form-group w-full flex-row gap-2 !justify-start`}
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
                  onChange={onChange}
                  className="peer w-full py-2.5 i-reset placeholder:text-base"
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
                  <span className="items-start leading-none align-middle icon">
                    <Icon size={16} fill="#888" />
                  </span>

                  <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="w-full py-2.5 i-reset placeholder:text-base"
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
