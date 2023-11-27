import { useEffect } from "react";

function ErrorTimeout({ setErrorSearch, setSearchUser, title }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorSearch(false);
      setSearchUser("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div
      className={`grid place-items-center
      pb-6 flex-1 w-full overflow-y-auto relative`}
    >
      <p>{title}</p>
    </div>
  );
}
export default ErrorTimeout;
