import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";
import { ButtonVariant } from "@components/Button";
import { v4 as uuid } from "uuid";
import ReactModal from "react-modal";
import InputField from "@components/SideNav/RightNav/InputField";
import SelectField from "../../components/SideNav/RightNav/SelectField";

const url = "https://maketrfrequestapi.netlify.app/.netlify/functions/api/";

function Withdraw() {
  const { currentUser } = useSelector((state) => state.authUser);
  const { currentAccount } = useSelector((state) => state.fxState);
  const [amount, setAmount] = useState(1000);
  const [bankcode, setBankcode] = useState("044");
  const [accountNo, setAccountNo] = useState("0690000032");

  const initiateTransfer = async () => {
    if (!amount && !accountNo) return;
    // if (amount > currentAccount?.balance ) return;

    try {
      const payload = {
        account_name: "044",
        account_number: "0690000031",
        amount: "1000",
      };
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      console.log(res, payload);
      if (!res.ok) {
        throw new Error("Failed fetch");
      }
      const data = await res.json();
      const {
        data: { data: status },
      } = data;

      if (status === "NEW") {
        // subtract amount withdrawn from user current balance
        console.log("Transaction successful");
        toast.success("Transaction successful", {
          hideProgressBar: true,
        });
        const tx = {
          transactionId: uuid(),
          currencySent: "",
          currencyReceived: currentAccount?.currency,
          chargedAmount: "",
          amount,
          exchangeRate: "",
          txType: "Withdraw",
          fx: "",
          status: "completed",
          recipient: currentUser?.uid,
          timestamp: Date.now(),
        };
        const updatedBalance =
          parseInt(currentAccount.balance) - response?.amount;

        dispatch(setTransactions(tx));
        dispatch(setAccountBalance(updatedBalance));
      } else {
        alert("Failed to initiate transfer. Please try again");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSelectChange = (value) => {
    const selectValue = value[0]?.value;
  };

  return (
    <div className="grid place-items-center h-full">
      <div className="flex-column gap-3">
        <SelectField
          list={[]}
          handleSelectChange={handleSelectChange}
          placeholder="Select Bank"
        />
        <div className="flex-row">
          <span className="text-sm mb-1 pr-1 text-shadow tracking-wide uppercase">
            {currentAccount?.currency}
          </span>
          <InputField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="!text-neutral-400"
          />
        </div>

        <div className="my-[1rem]">
          <ButtonVariant
            title="Deposit Money"
            icon={<CiLocationOn />}
            onClick={initiateTransfer}
            className="bg-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
export default Withdraw;
