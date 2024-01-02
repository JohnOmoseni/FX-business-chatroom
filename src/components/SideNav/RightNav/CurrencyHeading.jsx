import { useDispatch, useSelector } from "react-redux";
import SelectField from "./SelectField";
import { setBaseCurrency } from "@redux/features/fxSlice";

function CurrencyHeading() {
  const { currencies, baseCurrency } = useSelector((state) => state.fxState);

  const dispatch = useDispatch();
  const listCurrencies =
    currencies.length > 0 ? currencies?.map((curr) => curr.symbol) : [];

  const handleSelectChange = (value) => {
    const selectValue = value[0]?.value;
    dispatch(setBaseCurrency(selectValue));
  };

  return (
    <div className="currency-header px-3 flex-row gap-3 !justify-between mb-3">
      <p className="text-base text-shadow leading-5">Select a base currency</p>
      <SelectField
        list={listCurrencies}
        handleSelectChange={handleSelectChange}
        placeholder={baseCurrency}
      />
    </div>
  );
}
export default CurrencyHeading;
