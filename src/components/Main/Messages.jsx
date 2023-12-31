import { useEffect, useState } from "react";
import Chat from "./Chat";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";

function Messages({ chatId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
        console.log(doc.data());
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    }
  }, [chatId]);

  const rows = [];
  let startOfUserMsg = "";

  messages.length > 0 &&
    messages?.forEach((msg, idx) => {
      if (startOfUserMsg !== messages[idx]?.senderID) {
        rows.push(<Chat msg={msg} key={msg.id} messages={messages} startMsg />);
      } else {
        rows.push(<Chat msg={msg} key={msg.id} messages={messages} />);
      }

      startOfUserMsg = messages[idx]?.senderID;
    });

  return (
    <div
      className={`group relative w-full pt-5 pb-4 px-[4%] flex-1 flex flex-col gap-4 overflow-y-auto max-sm:mb-[1rem]`}
    >
      <div className="flex-row gap-4 mb-1">
        <hr className="w-[45%] border border-solid border-br-light opacity-40" />
        <span className="text-tiny text-neutral-400">Today</span>
        <hr className="w-[45%] border border-solid border-br-light  opacity-50" />
      </div>

      {rows.length > 0 && rows?.map((row) => row)}
    </div>
  );
}
export default Messages;
