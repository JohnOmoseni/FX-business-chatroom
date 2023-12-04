import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { paneAnimate } from "@utils";
import {
  setVisibleRightPane,
  setActivePane,
} from "../../../../redux/features/appStateSlice";

import UserProfile from "./UserProfile";
import TradeWallet from "./TradeWallet";
import PersonalWallet from "./PersonalWallet";
import Currencies from "./Currencies";

const VisiblePaneLayout = ({ children, screenSize, className }) => {
  return (
    <motion.div
      variants={screenSize < 640 && paneAnimate}
      initial="hidden"
      animate="animate"
      className={className}
      style={{ zIndex: "1000" }}
    >
      {children}
    </motion.div>
  );
};

function RightNav() {
  const { visiblePane, screenSize, showRightPane, rightPane } = useSelector(
    (state) => state.appState
  );
  const dispatch = useDispatch();

  const handleCloseRightPane = () => {
    if (showRightPane && screenSize <= 768) {
      dispatch(setActivePane({ id: "showRightPane", val: false }));
    }
  };

  return (
    <>
      {screenSize < 640 ? (
        <VisiblePaneLayout
          screenSize={screenSize}
          className={`${
            showRightPane
              ? "w-full bg-white h-screen pt-8 pb-4 px-4 md:pt-[12%]overflow-hidden fixed top-0 right-0"
              : "w-0 overflow-hidden hidden"
          }`}
        >
          {rightPane.userProfile && <UserProfile />}
          {rightPane.tradeWallet && <TradeWallet />}
          {rightPane.userWallet && <PersonalWallet />}
          {rightPane.currencyList && <Currencies />}
        </VisiblePaneLayout>
      ) : (
        screenSize >= 768 && (
          <div className={`w-full pt-8 pb-4 px-4 md:pt-[12%]`}>
            {rightPane.userProfile && <UserProfile />}
            {rightPane.tradeWallet && <TradeWallet />}
            {rightPane.userWallet && <PersonalWallet />}
            {rightPane.currencyList && <Currencies />}
          </div>
        )
      )}
    </>
  );
}
export default RightNav;
