import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBaseCurrency } from "@redux/features/fxSlice";

const apiURL = import.meta.env.VITE_API_URL;

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
        const res = await fetch(
          `${apiURL}/latest?base=${baseCurrency}`,
          options
        );

        if (!res.ok) {
          console.log(res.text());
          setError(true);
          throw new Error("Error fetching data");
        }

        const data = await res.json();
        console.log(data);
        // if (mounted) {
        setRates(data?.rates);
        dispatch(setBaseCurrency(data?.base));
        // }
        setIsLoading(false);
        setError(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error(error.message);
      }
    };

    getRates();

    return () => (mounted = false);
  }, [baseCurrency]);

  return [rates, isLoading, error];
}
export default useFetchRates;
