function ButtonTab({ activeTab, id, title, onClick }) {
  return (
    <button
      id={id}
      role="tab"
      aria-selected={activeTab === id ? "true" : "false"}
      className={`${
        activeTab === id ? "bg-green-400 text-white" : "text-[#444]"
      } w-full py-2 px-4 font-semibold last-of-type:border-l border-solid border-green-200 transition-colors cursor-pointer`}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
}

function Tabs({ activeTab, setActiveTab, setUser, setSearchUser }) {
  const changeTab = (id) => {
    id && setActiveTab(id);
    setUser("");
    setSearchUser("");
  };

  return (
    <div className="mt-4 w-full relative rounded-md border border-solid border-br-light">
      <div
        role="tablist"
        aria-label="tabs"
        className="w-full flex-row !justify-between shadow-sm"
      >
        <ButtonTab
          activeTab={activeTab}
          onClick={() => changeTab("chats-tab")}
          id="chats-tab"
          title="Chats"
        />
        <ButtonTab
          activeTab={activeTab}
          onClick={() => changeTab("business-tab")}
          id="business-tab"
          idx={1}
          title="Business"
        />
        <div className="activeTab-indicator"></div>
      </div>
    </div>
  );
}

export default Tabs;
