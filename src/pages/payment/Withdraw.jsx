import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ButtonVariant } from "@components/Button";
import InputField from "@components/SideNav/RightNav/InputField";
import Select from "react-dropdown-select";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { banks } from "@constants/constants";
import Swal from "sweetalert2";

function Withdraw({ onCloseModal }) {
  const { currentUser } = useSelector((state) => state.authUser);
  const { currentAccount, userAccounts } = useSelector(
    (state) => state.fxState
  );
  const [amount, setAmount] = useState("");
  const [bankcode, setBankcode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = banks?.map((item) => ({
    label: item?.name,
    value: item?.code,
  }));

  const initiateTransfer = async () => {
    if (!amount || !accountNo || !bankcode) {
      alert("Please fill out all the fields");
      return;
    }
    if (amount >= currentAccount?.balance) {
      onCloseModal();

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

    setIsLoading(true);
    try {
      const payload = {
        account_bank: bankcode,
        account_number: accountNo,
        amount,
      };
      const res = await fetch(
        "https://maketrfrequestapi.netlify.app/.netlify/functions/api/",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res?.ok) {
        throw new Error("Failed fetch");
      }
      const data = await res.json();
      const {
        success,
        data: { data: txData },
      } = data;
      console.log("data response", txData, data.success);

      if (success) {
        // subtract amount withdrawn from user current balance
        console.log("Transaction successful");
        const chargedAmount = Number(amount) + Number(txData?.fee);

        const tx = {
          transactionId: txData?.reference,
          currencySent: txData?.currency,
          currencyReceived: currentAccount?.currency,
          chargedAmount,
          amount,
          exchangeRate: null,
          txType: "Withdraw",
          fx: "",
          status: "completed",
          recipientID: currentUser?.uid,
          recipient: null,
          timestamp: Date.now(),
          withdrawal: {
            accountNo: txData?.account_number,
            accountName: txData?.full_name,
            bank: txData?.bank_name,
            bankCode: txData?.bank_code,
            amount: txData?.amount,
          },
        };
        const updatedAccount = {
          balance: Number(currentAccount.balance) - chargedAmount,
          currency: currentAccount?.currency,
        };
        const res = await getDoc(doc(db, "userAccounts", currentUser?.uid));
        const accounts = res.data()?.userAccounts;
        const acc = accounts?.find(
          (account) => account.currency === currentAccount?.currency
        );

        if (acc) {
          const newAccounts = accounts?.map((account) => {
            if (account.currency === currentAccount?.currency) {
              return updatedAccount;
            }
            return account;
          });
          await updateDoc(doc(db, "userAccounts", currentUser?.uid), {
            userAccounts: newAccounts,
            currentAccount: updatedAccount,
          });
        } else {
          await updateDoc(doc(db, "userAccounts", currentUser?.uid), {
            userAccounts: arrayUnion(updatedAccount),
            currentAccount: updatedAccount,
          });
        }

        await updateDoc(doc(db, "transactions", currentUser?.uid), {
          transactions: arrayUnion(tx),
        });

        toast.success("Transaction successful", {
          hideProgressBar: true,
        });
      } else {
        alert("Withdrawal failed. Please try again");
      }
      onCloseModal();
    } catch (err) {
      console.error(err.message);
      alert("Failed to initiate transfer. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setBankcode(value[0]?.value);
  };

  return (
    <div className="grid place-items-center relative h-full">
      {isLoading && (
        <div className="absolute z-20 inset-0 bg-white bg-opacity-50 backdrop-blur-sm grid place-items-center">
          Loading...
        </div>
      )}
      <div className="withdraw  flex-column !items-center gap-4">
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
        <div className="flex-row text-">
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
            title={isLoading ? "Loading..." : "Withdraw"}
            onClick={initiateTransfer}
            className="bg-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
export default Withdraw;
