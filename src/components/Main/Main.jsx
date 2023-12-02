import { useSelector } from "react-redux";
import { useState } from "react";
import Heading from "./Heading";
import InputBar from "./InputBar";
import Messages from "./Messages";
import BusinessChatRoom from "./BusinessChatRoom";
import ChatRoomInput from "./ChatRoomInput";
import { motion } from "framer-motion";
import { paneAnimate } from "@utils";

function Main() {
  const { user, chatId, isPrivateChat } = useSelector(
    (state) => state.userChat
  );
    const { visiblePane, screenSize } = useSelector((state) => state.appState);


  return (
    <motion.div variants={screenSize <= 760 && paneAnimate} initial="hidden" animate="animate" className="hidden sm:flex-column h-screen !justify-start">
      <Heading userChat={user} />
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
    </motion.div>
  );
}
export default Main;
