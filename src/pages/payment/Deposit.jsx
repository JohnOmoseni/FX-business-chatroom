import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const email = "johnny@gmail.com";
const phone_number = "09012603169";
const name = "johnny";
const amount = "500";

export default function Deposit({
  currency = "NGN",
  customer,
  desc = "Make a deposit",
}) {
  // const { name, phoneNo: phone_number, email } = customer;
  const config = {
    public_key: "FLWPUBK_TEST-a6157e327949bccb95ad0e4f97279130-X",
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

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      if (response.status !== "completed") {
        console.log("Failed transaction");
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      console.log("User ended transaction");
    },
  };

  return (
    <>
      <FlutterWaveButton {...fwConfig} />
    </>
  );
}
