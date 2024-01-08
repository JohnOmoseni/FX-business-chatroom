import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const roomID = "GsDeFXAGVBh7Z7evzs2O";

export const config = {
  public_key: import.meta.env.VITE_FLUTTERWAVE_API_KEY,
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
    description: "Make a deposit",
    logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  },
};
