import Select from "react-dropdown-select";
import { useSelector } from "react-redux";

function SelectField({ list, handleSelectChange, placeholder }) {
  // const { currentAccount } = useSelector((state) => state.fxState);
  const options = list?.map((item) => ({ label: item, value: item }));

  const handleClick = (value) => {
    handleSelectChange(value);
  };
  return (
    <Select
      name="select"
      options={options}
      defaultValue={{
        value: "NGN",
        label: "NGN",
      }}
      onChange={handleClick}
    />
  );
}
export default SelectField;
