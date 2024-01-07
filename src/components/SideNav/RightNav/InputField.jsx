const inputClassName = `w-full i-reset px-2 py-1 relative rounded-sm text-end shadow-sm border !border-solid border-br-light  placeholder:text-base placeholder:text-neutral-500`;

function InputField({
  refName,
  type = "number",
  placeholder = "",
  value,
  onChange,
  readOnly = false,
  className,
}) {
  return (
    <input
      ref={refName && refName}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      readOnly={readOnly}
      className={`${inputClassName} ${className}`}
    />
  );
}

export default InputField;
