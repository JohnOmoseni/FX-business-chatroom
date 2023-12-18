import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./UserProfile";
import TradeWallet from "./TradeWallet";
import PersonalWallet from "./PersonalWallet";
import Currencies from "./Currencies";
import BusinessProfile from "./BusinessProfile";
import { setVisibleRightPane } from "@redux/features/appStateSlice";

function RightNav() {
  const { rightPane, screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

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
