import { useSelector } from "react-redux";
import { useState } from "react";
import Heading from "./Heading";
import InputBar from "./InputBar";
import Messages from "./Messages";
import BusinessChatRoom from "./BusinessChatRoom";
import ChatRoomInput from "./ChatRoomInput";

function Main() {
  const { user, chatId, isPrivateChat } = useSelector(
    (state) => state.userChat
  );
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleCloseDropdown = (e) => {
    const elem = e.target;

    if (!elem.closest(".dropdown-btn")) {
      setOpenDropdown(false);
      return;
    }
  };

  return (
    <div
      className="flex-column h-screen !justify-start"
      onClick={handleCloseDropdown}
    >
      <Heading
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        userChat={user}
      />
      {isPrivateChat ? (
        <>
          <Messages userChat={user} chatId={chatId} />
          <InputBar userChat={user} chatId={chatId} />
        </>
      ) : (
        <>
          <BusinessChatRoom />
          <ChatRoomInput userChat={user} />
        </>
      )}
    </div>
  );
}
export default Main;
