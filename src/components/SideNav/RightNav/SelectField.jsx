import Select from "react-dropdown-select";
import { useSelector } from "react-redux";

function SelectField({ list, handleSelectChange }) {
  const { baseCurrency } = useSelector((state) => state.fxState);
  const options = list?.map((item) => ({ label: item, value: item }));

  const handleClick = (value) => {
    handleSelectChange(value);
  };
  return (
    <Select
      name="select"
      options={options}
      searchable="true"
      placeholder={baseCurrency ? baseCurrency : "Select"}
      onChange={handleClick}
    />
  );
}
export default SelectField;
