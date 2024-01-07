import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions, setAccountBalance } from "@redux/features/fxSlice";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";
import InputField from "../../components/SideNav/RightNav/InputField";
import { ButtonVariant } from "../../components/Button";

const email = "johnny@gmail.com";
const phone_number = "09012603169";
const name = "johnny";
const amount = "500";

export default function Deposit({ onCloseModal }) {
  const { user } = useSelector((state) => state.usersState);
  const { currentAccount } = useSelector((state) => state.fxState);
  const { currentUser } = useSelector((state) => state.authUser);

  const [amount, setAmount] = useState("");
  const {
    businessName = "",
    displayName = "",
    email = "",
    phoneNo = "",
    avatar = "",
  } = user;
  const dispatch = useDispatch();

  const config = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_API_KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: currentAccount?.currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: phoneNo,
      name: businessName ?? displayName,
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
      handleFlutterPayment({
        callback: (response) => {
          console.log(response);
          if (response.status !== "completed") {
            console.log("Failed transaction");
            toast.error("Transaction failed", {
              hideProgressBar: true,
            });
          } else {
            console.log("Transaction successful");
            toast.success("Transaction successful", {
              hideProgressBar: true,
            });
            const tx = {
              transactionId: response.transaction_id,
              currencySent: response?.currency,
              currencyReceived: response?.currency,
              chargedAmount: "",
              amount: response.amount,
              exchangeRate: "",
              txType: "Deposit",
              fx: "",
              status: response.status,
              recipient: currentUser?.uid,
              timestamp: response.created_at,
            };
            const updatedBalance =
              parseInt(currentAccount.balance) + response?.amount;

            dispatch(setTransactions(tx));
            dispatch(setAccountBalance(updatedBalance));
          }
          closePaymentModal(); // this will close the modal programmatically
          onCloseModal();
        },
        onClose: () => {
          console.log("Transaction cancelled");
          onCloseModal();
          setAmount("");
          toast.info("Transaction cancelled", {
            hideProgressBar: true,
          });
        },
      });
    } else {
      toast.info("Please enter a valid amount", {
        hideProgressBar: true,
      });
      setAmount("");
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="flex-row px-4">
        <span className="text-xl mb-1 tracking-wide uppercase">
          {currentAccount?.currency}
        </span>
        <div className="flex-1 py-3 px-2 overlow-hidden">
          <InputField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="!text-neutral-400"
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
  );
}
