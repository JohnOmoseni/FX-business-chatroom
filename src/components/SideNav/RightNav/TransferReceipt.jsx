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
} from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { setAccountBalance, setTransactions } from "@redux/features/fxSlice";

const texts = ["You send", "They receive", "Will arrive on", "Exchange rate"];

function TransferReceipt() {
  const { currentUser } = useSelector((state) => state.authUser);
  const { user } = useSelector((state) => state.usersState);
  const {
    baseCurrency,
    agreedExchangeRate,
    amountToSend,
    selectedCurrency,
    userAccounts,
    currentAccount,
  } = useSelector((state) => state.fxState);

  const handleTransfer = async () => {
    const senderCurrency = currentAccount.currency;
    const receiverCurrency = selectedCurrency?.symbol;

    // if (currentAccount.balance < amountToSend) return;
    console.log(agreedExchangeRate);

    const senderAccount = userAccounts?.find(
      (account) => account.currency === senderCurrency
    );

    const q = query(
      collection(db, "userAccounts"),
      where("uid", "==", user?.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    const res = await getDoc(doc(db, "userAccounts", user?.uid));
    const receiverAccount =
      res.exists() &&
      res
        .data()
        ?.userAccounts?.find(
          (account) => account.currency === receiverCurrency
        );

    console.log(querySnapshot, res, receiverAccount);
    const tx = {
      transactionId: uuid(),
      currencySent: selectedCurrency.baseCurrency,
      currencyReceived: selectedCurrency.symbol,
      chargedAmount: "",
      amount,
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
        await updateDoc(doc(db, "userAccounts", user?.uid), {
          userAccounts: newUserAccounts,
          [currentAccount + ".balance"]: updatedBalance,
        });
      }

      tx.status = "completed";
      dispatch(setTransactions(tx));
      await setDoc(doc(db, "transactions", user?.uid), tx);
    } catch (err) {
      tx.status = "Failed transaction";
    }
  };

  return (
    <div className="grid place-items-center w-full h-100dvh relative pt-3 overflow-y-auto">
      <section className="w-full">
        <div className="group relative w-[140px] h-[140px] mx-auto md:w-[100px] md:h-[100px] rounded-[50%] border border-solid border-neutral-200 shadow-md grid place-items-center">
          <img
            src={user?.avatar}
            alt=""
            className="group-hover:scale-105 transition-100 hover:drop-shadow-md"
          />
        </div>
        <div className="my-6 px-2 text-center">
          <h3>{user?.businessName ?? "Unknown"}</h3>
          <span className="text-neutral-600">
            {user?.displayName ?? "Unknown"}
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
                value = "1 Apr 2021";
                break;
              case 3:
                value = agreedExchangeRate ?? "-";
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
          className="!mx-auto my-4"
        />
      </section>
    </div>
  );
}
export default TransferReceipt;
