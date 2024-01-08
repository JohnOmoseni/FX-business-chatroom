import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiAirportSign1 } from "react-icons/ci";
import ListRow from "../../ListRow";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import { MdOutlineArrowBack, MdOutlineClose } from "react-icons/md";
import {
  setCloseRightPane,
  setVisibleRightPane,
} from "@redux/features/appStateSlice";
import ReactModal from "react-modal";
import TransferReceipt from "./TransferReceipt";

const from = {
  avatar: "",
  businessName: "Eniola Perf",
  amount: "1.802.00",
  currency: "USD",
};

const WalletHeader = ({ onClick, currency }) => (
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
          <span className="mr-2 leading-4 text-gradient-100">{currency}</span>
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

function TradeWallet() {
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
  const [showTransferReceipt, setTransferReceipt] = useState(false);

  const test = currencies?.reduce((arr, curr) => {
    if (curr.symbol.includes(selectedCurrency?.symbol)) {
      return [curr, ...arr];
    } else if (curr.symbol.includes(baseCurrency)) {
      return [...arr, curr];
    }
    return arr;
  }, []);

  const handleBackArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "tradeWallet", val: false }));
    } else {
      dispatch(setCloseRightPane());
    }
  };

  return (
    <>
      <WalletHeader
        onClick={handleBackArrowClick}
        currency={currentAccount?.currency}
      />
      <div className="mx-3 mb-4 h-full overflow-y-auto">
        <ul className="flex-column gap-4 py-4 px-4 md:px-[4%] mx-auto rounded-md border border-solid border-br-light shadow-md">
          <p className="w-full font-semibold text-shadow text-center">
            Currency pair ({selectedCurrency?.pair})
          </p>
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
                    {idx === 0
                      ? selectedCurrency?.toAmount
                      : selectedCurrency?.fromAmount}
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
              <span className="text-tiny font-semibold">
                {currentAccount?.currency}
              </span>
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
          className="flex-row mt-12 mb-4 w-[90%] mx-auto shadow-100 bg-gradient-200"
          onClick={() => setTransferReceipt(true)}
        />
      </div>

      <ReactModal
        isOpen={showTransferReceipt}
        contentLabel="Receipt Modal"
        onRequestClose={() => setTransferReceipt(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 9999,
            backdropFilter: "1em",
          },
          content: {
            color: "black",
          },
        }}
      >
        <TransferReceipt setTransferReceipt={setTransferReceipt} />
        <div
          onClick={() => setTransferReceipt(false)}
          className="group absolute icon right-1.5 top-1.5"
          title="close-modal"
        >
          <MdOutlineClose
            size={22}
            className="text-gray-500 group-hover:text-black group-hover:scale-95 transition-colors"
          />
        </div>
      </ReactModal>
    </>
  );
}
export default TradeWallet;
