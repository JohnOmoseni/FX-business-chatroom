const inputClassName = `w-full i-reset px-2 py-1 relative rounded-sm text-end shadow-sm border !border-solid border-br-light  placeholder:text-base placeholder:text-neutral-500`;

function InputField({
  type = "text",
  refName,
  name = "",
  value,
  onChange,
  readOnly = false,
}) {
  return (
    <input
      ref={refName && refName}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`${inputClassName}`}
    />
  );
}

export default InputField;
