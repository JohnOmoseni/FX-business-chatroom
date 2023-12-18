import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBaseCurrency } from "@redux/features/fxSlice";

const testUrl = "https://api.exchangerate.host/latest?base=USD";
const apiURL =
  "https://api.apilayer.com/currency_data/live?source=source&currencies=currencies";

const myHeaders = new Headers();
myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

const options = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function useFetchRates() {
  const { baseCurrency } = useSelector((state) => state.fxState);
  const [rates, setRates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    console.log("fetching rates");
    const getRates = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/src/hooks/rates.json");

        if (!res.ok) {
          console.log(res.json());
          setError(true);
          throw new Error("Error fetching data");
        }

        const data = await res.json();
        if (mounted) {
          setRates(data?.quotes);
          dispatch(setBaseCurrency(data?.source));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error.message);
      }
    };

    getRates();

    return () => (mounted = false);
  }, [baseCurrency]);

  return [rates, isLoading, error];
}
export default useFetchRates;
