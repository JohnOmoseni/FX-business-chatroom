import { useMemo, useState } from "react";
import ListRow from "../../ListRow";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux";

const SearchBar = ({ setSearchBar, input, setInput, setSearchResult, txs }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);

    let foundTxs = txs?.filter((item) => {});

    if (foundTxs?.length > 0) {
      setSearchResult(foundTxs);
    } else {
      setSearchResult([]);
    }
  };

  return (
    <div className="px-3 py-3.5 mb-3 mx-auto w-[95%] relative rounded-md shadow-sm border border-solid border-br-light">
      <span
        className="icon absolute center mt-1 right-3 align-middle"
        onClick={() => setSearchBar(false)}
      >
        <BiSearchAlt size={16} fill="#888" />
      </span>

      <input
        type="text"
        name="search"
        value={input}
        placeholder="Search..."
        onChange={handleInputChange}
        className="w-full i-reset placeholder:text-base placeholder:text-neutral-500"
      />
    </div>
  );
};

function Transactions() {
  const { transactions } = useSelector((state) => state.fxState);
  const [searchBar, setSearchBar] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [input, setInput] = useState("");
  const { users } = useSelector((state) => state.usersState);

  const txs = useMemo(() => {
    const array = searchResult?.length > 0 ? searchResult : transactions;
    if (transactions.length > 0) {
      return array?.map((tx) => {
        return {
          ...tx,
          recipient: users?.find((user) => user?.uid === tx?.recipientID),
        };
      });
    } else {
      return array;
    }
  }, [searchResult, transactions]);

  return (
    <div className="h-full relative rounded-ss-2xl rounded-se-lg pt-4 pb-6 px-[4%] border-t-2 border-solid border-br-light overflow-y-auto">
      <div className="flex-row gap-3 !justify-between">
        {searchBar ? (
          <SearchBar
            input={input}
            setSearchBar={setSearchBar}
            setInput={setInput}
            setSearchResult={setSearchResult}
            txs={transactions}
          />
        ) : (
          <>
            <p className="text-xl text-shadow font-semibold text-gradient-100">
              Transactions
            </p>
            <span
              className="icon pr-1 mt-1.5 align-middle"
              onClick={() => setSearchBar(true)}
            >
              <BiSearchAlt size={20} fill="#888" />
            </span>
          </>
        )}
      </div>
      {txs?.length > 0 ? (
        <ul className="mt-4 flex-column gap-4">
          {txs.map((tx, idx) => {
            let subtitle;
            switch (tx?.txType) {
              case "Deposit":
                subtitle = "Added to wallet";
                break;
              case "Withdraw":
                subtitle = "Withdrawn";
                break;
              case "FX":
                subtitle = "Transferred";
              default:
                subtitle = "Sent";
            }
            const obj = {
              name: tx?.recipient?.businessName
                ? tx?.recipient?.businessName
                : "Unknown",
              subtitle: subtitle,
              avatar: tx?.recipient?.avatar,
              symbol: "",
            };
            return (
              <ListRow
                key={idx}
                showImg
                obj={obj}
                renderLastCol={() => (
                  <div className="text-center leading-5 flex-column !items-center">
                    <span
                      className={`${
                        tx?.txType?.includes("Deposit")
                          ? "!text-green-400"
                          : "!text-red-400"
                      }`}
                    >
                      <span>{tx?.txType?.includes("Deposit") ? "+" : "-"}</span>
                      {tx?.txType === "FX" ? tx?.exchangeRate : tx?.amount}
                    </span>
                    {!tx?.type !== "FX" && (
                      <span className="text-tiny text-shadow">
                        {tx?.txType}
                      </span>
                    )}
                  </div>
                )}
              />
            );
          })}
        </ul>
      ) : (
        <p className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-100%] grid place-items-center text-neutral-500 text-shadow text-center">
          No transactions
        </p>
      )}
    </div>
  );
}
export default Transactions;
