import { MdOutlineArrowBack } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./InputField";
import { MdOutlineCompareArrows } from "react-icons/md";
import Button from "../../Button";
import { setAgreedExchangeRate } from "@redux/features/fxSlice";
import { setVisibleRightPane } from "@redux/features/appStateSlice";
import { toast } from "react-toastify";
import { setAmontToSend } from "../../../../redux/features/fxSlice";

const Header = ({ onClick }) => (
  <div className="w-full pt-6 pb-4 px-[2%] flex-row gap-4 !justify-start opacity-80 shadow-md">
    <div
      onClick={onClick}
      className="icon absolute p-2 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
    >
      <MdOutlineArrowBack color="black" size={18} />
    </div>

    <h3 className="flex-2 w-full font-kinn text-center text-[#444] text-shadow">
      Conversion
    </h3>
  </div>
);

const CurrencyRow = ({
  label,
  selectCurrency,
  render,
  onInputChange,
  readOnly,
}) => {
  return (
    <div>
      <span className="text-sm mb-1 font-semibold tracking-wide capitalize">
        {label}
      </span>
      <div className="flex-row gap-2">
        <img
          src=""
          alt=""
          className="relative min-w-[30px] max-w-[30px] h-[30px] !rounded-[50%] border border-solid border-neutral-200 group-hover:scale-105 transition overflow-hidden"
        />
        <InputField
          type="text"
          value={selectCurrency}
          onChange={onInputChange}
          readOnly={readOnly}
          className="!text-neutral-400"
        />
        {render && render()}
      </div>
    </div>
  );
};

function Conversion({ setShowConversionPane }) {
  const { baseCurrency, selectedCurrency } = useSelector(
    (state) => state.fxState
  );
  const dispatch = useDispatch();
  const [fromCurrency, setFromCurrency] = useState(baseCurrency);
  const [toCurrency, setToCurrency] = useState(selectedCurrency?.symbol);
  const [exchangeRate, setExchangeRate] = useState("");
  const [isSetExchangeRate, setIsSetExchangeRate] = useState(false);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const inputRef = useRef();
  const inputRateRef = useRef();

  useEffect(() => {
    if (inputRef?.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    setIsSetExchangeRate(false);
  }, [exchangeRate]);

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  const handleSetExchangeRate = () => {
    if (exchangeRate) {
      setIsSetExchangeRate(true);
      dispatch(setAgreedExchangeRate(exchangeRate));
    } else {
      inputRateRef?.current?.focus();
      toast.info("Set exchange rate", {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 2000,
        className: "font-poppins tracking-wide text-sm",
      });
    }
  };

  const handleExchangeRate = () => {
    if (amount) {
      setShowConversionPane(false);
      dispatch(setAmontToSend(amount));
      dispatch(setVisibleRightPane({ id: "tradeWallet", val: true }));
    }
  };

  console.log(selectedCurrency, fromAmount, toAmount);

  return (
    <>
      <Header onClick={() => setShowConversionPane(false)} />
      <div className="my-3 overflow-y-auto">
        <h3 className="text-center text-lg text-shadow font-kinn tracking-widest">
          {selectedCurrency?.pair}
        </h3>
        <div className="p-2 pr-3 m-3 flex-column gap-3 bg-slate-50 bg-opacity-40 rounded-md shadow-md border border-solid border-br-light opacity-80">
          <CurrencyRow
            label="Base currency"
            selectCurrency={fromCurrency}
            readOnly={true}
            render={() => (
              <InputField type="number" value={1} readOnly={true} />
            )}
          />

          <span className="self-center">
            <MdOutlineCompareArrows size={26} color="#999" />
          </span>

          <CurrencyRow
            label="To currency"
            selectCurrency={toCurrency}
            readOnly={true}
            render={() => (
              <InputField
                type="number"
                value={selectedCurrency?.rate}
                name="rate"
                readOnly="true"
              />
            )}
          />
        </div>

        <div className="flex-column gap-3 mx-4 my-6">
          <div className="flex-row gap-3">
            <span className="text-base text-shadow font-kinn leading-4 tracking-wider">
              Set Exchange Rate
            </span>
            <InputField
              refName={inputRateRef}
              type="number"
              value={exchangeRate}
              name="exchangeRate"
              onChange={(e) => setExchangeRate(e.target.value)}
              className="!px-1"
            />
          </div>

          <Button
            title="Set Rate"
            onClick={handleSetExchangeRate}
            className={`self-center text-sm whitespace-nowrap px-6 bg-emerald-600 bg-opacity-90 text-white`}
          />
        </div>

        {isSetExchangeRate && exchangeRate && (
          <>
            <div className="p-3 m-3 flex-column gap-2 bg-slate-50 bg-opacity-40 rounded-md shadow-md border border-solid border-br-light">
              <CurrencyRow
                label="From"
                selectCurrency={fromCurrency}
                readOnly={true}
                render={() => (
                  <InputField
                    refName={inputRef}
                    type="number"
                    name="rate"
                    value={fromAmount}
                    onChange={handleFromAmountChange}
                    className="w-full"
                  />
                )}
              />
              <span className="self-center mt-1">
                <MdOutlineCompareArrows size={22} color="#333" />
              </span>

              <CurrencyRow
                label="To"
                selectCurrency={toCurrency}
                readOnly={true}
                render={() => (
                  <InputField
                    type="number"
                    name="rate"
                    value={toAmount}
                    onChange={handleToAmountChange}
                    className="w-full"
                  />
                )}
              />
            </div>
            <Button
              title="Exchange"
              onClick={handleExchangeRate}
              className={`flex mx-auto my-4 text-sm whitespace-nowrap px-6 bg-emerald-600 bg-opacity-90 text-white`}
            />
          </>
        )}
      </div>
    </>
  );
}
export default Conversion;
