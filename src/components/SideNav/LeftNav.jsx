import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { users } from "@constants/constants";
import ChatRow from "./ChatRow";

function LeftNav() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("searching");
    }
  };

  return (
    <>
      <div className="px-3 py-3.5 mx-auto w-[95%] relative rounded-md shadow-sm border border-solid border-br-light ">
        <span className="icon absolute center right-3 align-middle">
          <BiSearchAlt size={16} fill="#888" />
        </span>

        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="  w-full i-reset placeholder:text-base placeholder:text-neutral-500"
        />
      </div>
      <div className="pb-6 overflow-y-auto relative">
        <ul className="flex-column gap-6">
          {users?.map((user) => {
            return <ChatRow key={user?.uid} {...user} />;
          })}
        </ul>
      </div>
    </>
  );
}
export default LeftNav;
