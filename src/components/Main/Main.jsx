import { useSelector } from "react-redux";
import Heading from "./Heading";
import InputBar from "./InputBar";
import Messages from "./Messages";
import BusinessChatRoom from "./BusinessChatRoom";
import ChatRoomInput from "./ChatRoomInput";
import { motion } from "framer-motion";
import ChatRoomHeading from "./ChatRoomHeading";

function Main() {
  const { user, chatId, isPrivateChat } = useSelector(
    (state) => state.usersState
  );
  const { visiblePane, screenSize } = useSelector((state) => state.appState);

  return (
    <motion.div className="flex-column h-full !justify-start relative overflow-hidden">
      {screenSize < 640 ? (
        <>
          {visiblePane?.showChat && (
            <>
              <Heading userChat={user} />
              <Messages userChat={user} chatId={chatId} />
              <InputBar userChat={user} chatId={chatId} />
            </>
          )}
          {visiblePane?.showChatRoom && (
            <>
              <ChatRoomHeading userChat={user} />
              <BusinessChatRoom />
              <ChatRoomInput userChat={user} />
            </>
          )}
        </>
      ) : isPrivateChat ? (
        <>
          <Heading userChat={user} />
          <Messages userChat={user} chatId={chatId} />
          <InputBar userChat={user} chatId={chatId} />
        </>
      ) : (
        <>
          <ChatRoomHeading userChat={user} />
          <BusinessChatRoom />
          <ChatRoomInput userChat={user} />
        </>
      )}
    </motion.div>
  );
}
export default Main;
