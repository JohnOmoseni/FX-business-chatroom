import { useState } from "react";
import { useSelector } from "react-redux";
import Tabs from "./Tabs";
import TabsPanel from "./TabsPanel";
import Conversations from "./Conversations";
import Business from "./Business";
import logo from "@assets/images/logo.png";

import Search from "./Search";
import ErrorTimeout from "./ErrorTimeout";
import ChatRow from "./ChatRow";

function LeftNav() {
  const { currentUser, isActive } = useSelector((state) => state.authUser);
  const [activeTab, setActiveTab] = useState("chats-tab");
  const [errorSearch, setErrorSearch] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState("");

  return (
    <>
      <div className="w-full flex-row gap-3 !justify-between">
        <div className="w-[100px]">
          <img src={logo} alt="Osho Free" />
        </div>
        <div className="flex-row w-[45%] !justify-between gap-3">
          <h4 className="w-[50%] text-shadow text-regular">
            {currentUser?.displayName}
            <span className="mt-[-1px] text-tiny truncate">
              {currentUser?.uid}
            </span>
          </h4>
          <div className="icon relative w-[30px] h-[30px] rounded-[50%] border border-solid border-neutral-200">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.displayName.split(" ")[0]}
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
        setUser={setUser}
        setErrorSearch={setErrorSearch}
      />

      {user ? (
        user.length > 0 && user?.map((u) => <ChatRow user={u} />)
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
    </>
  );
}
export default LeftNav;
