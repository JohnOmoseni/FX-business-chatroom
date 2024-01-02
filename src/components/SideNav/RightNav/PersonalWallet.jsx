import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineArrowBack, MdOutlineClose } from "react-icons/md";
import { faker } from "@faker-js/faker";
import Deposit from "@pages/payment/Deposit";
import Withdraw from "@pages/payment/Withdraw";
import SelectField from "./SelectField";
import Transactions from "./Transactions";
import { setAccountCurrency } from "@redux/features/fxSlice";
import {
  setCloseRightPane,
  setVisibleRightPane,
} from "@redux/features/appStateSlice";
import ReactModal from "react-modal";
import { ButtonVariant } from "../../Button";

ReactModal.setAppElement("#root");

const WalletHeader = ({ onClick }) => {
  const { currentUser } = useSelector((state) => state.authUser);
  const { currencies, currentAccount } = useSelector((state) => state.fxState);
  const dispatch = useDispatch();

  const listCurrencies = useMemo(() => {
    return currencies ? currencies?.map((curr) => curr.symbol) : [];
  }, [currencies]);

  const handleSelectChange = (value) => {
    const selectValue = value[0]?.value;
    dispatch(setAccountCurrency(selectValue));
    console.log(value);
  };

  return (
    <div className="w-full py-4 md:py-[4%] pl-1 pr-3 flex-row gap-6 !justify-between border-b border-solid border-br-light shadow-md">
      <div className="flex-row gap-1">
        <span
          onClick={onClick}
          className="icon p-1 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
        >
          <MdOutlineArrowBack color="black" size={18} />
        </span>
        <div className="relative w-[40px] max-w-[40px] h-[40px] rounded-[50%] border border-solid border-neutral-200 shadow-md">
          <img
            src={currentUser?.avatar ?? faker.image.avatar()}
            alt=""
            className="group-hover:scale-105 transition"
          />
        </div>
        <div className="px-2">
          <span className="text-xs  text-opacity-60 tracking-wider !block -mb-1">
            Hello,
          </span>
          <p className="text-xl font-semibold text-shadow tracking-tight font-kinn">
            {currentUser?.businessName ?? "Unknown"}
          </p>
        </div>
      </div>

      <SelectField
        list={listCurrencies}
        handleSelectChange={handleSelectChange}
        placeholder={currentAccount?.currency}
      />
    </div>
  );
};

function PersonalWallet() {
  const { currentAccount, userAccounts } = useSelector(
    (state) => state.fxState
  );
  const { screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [inputModal, setInputModal] = useState({ isModal: false, id: "" });

  const balance = useMemo(() => {
    const amount =
      typeof currentAccount?.balance === "string"
        ? currentAccount?.balance.split(".")
        : currentAccount?.balance;
    const sigNo = parseInt(amount?.[0]);
    const decimal = amount?.[1];

    return [sigNo, decimal];
  }, [currentAccount?.balance]);

  const handleBackArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "userProfile", val: true }));
    } else {
      dispatch(setCloseRightPane());
    }
  };

  return (
    <>
      <WalletHeader
        currency={currentAccount?.currency}
        onClick={handleBackArrowClick}
      />
      <div className="w-full h-full pt-3 overflow-y-auto">
        <div className="grid grid-cols-balance gap-4">
          <div className="bg-gradient-200 rounded-md"></div>
          <div className="rounded-md shadow-100 bg-neutral-100 px-3 pt-5 pb-6 mx-auto w-[100%]">
            <span className="text-xs text-neutral-300 text-opacity-60 tracking-wide ml-1 mb-1 text-gradient-200">
              Account Balance
            </span>
            <h2 className="whitespace-nowrap  text-4xl text-shadow text-gradient-100">
              <span className="text-3xl">{currentAccount?.currency}</span>
              {balance?.[0]}
              <span className="text-xl !text-neutral-400">.{balance?.[1]}</span>
            </h2>
          </div>
          <div className="bg-gradient-100 rounded-md"></div>
        </div>

        <div className="flex-row gap-4 my-14 px-4 mx-auto">
          <ButtonVariant
            title="Deposit"
            onClick={() =>
              setInputModal((prev) => ({ id: "deposit", isModal: true }))
            }
          />
          <ButtonVariant
            title="Withdraw"
            onClick={() =>
              setInputModal((prev) => ({ id: "withdraw", isModal: true }))
            }
          />
        </div>

        <Transactions />
      </div>

      <ReactModal
        isOpen={inputModal.isModal}
        onRequestClose={() =>
          setInputModal((prev) => ({ ...prev, isModal: false }))
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 999,
            backdropFilter: "1em",
          },
          content: {
            color: "black",
          },
        }}
      >
        {inputModal.id === "deposit" ? (
          <Deposit
            onCloseModal={() =>
              setInputModal((prev) => ({ ...prev, isModal: false }))
            }
          />
        ) : (
          <Withdraw
            onCloseModal={() =>
              setInputModal((prev) => ({ ...prev, isModal: false }))
            }
          />
        )}
        <div
          onClick={() => setInputModal((prev) => ({ ...prev, isModal: false }))}
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
export default PersonalWallet;
