import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function App() {
  const config = {
    public_key: "FLWPUBK_TEST-a6157e327949bccb95ad0e4f97279130-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "ojaywilliams100@gmail.com",
      phone_number: "09012603169",
      name: "john doe",
    },
    customizations: {
      title: "Osho free",
      description: "Payment for items in cart",
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
      console.log("User ended transactiondddddddd");
    },
  };

  return (
    <div className="App">
      <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
