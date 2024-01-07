import { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import useFetchRates from "@hooks/useFetchRates";
import FxItem from "./FxItem";
import PaneHeading from "./PaneHeading";
import Loader from "@components/Loaders/Loader";
import Conversion from "./Conversion";
import CurrencyHeading from "./CurrencyHeading";
import { setSelectedCurrency } from "@redux/features/fxSlice";
import { useDispatch, useSelector } from "react-redux";

const Search = ({ search, onChange }) => (
  <div className="px-3 py-3 mb-3 mx-auto w-[93%] relative rounded-md shadow-sm border border-solid border-br-light">
    <span className="icon absolute center right-3 align-middle">
      <BiSearchAlt size={16} fill="#888" />
    </span>

    <input
      type="text"
      name="search"
      value={search}
      placeholder="Search..."
      onChange={onChange}
      className="w-full i-reset placeholder:text-base placeholder:text-neutral-500 pr-6"
    />
  </div>
);

function Currencies() {
  const { baseCurrency } = useSelector((state) => state.fxState);
  const dispatch = useDispatch();
  const [showConversionPane, setShowConversionPane] = useState(false);
  const [rates, isLoading, error] = useFetchRates();
  const [ratesArray, setRatesArray] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (rates) {
      const array = Object.entries(rates)?.map((obj) => {
        return { rate: obj[1], symbol: obj[0] };
      });
      setRatesArray(array);
    }
  }, [rates]);

  const setToInitialArray = () => {
    const array = Object.entries(rates)?.map((obj) => {
      return { rate: obj[1], symbol: obj[0] };
    });
    setRatesArray(array);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length === 0) {
      setToInitialArray;
    } else {
      filterCurrencies(value);
    }
  };

  const filterCurrencies = (value) => {
    const array = { ...rates };

    const results = [];
    for (const [key, rate] of Object.entries(array)) {
      if (key.toUpperCase().includes(value?.toUpperCase())) {
        results.push({ rate: rate, symbol: key });
      }
    }
    if (results.length > 0) {
      setRatesArray(results);
    } else {
      setToInitialArray();
    }
  };

  const handleCurrencyRow = (rate, symbol) => {
    const currencyPair = {
      rate,
      symbol,
      baseCurrency,
      pair: `${symbol}/${baseCurrency}`,
    };
    setShowConversionPane(true);
    dispatch(setSelectedCurrency(currencyPair));
  };

  return showConversionPane ? (
    <Conversion setShowConversionPane={setShowConversionPane} />
  ) : (
    <>
      <PaneHeading title="Currencies" isVisible />
      <div className="currencies w-full overflow-y-auto">
        <CurrencyHeading />

        <Search search={search} onChange={handleInputChange} />
        <div>
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : error ? (
            <div className="px-2 text-shadow w-full min-h-[60vh] leading-5 grid place-items-center bg-inherit text-neutral-600 text-center">
              There is no currency pair <br /> to show
            </div>
          ) : (
            ratesArray && (
              <ul className="flex-column gap-3 px-3 my-5">
                {ratesArray?.map(({ rate, symbol }, idx) => {
                  return (
                    <FxItem
                      key={idx}
                      fxRate={rate}
                      fxSymbol={symbol}
                      rates={rates}
                      onClick={handleCurrencyRow}
                    />
                  );
                })}
              </ul>
            )
          )}
        </div>
      </div>
    </>
  );
}
export default Currencies;
