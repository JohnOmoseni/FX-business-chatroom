import { useDispatch, useSelector } from "react-redux";
import { ButtonVariant } from "../../Button";
import { v4 as uuid } from "uuid";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import { toast } from "react-toastify";
import { setVisibleRightPane } from "@redux/features/appStateSlice";
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
  } = useSelector((state) => state.fxState);
  const dispatch = useDispatch();

  const handleTransfer = async () => {
    if (!user.uid) {
      setTransferReceipt(false);
      toast.info("Select a recipient");
      return;
    }
    const fromCurrency = selectedCurrency.baseCurrency;
    const toCurrency = selectedCurrency?.symbol;

    const senderAccount = userAccounts.find(
      (acc) => acc.currency === fromCurrency
    );

    if (!senderAccount) {
      Swal.fire({
        icon: "info",
        titleText: `You do not have an account of this currency - (${fromCurrency})`,
        showDenyButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          setTransferReceipt(false);
        }
      });

      return;
    }
    const chargedAmount = Number(amountToSend) + 20;
    if (senderAccount.balance < chargedAmount) {
      Swal.fire({
        icon: "error",
        titleText: `Insufficient funds`,
        showDenyButton: false,
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
      return;
    }

    const res = await getDoc(doc(db, "userAccounts", user?.uid));
    const receiverAccount =
      res.exists() &&
      res
        .data()
        ?.userAccounts?.find((account) => account.currency === toCurrency);

    console.log(senderAccount, receiverAccount);
    const tx = {
      transactionId: uuid(),
      currencySent: fromCurrency,
      currencyReceived: toCurrency,
      chargedAmount: chargedAmount,
      amount: amountToSend,
      txType: "FX",
      fx: selectedCurrency.pair,
      exchangeRate: agreedExchangedRate,
      status: "pending",
      recipientID: user?.uid,
      recipient: null,
      timestamp: Date.now(),
    };

    const balance = Number(senderAccount.balance) - chargedAmount;
    const updatedSenderAccount = {
      balance,
      currency: fromCurrency,
    };
    const newSenderAccounts = userAccounts?.map((acc) => {
      if (acc.currency === fromCurrency) {
        return updatedSenderAccount;
      }
      return acc;
    });

    console.log(chargedAmount, updatedSenderAccount, newSenderAccounts);

    try {
      if (receiverAccount) {
        const updatedReceiverAccount = {
          balance: Number(receiverAccount?.balance) + Number(amountToSend),
          currency: toCurrency,
        };
        const newUserAccounts = res.data()?.userAccounts?.map((acc) => {
          if (acc.currency === toCurrency) {
            return updatedReceiverAccount;
          }
          return acc;
        });

        tx.status = "completed";
        await updateDoc(doc(db, "userAccounts", user?.uid), {
          userAccounts: newUserAccounts,
          currentAccount: updatedReceiverAccount,
        });

        console.log("successful", newUserAccounts);
      } else {
        const updatedReceiverAccount = {
          balance: Number(amountToSend),
          currency: toCurrency,
        };
        await updateDoc(doc(db, "userAccounts", user?.uid), {
          userAccounts: arrayUnion(updatedReceiverAccount),
          currentAccount: updatedReceiverAccount,
        });
      }
      toast.success(`Transfer to ${user?.businessName} successful`);
      dispatch(setVisibleRightPane({ id: "userWallet", val: true }));

      await updateDoc(doc(db, "userAccounts", currentUser?.uid), {
        userAccounts: newSenderAccounts,
        currentAccount: updatedSenderAccount,
      });
      await updateDoc(doc(db, "transactions", user?.uid), {
        transactions: arrayUnion(tx),
      });
      await updateDoc(doc(db, "transactions", currentUser?.uid), {
        transactions: arrayUnion(tx),
      });
    } catch (err) {
      tx.status = "Failed transaction";
    } finally {
      setTransferReceipt(false);
    }
  };

  return (
    <div className="grid place-items-center w-full h-full relative pt-3 overflow-x-hidden overflow-y-auto">
      <section className="w-full absolute top-4">
        <div className="group relative min-w-[140px] w-[140px] max-w-[140px] h-[140px] mx-auto md:min-w-[100px] md:max-w-[140px] md:h-[100px] clip-circle rounded-[50%] border border-solid border-neutral-400 shadow-md grid place-items-center overflow-hidden">
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
