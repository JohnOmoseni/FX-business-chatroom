import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineArrowBack, MdOutlineClose } from "react-icons/md";
import { faker } from "@faker-js/faker";
import Deposit from "@pages/payment/Deposit";
import TestDeposit from "@pages/payment/TestDeposit";
import Withdraw from "@pages/payment/Withdraw";
import SelectField from "./SelectField";
import Transactions from "./Transactions";
import ReactModal from "react-modal";
import { ButtonVariant } from "../../Button";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import {
  setCloseRightPane,
  setVisibleRightPane,
} from "@redux/features/appStateSlice";
import {
  setAccounts,
  setCurrentAccount,
  setAccountCurrency,
  setTransactions,
} from "@redux/features/fxSlice";
import { toast } from "react-toastify";

const WalletHeader = ({
  currentUser,
  currentAccount,
  onClick,
  listCurrencies,
  handleSelectChange,
}) => (
  <div className="wallet w-full py-4 md:py-[4%] pl-1 pr-3 grid grid-cols-two gap-4 !justify-between border-b border-solid border-br-light shadow-md">
    <div className="flex-row gap-1">
      <span
        onClick={onClick}
        className="icon p-1 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
      >
        <MdOutlineArrowBack color="black" size={18} />
      </span>
      <div className="relative min-w-[40px] max-w-[40px] h-[40px] rounded-[50%] border border-solid border-neutral-200 shadow-md">
        <img
          src={currentUser?.avatar ?? faker.image.avatar()}
          alt=""
          className="group-hover:scale-105 transition"
        />
      </div>
      <div className="w-full px-1">
        <span className="text-xs  text-opacity-60 tracking-wider !block -mb-1">
          Hello,
        </span>
        <p className="text-lg sm:text-xl max-sm:mt-1 font-semibold text-shadow tracking-tight font-kinn truncate">
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

function PersonalWallet() {
  const { currentAccount, userAccounts, transactions, currencies } =
    useSelector((state) => state.fxState);
  const { screenSize } = useSelector((state) => state.appState);
  const { currentUser } = useSelector((state) => state.authUser);

  const [inputModal, setInputModal] = useState({ isModal: false, id: "" });
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAccounts = async () => {
      const unsub = onSnapshot(
        doc(db, "userAccounts", currentUser?.uid),
        (doc) => {
          if (doc.exists()) {
            dispatch(setAccounts(doc.data()?.userAccounts));
            dispatch(setCurrentAccount(doc.data()?.currentAccount));
            console.log("account event listener", doc.data());
          }
        }
      );
      const unsubTxs = onSnapshot(
        doc(db, "transactions", currentUser?.uid),
        (doc) => {
          doc.exists() && dispatch(setTransactions(doc.data()?.transactions));
        }
      );
      return () => {
        unsub();
        unsubTxs();
      };
    };
    currentUser?.uid && getUserAccounts();
  }, [currentUser?.uid]);

  useEffect(() => {
    const updateAccount = async () => {
      try {
        const res = await getDoc(doc(db, "userAccounts", currentUser?.uid));
        const accounts = res.data()?.userAccounts;

        const account = accounts.find(
          (acc) => acc.currency === selectedCurrency
        );
        if (account) {
          dispatch(setAccounts(account));
          await updateDoc(doc(db, "userAccounts", currentUser?.uid), {
            currentAccount: account,
          });
        } else {
          const newAccount = { balance: 0.0, currency: selectedCurrency };
          const account = userAccounts.find(
            (acc) => acc.currency === selectedCurrency
          );
          if (!account) {
            setAccounts(newAccount);
          } else {
            setCurrentAccount(newAccount);
          }
        }
      } catch (err) {
        console.log(err.message);
      } finally {
      }
    };

    currentUser && updateAccount();
  }, [currentAccount?.currency]);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(true);
    const handleOfflineStatus = () => setIsOnline(false);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  const listCurrencies = useMemo(() => {
    return currencies ? currencies?.map((curr) => curr.symbol) : [];
  }, []);

  const balance = useMemo(() => {
    const amount =
      typeof currentAccount?.balance === "string"
        ? currentAccount?.balance.split(".")
        : currentAccount?.balance;
    if (Array.isArray(amount)) {
      const sigNo = parseInt(amount?.[0]);
      const decimal = amount?.[1];
      return [sigNo, decimal];
    }
    return amount;
  }, [currentAccount?.balance]);

  const handleBackArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "userProfile", val: true }));
    } else {
      dispatch(setCloseRightPane());
    }
  };

  const handleDeposit = () => {
    if (!isOnline) {
      toast.info("No internet connection");
      return;
    }
    setInputModal({ id: "deposit", isModal: true });
  };

  const handleSelectChange = (value) => {
    const selectValue = value[0]?.value;
    setSelectedCurrency(selectValue);
  };

  return (
    <>
      <WalletHeader
        currency={currentAccount?.currency}
        onClick={handleBackArrowClick}
        currentUser={currentUser}
        currentAccount={currentAccount}
        listCurrencies={listCurrencies}
        handleSelectChange={handleSelectChange}
      />
      <div className="w-full h-full py-3 overflow-y-auto">
        <div className="grid grid-cols-balance gap-4">
          <div className="bg-gradient-100 rounded-md"></div>
          <div className="rounded-md shadow-100 bg-neutral-100 px-3 pt-5 pb-6 mx-auto w-[100%]">
            <span className="text-xs text-neutral-300 text-opacity-60 tracking-wide ml-1 mb-1 text-gradient-200">
              Account Balance
            </span>
            <h2 className="whitespace-nowrap  text-4xl text-shadow text-gradient-100">
              <span className="text-3xl">{currentAccount?.currency}</span>
              {Array.isArray(balance) ? balance?.[0] : balance}
              <span className="text-xl !text-neutral-400">
                {Array.isArray(balance) ? `.${balance?.[1]}` : ""}
              </span>
            </h2>
          </div>
          <div className="bg-gradient-100 rounded-md"></div>
        </div>

        <div className="flex-row gap-4 mt-14 mb-16 px-4 mx-auto">
          <ButtonVariant title="Deposit" onClick={handleDeposit} />
          <ButtonVariant
            title="Withdraw"
            onClick={() => setInputModal({ id: "withdraw", isModal: true })}
          />
        </div>

        <Transactions transactions={transactions} />
      </div>

      <ReactModal
        isOpen={inputModal.isModal}
        contentLabel="Input Modal"
        onRequestClose={() =>
          setInputModal((prev) => ({ ...prev, isModal: false }))
        }
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
        {inputModal.id === "deposit" ? (
          <TestDeposit
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
          className="group absolute icon right-2 top-2"
          title="close-modal"
        >
          <MdOutlineClose
            size={22}
            className="text-gray-500 icon group-hover:text-black group-hover:scale-95 transition-colors"
          />
        </div>
      </ReactModal>
    </>
  );
}
export default PersonalWallet;
