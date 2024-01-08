import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ButtonVariant } from "@components/Button";
import { v4 as uuid } from "uuid";
import InputField from "@components/SideNav/RightNav/InputField";
import { banks } from "../../../utils";
import Select from "react-dropdown-select";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

const url = "https://maketrfrequestapi.netlify.app/.netlify/functions/api/";

function Withdraw() {
  const { currentUser } = useSelector((state) => state.authUser);
  const { currentAccount, userAccounts } = useSelector(
    (state) => state.fxState
  );
  const [amount, setAmount] = useState("");
  const [bankcode, setBankcode] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const options = banks?.map((item) => ({
    label: item?.name,
    value: item?.code,
  }));

  const initiateTransfer = async () => {
    if (!amount || !accountNo || !bankcode) {
      alert("Please fill out all the fields");
      return;
    }
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

        await updateDoc(doc(db, "transactions", currentUser?.uid), {
          transactions: arrayUnion(tx),
        });
        const newUserAccounts =
          userAccounts?.length > 0 &&
          userAccounts?.map((account) => {
            if (account.currency === response.currency) {
              account.balance = updatedBalance;
            }
            return account;
          });
        if (newUserAccounts?.length > 0) {
          await updateDoc(doc(db, "userAccounts", currentUser?.uid), {
            userAccounts: newUserAccounts,
            [currentAccount + ".balance"]: updatedBalance,
          });
        }
      } else {
        alert("Failed to initiate transfer. Please try again");
      }
    } catch (err) {
      console.error(err.message);
      alert("Failed to initiate transfer. Please try again");
    }
  };

  const handleSelectChange = (value) => {
    setBankcode(value[0]?.value);
  };

  return (
    <div className="grid place-items-center h-full">
      <div className="withdraw flex-column !items-center gap-4">
        <Select
          name="select"
          options={options}
          placeholder="Select Bank"
          onChange={handleSelectChange}
        />
        <InputField
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
          placeholder="Enter your account number"
          className="!text-neutral-600 placeholder:text-neutral-400"
          required={true}
        />
        <div className="flex-row">
          <InputField
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="!text-neutral-600"
            placeholder="0.00"
            required={true}
          />
          <span className="text-sm mb-1 pl-1 text-shadow tracking-wide uppercase">
            {currentAccount?.currency}
          </span>
        </div>

        <div className="my-[1rem]">
          <ButtonVariant
            title="Withdraw"
            onClick={initiateTransfer}
            className="bg-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
export default Withdraw;
