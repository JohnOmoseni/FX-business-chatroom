import { useDispatch, useSelector } from "react-redux";
import {
  setVisibleRightPane,
  setActivePane,
} from "@redux/features/appStateSlice";

import UserProfile from "./UserProfile";
import TradeWallet from "./TradeWallet";
import PersonalWallet from "./PersonalWallet";
import Currencies from "./Currencies";
import BusinessProfile from "./BusinessProfile";

function RightNav() {
  const { rightPane } = useSelector((state) => state.appState);

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
