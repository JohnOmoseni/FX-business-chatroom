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

const transaction = {
  currencySent: "",
  currencyReceived: "",
  amountSent: "USD 50",
  amountReceived: "USD 50",
  exchangeRate: "",
  timestamp: "",
  receiver: "",
  fx: "USD/NGN",
};

const WalletHeader = ({ onClick }) => (
  <div className="w-full py-[4%] pr-3 flex-row gap-4 !justify-between border-b border-solid border-br-light shadow-md">
    <div className="flex-row gap-3 !justify-start pl-3">
      <span
        onClick={onClick}
        className="icon p-2 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
      >
        <MdOutlineArrowBack color="black" size={18} />
      </span>

      <h3 className="text-xl flex-1 w-full text-shadow font-semibold text-[#444]">
        Transfer
      </h3>
    </div>
    <Dropdown
      menuBtn={() => (
        <>
          <span className="mr-2 leading-4">Currency pair</span>
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
  const { currentUser: userProfile, isActive } = useSelector(
    (state) => state.authUser
  );
  const { screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const handleSendMoney = () => {};

  const handleArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "userProfile", val: true }));
    } else {
      dispatch(setCloseRightPane());
    }
  };

  return (
    <>
      <WalletHeader onClick={handleArrowClick} />
      <div className="w-full h-full overflow-y-auto">
        <div className="flex-column gap-4 w-[90%] py-6 px-[4%] mx-auto rounded-md shadow-sm">
          <ListRow
            renderColumn={() => (
              <div className="text-center leading-5">Some text</div>
            )}
          />
          <ListRow
            renderColumn={() => (
              <div className="text-center leading-5">Some text</div>
            )}
          />
        </div>
        <div className="grid grid-rows-trade place-items-center min-h-[60%]">
          <p className="flex-column !items-center text-center gap-1 whitespace-nowrap md:text-4xl text-shadow text-gradient-100">
            $40.00
            <span className="text-sm text-neutral-300 text-opacity-60 tracking-wide text-gradient-200">
              Amount to transfer
            </span>
            <span className="text-sm text-neutral-300 text-opacity-60 tracking-wide text-gradient-200">
              Your balance $8,320.50(available)
            </span>
          </p>
          <p className="text-center px-4">
            <span>$0.30 TransferWise fee already included</span>
            <span>Exchange rate: 1 EUR - 1,165 USD</span>
          </p>
        </div>

        <Button
          title="Send Money"
          className="flex-row mt-12 mb-4 w-[90%] mx-auto shadow-100"
        />
      </div>
    </>
  );
}
export default TradeWallet;
