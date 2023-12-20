import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBaseCurrency } from "@redux/features/fxSlice";

const apiURL = "https://api.apilayer.com/exchangerates_data";

const myHeaders = new Headers();
myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

const options = {
  method: "GET",
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
    const getRates = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiURL}/latest?base=USD`, options);

        if (!res.ok) {
          console.log(res.text());
          setError(true);
          throw new Error("Error fetching data");
        }

        const data = await res.text();
        if (mounted) {
          setRates(data?.rates);
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
