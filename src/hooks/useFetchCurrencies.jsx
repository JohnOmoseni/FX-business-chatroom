import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const apiURL = import.meta.env.VITE_API_URL;

const myHeaders = new Headers();
myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

const options = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function useFetchCurrencies() {
  const { currencies: currArray } = useSelector((state) => state.fxState);
  const [currencies, setCurrencies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const getCurrencies = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiURL}/symbols`, options);

        if (!res.ok) {
          console.log(res.text());
          setError(true);
          throw new Error("Error fetching data");
        }

        const data = await res.json();
        console.log(data);
        setCurrencies(data?.symbols);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error.message);
      }
    };

    currArray.length === 0 && getCurrencies();
    return () => (mounted = false);
  }, []);

  return [currencies, isLoading, error];
}
export default useFetchCurrencies;
