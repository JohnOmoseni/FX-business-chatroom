import Select from "react-dropdown-select";
import { useSelector } from "react-redux";

function SelectField({ list, handleSelectChange, placeholder }) {
  const options = list?.map((item) => ({ label: item, value: item }));

  const handleClick = (value) => {
    handleSelectChange(value);
  };
  return (
    <Select
      name="select"
      options={options}
      placeholder={placeholder}
      onChange={handleClick}
    />
  );
}
export default SelectField;
