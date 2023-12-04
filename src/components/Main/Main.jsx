import { useSelector } from "react-redux";
import Heading from "./Heading";
import InputBar from "./InputBar";
import Messages from "./Messages";
import BusinessChatRoom from "./BusinessChatRoom";
import ChatRoomInput from "./ChatRoomInput";
import { motion } from "framer-motion";

function Main() {
  const { user, chatId, isPrivateChat } = useSelector(
    (state) => state.usersState
  );
  const { visiblePane, screenSize } = useSelector((state) => state.appState);

  return (
    <motion.div className="flex-column h-screen !justify-start">
      <Heading userChat={user} />
      {screenSize < 640 ? (
        <>
          {visiblePane?.showChat && (
            <>
              <Messages userChat={user} chatId={chatId} />
              <InputBar userChat={user} chatId={chatId} />
            </>
          )}
          <>
            {visiblePane?.showChatRoom && (
              <>
                <BusinessChatRoom />
                <ChatRoomInput userChat={user} />
              </>
            )}
          </>
        </>
      ) : isPrivateChat ? (
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
    </motion.div>
  );
}
export default Main;
