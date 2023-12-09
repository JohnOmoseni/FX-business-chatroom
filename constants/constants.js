import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const roomID = "Ne170CbD1DHZ4QDCkynM";

export const config = {
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
    description: "Make a deposit",
    logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  },
};
