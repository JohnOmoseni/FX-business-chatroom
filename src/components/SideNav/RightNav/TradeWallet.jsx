import { useDispatch, useSelector } from "react-redux";
import { CiAirportSign1 } from "react-icons/ci";
import ListRow from "../../ListRow";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import { MdOutlineArrowBack } from "react-icons/md";
import {
  setCloseRightPane,
  setVisibleRightPane,
} from "@redux/features/appStateSlice";

const from = {
  avatar: "",
  businessName: "Eniola Perf",
  amount: "1.802.00",
  currency: "USD",
};

const WalletHeader = ({ onClick, currrencyPair }) => (
  <div className="w-full py-4 md:py-[4%] pr-3 flex-row gap-4 !justify-between border-b border-solid border-br-light shadow-md">
    <div className="flex-row gap-3 !justify-start pl-3">
      <span
        onClick={onClick}
        className="icon p-1 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
      >
        <MdOutlineArrowBack color="black" size={18} />
      </span>

      <h3 className="text-xl flex-1 w-full text-shadow font-semibold text-[#444] leading-4">
        Transfer
      </h3>
    </div>
    <Dropdown
      menuClass="!p-1"
      menuBtn={() => (
        <>
          <span className="mr-2 leading-4 text-gradient-100">
            {currrencyPair}
          </span>
          <CiAirportSign1
            size={20}
            className="cursor-pointer mt-[2px]"
            color="black"
          />
        </>
      )}
    />
  </div>
);

const TransferReceipt = () => {
  return (
    <div>
      <div>
        <div className="relative min-w-[140px] h-[140px] md:min-w-[80px] md:h-[80px] rounded-[50%] border border-solid border-neutral-200 shadow-md">
          <img
            src={userProfile?.avatar ?? ""}
            alt=""
            className="group-hover:scale-105 transition"
          />
          <span
            className={`${
              isActive ? "bg-green-400" : "bg-[#888] "
            } absolute z-[100] bottom-[2px] right-[4px] w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
          ></span>
        </div>
        <div className="pr-3 text-center md:text-left">
          <h3 className="font-kinn mt-6 text-shadow text-gradient-100">
            Jenkins Wallace
          </h3>
          <span className="!text-[#555555] ">@Johnny</span>
        </div>

        <ul>
          <li>
            <span>You Send</span>
            <span> USD 50 </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

function TradeWallet() {
  const { user } = useSelector((state) => state.usersState);
  const {
    baseCurrency,
    selectedCurrency,
    currencies,
    agreedExchangedRate,
    amountToSend,
    currentAccount,
  } = useSelector((state) => state.fxState);
  const { screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const test = currencies?.reduce((arr, curr) => {
    if (
      curr.symbol.includes(selectedCurrency?.symbol) ||
      curr.symbol.includes(baseCurrency)
    ) {
      return [...arr, curr];
    }
    return arr;
  }, []);

  console.log(test);

  const handleSendMoney = () => {};

  const handleBackArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "currencyList", val: true }));
    } else {
      dispatch(setCloseRightPane());
    }
  };

  return (
    <>
      <WalletHeader
        onClick={handleBackArrowClick}
        currrencyPair={selectedCurrency?.pair}
      />
      <div className="w-full h-full overflow-y-auto">
        <ul className="w-full flex-column gap-4  py-6 px-4 md:px-[4%] mx-auto rounded-md border border-solid border-br-light shadow-md">
          {test.map((item, idx) => {
            const obj = {
              name: item.name,
              subtitle: item.symbol,
            };
            return (
              <ListRow
                obj={obj}
                key={idx}
                renderLastCol={() => (
                  <div className="text-center leading-5 justify-self-end">
                    {/* {selectedCurrency?.symbol} */}
                  </div>
                )}
              />
            );
          })}
        </ul>
        <div className="grid grid-rows-trade place-items-center min-h-[60%]">
          <p className="flex-column !items-center text-center gap-1 whitespace-nowrap text-5xl md:text-4xl text-shadow text-gradient-100">
            ${amountToSend}
            <span className="text-sm text-neutral-300 text-opacity-60 tracking-wide text-gradient-200">
              Amount to transfer
            </span>
            <span className="text-sm px-3 text-neutral-300 text-opacity-60 tracking-wide text-gradient-200">
              Your balance{" "}
              <span className="text-tiny font-semibold">{baseCurrency}</span>
              {currentAccount?.balance}(available)
            </span>
          </p>
          <p className="text-center px-4">
            <span>
              $0.30{" "}
              <span className="text-shadow font-semibold"> Oshofree fee </span>{" "}
              already included
            </span>
            <span>
              Exchange rate: 1 {baseCurrency} - {agreedExchangedRate}{" "}
              {selectedCurrency?.symbol}
            </span>
          </p>
        </div>

        <Button
          textGradient
          title="Send Money"
          className="flex-row mt-12 mb-4 w-[90%] mx-auto shadow-100"
        />
      </div>
    </>
  );
}
export default TradeWallet;
