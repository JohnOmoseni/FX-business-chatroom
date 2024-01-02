import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./UserProfile";
import TradeWallet from "./TradeWallet";
import PersonalWallet from "./PersonalWallet";
import Currencies from "./Currencies";
import BusinessProfile from "./BusinessProfile";
import { setVisibleRightPane } from "@redux/features/appStateSlice";
import { setCurrencies } from "../../../../redux/features/fxSlice";
import useFetchCurrencies from "@hooks/useFetchCurrencies";

function RightNav() {
  const { rightPane, screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const { currencies: currArray } = useSelector((state) => state.fxState);

  const [currencies] = useFetchCurrencies();

  useEffect(() => {
    if (currencies && currArray.length === 0) {
      console.log("check");
      const currenciesObj = Object.entries(currencies)?.map((curr) => ({
        name: curr[1],
        symbol: curr[0],
      }));

      dispatch(setCurrencies(currenciesObj));
    }
  }, [currencies]);

  useEffect(() => {
    const showUserProfileOnly = Object.values(rightPane)?.every(
      (val) => val === false
    );
    if (showUserProfileOnly && screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: "userProfile", val: true }));
    }
  }, [screenSize]);

  return (
    <>
      {rightPane.userProfile && <UserProfile />}
      {rightPane.businessProfile && <BusinessProfile />}
      {rightPane.tradeWallet && <TradeWallet />}
      {rightPane.userWallet && <PersonalWallet />}
      {rightPane.currencyList && <Currencies />}
    </>
  );
}
export default RightNav;
