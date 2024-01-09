import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useState } from "react";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";
import InputField from "../../components/SideNav/RightNav/InputField";
import { ButtonVariant } from "../../components/Button";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useSelector } from "react-redux";

const email = "johnnyomoseni100@gmail.com";
const phone_number = "09012603169";
const name = "johnny";
const amount = "500";

export default function TestDeposit({ onCloseModal }) {
  const { user } = useSelector((state) => state.usersState);
  const { currentAccount, userAccounts } = useSelector(
    (state) => state.fxState
  );
  const { currentUser } = useSelector((state) => state.authUser);
  const [amount, setAmount] = useState("");

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_API_KEY,
    tx_ref: Date.now(),
    amount: 200,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number,
      name,
    },
    customizations: {
      title: "Osho free",
      description: "Make a deposit",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleDeposit = () => {
    console.log(amount);

    if (amount && !isNaN(amount)) {
      try {
        handleFlutterPayment({
          callback: async (response) => {
            if (response.status.includes("successful")) {
              console.log("Transaction successful", response);
              toast.success("Transaction successful", {
                hideProgressBar: true,
              });
              const tx = {
                transactionId: response.transaction_id,
                currencySent: response?.currency,
                currencyReceived: response?.currency,
                chargedAmount: response.charged_amount,
                amount: response.amount,
                exchangeRate: "",
                txType: "Deposit",
                fx: "",
                status: response?.status,
                recipientID: currentUser?.uid,
                recipient: null,
                timestamp: response.created_at,
              };

              console.log(
                Number(currentAccount.balance),
                Number(response?.amount)
              );
              const updatedAccount = {
                balance:
                  Number(currentAccount.balance) + Number(response?.amount),
                currency: currentAccount?.currency,
              };

              const newUserAccounts = userAccounts?.map((account) => {
                if (account.currency === updatedAccount.currency) {
                  return updatedAccount;
                }
                return account;
              });
              if (newUserAccounts?.length > 0) {
                await updateDoc(doc(db, "userAccounts", currentUser?.uid), {
                  userAccounts: newUserAccounts,
                  currentAccount: updatedAccount,
                });
                await updateDoc(doc(db, "transactions", currentUser?.uid), {
                  transactions: arrayUnion(tx),
                });
              }

              console.log(newUserAccounts);
            } else {
              console.log("Failed transaction", response);
              toast.error("Transaction failed", {
                hideProgressBar: true,
              });
            }

            closePaymentModal(); // this will close the modal programmatically
            onCloseModal();
          },
          onClose: () => {
            onCloseModal();
            toast.info("Transaction cancelled", {
              hideProgressBar: true,
            });
          },
        });
      } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again.");
      }
    } else {
      toast.info("Please enter a valid amount", {
        hideProgressBar: true,
      });
    }
    setAmount("");
  };

  return (
    <div className="h-full grid place-items-center">
      <div className="flex-column !items-center">
        <div className="flex-row px-4">
          <span className="text-xl mb-1 tracking-wide uppercase font-kinn text-shadow">
            {currentAccount?.currency}
          </span>
          <div className="flex-1 py-3 px-2 overlow-hidden">
            <InputField
              value={amount}
              type="text"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="!text-neutral-700 !py-3"
            />
          </div>
        </div>
        <div className="my-[2rem]">
          <ButtonVariant
            title="Deposit Money"
            icon={<CiLocationOn />}
            onClick={handleDeposit}
            className="bg-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
