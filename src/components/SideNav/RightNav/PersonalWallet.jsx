import { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSearchAlt } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowDown, MdOutlineArrowBack } from "react-icons/md";
import Dropdown from "../../Dropdown";
import ListRow from "../../ListRow";
import {
  setCloseRightPane,
  setVisibleRightPane,
} from "@redux/features/appStateSlice";
import { faker } from "@faker-js/faker";

import Deposit from "@pages/payment/Deposit";

const WalletHeader = ({ userProfile, onClick, currency }) => (
  <div className="w-full py-3 md:py-[4%] pl-1 pr-3 flex-row gap-6 !justify-between border-b border-solid border-br-light shadow-md">
    <div className="flex-row gap-1">
      <span
        onClick={onClick}
        className="icon p-1 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
      >
        <MdOutlineArrowBack color="black" size={18} />
      </span>
      <div className="relative w-[40px] max-w-[40px] h-[40px] rounded-[50%] border border-solid border-neutral-200 shadow-md">
        <img
          src={userProfile?.avatar ?? faker.image.avatar()}
          alt=""
          className="group-hover:scale-105 transition"
        />
      </div>
      <div className="px-2">
        <span className="text-xs text-neutral-300 text-opacity-60 tracking-wider ml-1 !block -mb-1">
          Hello,
        </span>
        <p className="text-xl font-semibold text-shadow tracking-tight font-kinn">
          {userProfile?.businessName ?? "Unknown"}
        </p>
      </div>
    </div>

    <Dropdown
      menuBtn={() => (
        <>
          {currency}
          <MdKeyboardArrowDown
            size={18}
            className="cursor-pointer icon ml-2"
            color="black"
          />
        </>
      )}
      list={["NGN"]}
    />
  </div>
);

const Button = ({ icon, children }) => (
  <div className="py-2.5 px-6 rounded-full flex-row gap-2 shadow-md border border-solid border-br-light  hover:drop-shadow-sm hover:scale-x-105 active:scale-100 active:translate-y-1 bg-gradient-200 opacity-80 cursor-pointer">
    {icon}
    {children}
  </div>
);

const SearchBar = ({ setSearchBar, input, setInput, setSearchResult, txs }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);

    let foundTxs = txs?.filter((item) => {});

    if (foundTxs?.length > 0) {
      setSearchResult(foundTxs);
    } else {
      setSearchResult(txs);
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

function PersonalWallet() {
  const { currentUser: userProfile } = useSelector((state) => state.authUser);
  const { users } = useSelector((state) => state.usersState);
  const { selectedCurrency, userAccount, transactions, lastTransaction } =
    useSelector((state) => state.fxState);
  const { screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState(false);
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const balance = useMemo(() => {
    const amount = userAccount?.balance.split(".");
    const sigNo = parseInt(amount?.[0]);
    const decimal = amount?.[1];

    return [sigNo, decimal];
  }, [userAccount?.balance]);

  const txs = useCallback(() => {
    transactions?.map((tx, idx) => {
      return {
        ...tx,
        receiverID: () => {
          return users?.find((user) => user?.uid === tx?.receiverID);
        },
      };
    });
  }, [transactions]);

  const handleDeposit = () => {};
  const handleWithdraw = () => {};

  const handleBackArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "userProfile", val: true }));
    } else {
      dispatch(setCloseRightPane());
    }
  };

  return (
    <>
      <WalletHeader
        userProfile={userProfile}
        currency={userAccount?.currency}
        onClick={handleBackArrowClick}
      />
      <div className="w-full pt-3 h-full overflow-y-auto">
        <div className="grid grid-cols-balance gap-4 overflow-hidden">
          <div className="bg-gradient-200 rounded-md"></div>
          <div className="rounded-md shadow-100 bg-neutral-100 px-3 pt-5 pb-6 mx-auto w-[100%]">
            <span className="text-xs text-neutral-300 text-opacity-60 tracking-wide ml-1 mb-1 text-gradient-200">
              Account Balance
            </span>
            <h2 className="whitespace-nowrap  text-4xl text-shadow text-gradient-100">
              <span className="text-3xl">{userAccount?.currency}</span>
              {balance?.[0]}
              <span className="text-xl !text-neutral-400">.{balance?.[1]}</span>
            </h2>
          </div>
          <div className="bg-gradient-100 rounded-md"></div>
        </div>
        <div></div>

        <div className="flex-row gap-4 my-14 px-4 mx-auto">
          <Button icon={<CiLocationOn />}>
            {/* <Deposit title="Load" amount currency customer /> */}
          </Button>
          <Button icon={<CiLocationOn />}>
            {/* <Deposit title="Withdraw" amount currency customer /> */}
          </Button>
        </div>
        <div className="h-full rounded-ss-2xl rounded-se-lg shadow-md py-4 px-[4%] border-t-2 border-solid border-br-light">
          <div className="flex-row gap-3 !justify-between">
            {searchBar ? (
              <SearchBar
                input={input}
                setSearchBar={setSearchBar}
                setInput={setInput}
                setSearchResult={setSearchResult}
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
          <ul className="mt-4">
            <span className="text-xs ml-1 mb-2">Today</span>
            {txs?.length > 0 &&
              txs.map((tx, idx) => {
                return (
                  <ListRow
                    key={idx}
                    obj={tx}
                    renderLastCol={() => (
                      <div className="text-center leading-5">Some text</div>
                    )}
                  />
                );
              })}
            <ListRow
              renderLastCol={() => (
                <div className="text-center leading-5">Some text</div>
              )}
            />
          </ul>
        </div>
      </div>
    </>
  );
}
export default PersonalWallet;
