import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "./Tabs";
import TabsPanel from "./TabsPanel";
import Conversations from "./Conversations";
import Business from "./Business";
import logo from "@assets/images/logo.png";
import { BsFillChatDotsFill } from "react-icons/bs";
import { faker } from "@faker-js/faker";
import Search from "./Search";
import ErrorTimeout from "./ErrorTimeout";
import ChatRow from "./ChatRow";
import {
  setActivePane,
  setVisibleRightPane,
} from "@redux/features/appStateSlice";
import { setBusinessProfile } from "@redux/features/chatSlice";
import { Link } from "react-router-dom";
import { setIsPrivateChat } from "../../../redux/features/chatSlice";

function LeftNav() {
  const { currentUser, isActive } = useSelector((state) => state.authUser);
  const [activeTab, setActiveTab] = useState("business-tab");
  const [errorSearch, setErrorSearch] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const handleUserProfileClick = () => {
    dispatch(
      setVisibleRightPane({ id: "userProfile", val: true, isCurrentUser: true })
    );
    dispatch(setBusinessProfile(currentUser));
  };

  const handleShowChatRoom = () => {
    dispatch(setActivePane({ id: "showChatRoom", val: true }));
    dispatch(setIsPrivateChat(false));
  };

  return (
    <>
      <div className="w-full flex-row gap-4 !justify-between">
        <Link to="/" className="w-[100px]">
          <img src={logo} alt="Osho Free" />
        </Link>
        <div
          className="flex-row max-w-[50%] !justify-end gap-3 cursor-pointer"
          onClick={handleUserProfileClick}
        >
          <h4 className="!w-[50%] text-base text-shadow text-end sm:text-center overflow-hidden truncate">
            {currentUser?.displayName ?? "Unknown"}
            <span className="mt-[-1px] !block text-tiny truncate">
              {currentUser?.uid}
            </span>
          </h4>
          <div className="group relative min-w-[30px] max-w-[30px] h-[30px] rounded-[50%] border border-solid border-neutral-200">
            <img
              src={currentUser?.avatar ?? faker.image.avatar()}
              alt=""
              className="group-hover:scale-105 transition"
            />
            <span
              className={`${
                isActive ? "bg-green-400" : "bg-[#888] "
              } absolute z-[100] -bottom-[1px] right-0 w-[10px] h-[10px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
            ></span>
          </div>
        </div>
      </div>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setUser={setUser}
        setSearchUser={setSearchUser}
      />

      <Search
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        user={user}
        activeTab={activeTab}
        setUser={setUser}
        setErrorSearch={setErrorSearch}
      />

      {user ? (
        user.length > 0 && user?.map((u, idx) => <ChatRow key={idx} user={u} />)
      ) : errorSearch ? (
        <ErrorTimeout
          setSearchUser={setSearchUser}
          setErrorSearch={setErrorSearch}
          title="Error searching for users..."
        />
      ) : (
        <>
          <TabsPanel activeTab={activeTab} id="chats-tab">
            <Conversations />
          </TabsPanel>

          <TabsPanel activeTab={activeTab} id="business-tab">
            <Business />
          </TabsPanel>
        </>
      )}
      <button
        type="button"
        className="absolute bg-green-200 bg-opacity-70 z-40 icon sm:!hidden right-4 bottom-2 text-3xl p-4 rounded-[50%] hover:drop-shadow-lg border-2 border-solid border-br-light active:scale-90 transition hover:bg-green-100"
        onClick={handleShowChatRoom}
      >
        <BsFillChatDotsFill color="#01a137fd" />
      </button>
    </>
  );
}
export default LeftNav;
