import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "./SelectField";
import useFetchCurrencies from "@hooks/useFetchCurrencies";
import { setBaseCurrency } from "@redux/features/fxSlice";
import { setCurrencies } from "@redux/features/fxSlice";

function CurrencyHeading() {
  const [currencies] = useFetchCurrencies();
  const [listCurrencies, setListCurrencies] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currencies) {
      const currenciesObj = Object.entries(currencies)?.map((curr) => ({
        name: curr[1],
        symbol: curr[0],
      }));
      setListCurrencies([...Object.keys(currencies)]);
      dispatch(setCurrencies(currenciesObj));
    }
  }, [currencies]);

  const handleSelectChange = (value) => {
    const selectValue = value[0]?.value;
    dispatch(setBaseCurrency(selectValue));
    console.log(value);
  };
  return (
    <div className="currency-header px-3 flex-row gap-3 !justify-between mb-3">
      <p className="text-base text-shadow leading-5">Select a base currency</p>
      <SelectField
        list={listCurrencies}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
}
export default CurrencyHeading;
