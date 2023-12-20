import { useEffect, useState } from "react";

const apiURL = import.meta.env.VITE_API_URL;

const myHeaders = new Headers();
myHeaders.append("apikey", import.meta.env.VITE_API_KEY);

const options = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function useFetchCurrencies() {
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

        const data = await res.text();
        console.log(data);
        if (mounted) {
          setCurrencies(data?.currencies);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error.message);
      }
    };

    getCurrencies();
    return () => (mounted = false);
  }, []);

  return [currencies, isLoading, error];
}
export default useFetchCurrencies;
