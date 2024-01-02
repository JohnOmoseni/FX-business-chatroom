import Select from "react-dropdown-select";

function SelectField({ list, handleSelectChange, placeholder }) {
  const options = list?.map((item) => ({ label: item, value: item }));

  const handleClick = (value) => {
    handleSelectChange(value);
  };
  return (
    <Select
      name="select"
      options={options}
      searchable="true"
      placeholder={placeholder ?? "Select"}
      onChange={handleClick}
    />
  );
}
export default SelectField;
