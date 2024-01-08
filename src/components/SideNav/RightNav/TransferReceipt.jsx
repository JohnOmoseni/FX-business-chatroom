import { useSelector } from "react-redux";
import { ButtonVariant } from "../../Button";
import { v4 as uuid } from "uuid";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { setAccountBalance, setTransactions } from "@redux/features/fxSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const texts = ["You send", "They receive", "Will arrive on", "Exchange rate"];

function TransferReceipt({ setTransferReceipt }) {
  const { currentUser } = useSelector((state) => state.authUser);
  const { user } = useSelector((state) => state.usersState);
  const {
    baseCurrency,
    agreedExchangedRate,
    amountToSend,
    selectedCurrency,
    userAccounts,
    currentAccount,
  } = useSelector((state) => state.fxState);

  const handleTransfer = async () => {
    const senderCurrency = currentAccount.currency;
    const receiverCurrency = selectedCurrency?.symbol;

    if (!user.uid) {
      setTransferReceipt(false);
      toast.info("Select a recipient");
      return;
    }
    // if (currentAccount.balance < amountToSend) return;

    const senderAccount = userAccounts?.find(
      (account) => account.currency === senderCurrency
    );

    const res = await getDoc(doc(db, "userAccounts", user?.uid));
    const receiverAccount =
      res.exists() &&
      res
        .data()
        ?.userAccounts?.find(
          (account) => account.currency === receiverCurrency
        );

    console.log(res.data(), receiverAccount);
    const tx = {
      transactionId: uuid(),
      currencySent: selectedCurrency.baseCurrency,
      currencyReceived: selectedCurrency.symbol,
      chargedAmount: "",
      amount: amountToSend,
      txType: "FX",
      fx: selectedCurrency.pair,
      exchangeRate: selectedCurrency.rate,
      status: "pending",
      recipient: user?.uid,
      timestamp: Date.now(),
    };

    try {
      if (senderAccount) {
        const fullAmount = amountToSend + 100;
        const updatedBalance = parseInt(currentAccount.balance) - fullAmount;

        dispatch(setAccountBalance(updatedBalance));
      }
      if (receiverAccount) {
        const updatedBalance = parseInt(receiverAccount.balance) + amountToSend;
        const newUserAccounts = recipientAccounts?.userAccounts?.map((acc) => {
          if (acc.currency === selectedCurrency?.symbol) {
            acc.balance = updatedBalance;
          }
          return acc;
        });
        tx.status = "completed";
        await updateDoc(doc(db, "userAccounts", user?.uid), {
          userAccounts: newUserAccounts,
          [currentAccount + ".balance"]: updatedBalance,
        });
        await updateDoc(doc(db, "transactions", user?.uid), {
          transactions: arrayUnion(tx),
        });
      } else {
        setTransferReceipt(false);
        Swal.fire({
          icon: "info",
          titleText: "This user does not have an account",
          showDenyButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {});
      }
    } catch (err) {
      tx.status = "Failed transaction";
    }
    dispatch(setTransactions(tx));
  };

  return (
    <div className="grid place-items-center w-full h-full relative pt-3 overflow-y-auto">
      <section className="w-full absolute top-4">
        <div className="group relative min-w-[140px] max-w-[140px] h-[140px] mx-auto md:min-w-[100px] md:h-[100px] rounded-[50%] border border-solid border-neutral-200 shadow-md grid place-items-center overflow-hidden">
          <img
            src={user?.avatar}
            alt=""
            className="group-hover:scale-105 transition-100 hover:drop-shadow-md"
          />
        </div>
        <div className="my-6 px-2 text-center">
          <h3>{user?.businessName ?? "Unknown"}</h3>
          <span className="text-neutral-600">
            @{user?.displayName ?? "Unknown"}
          </span>
        </div>
        <ul className="w-full flex-column gap-4 my-4 mx-auto py-4 px-[6%] rounded-md shadow-sm">
          {texts?.map((txt, idx) => {
            let value;
            switch (idx) {
              case 0:
                value = `${baseCurrency}${amountToSend}`;
                break;
              case 1:
                value = `${selectedCurrency?.symbol}${selectedCurrency?.toAmount}`;
                break;
              case 2:
                value = "10 Jan 2023";
                break;
              case 3:
                value = agreedExchangedRate ?? "-";
                break;
              default:
                value = "";
            }
            return (
              <li key={idx} className="w-full flex-row !justify-between gap-3">
                <span className="capitalize text-neutral-600">{txt}</span>
                <span className="font-semibold">{value}</span>
              </li>
            );
          })}
        </ul>

        <ButtonVariant
          title="Transfer"
          onClick={handleTransfer}
          className="!mx-auto mt-6 mb-4"
        />
      </section>
    </div>
  );
}
export default TransferReceipt;
