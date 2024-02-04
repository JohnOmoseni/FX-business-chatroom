import { useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNoInput = ({ required, phoneNumber, setPhoneNumber }) => {
  const inputRef = useRef(null);
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className="group w-full">
      <label
        htmlFor="phoneNo"
        className={`text-sm relative mb-1 inline-block tracking-wider text-shadow after:absolute ${
          required && "after:content-['*']"
        } after:-top-[2px] after:-right-2 after:text-red-800 after:text-sm whitespace-nowrap`}
      >
        Phone Number
      </label>
      <div
        className={`${
          !valid
            ? "border-pink-400 bg-pink-100"
            : "border-grey-400 bg-green-100"
        } relative rounded-md shadow-sm border border-solid form-group w-full flex-row gap-2 !justify-start align-middle overflow-hidden`}
      >
        <PhoneInput
          country={"ng"}
          value={phoneNumber}
          onChange={handleChange}
          autoFormat={false}
          inputProps={{
            name: "phone",
            required: true,
            autoFocus: true,
          }}
        />
      </div>
      {!valid && (
        <p className="mt-1 ml-1 text-pink-600 font-semibold text-tiny tracking-wide">
          Please enter a valid phone number.
        </p>
      )}
    </div>
  );
};

export default PhoneNoInput;
