import { useEffect, useState } from "react";
import ChatBusiness from "./ChatBusiness";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { roomID } from "@constants/constants";

function BusinessChatRoom() {
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    const getRoomMessages = async () => {
      try {
        const unsub = onSnapshot(doc(db, "chatroom", roomID), (doc) => {
          doc.exists() && setRoomMessages(doc.data().messages);
          console.log(doc.data());
        });

        return () => {
          unsub();
        };
      } catch (err) {
        console.log(err);
      }
    };

    getRoomMessages();
  }, []);

  const rows = [];
  let startOfUserMsg = "";

  roomMessages.length > 0 &&
    roomMessages?.forEach((msg, idx) => {
      if (startOfUserMsg !== roomMessages[idx]?.senderID) {
        rows.push(
          <ChatBusiness
            msg={msg}
            key={msg.id}
            roomMessages={roomMessages}
            startMsg
          />
        );
      } else {
        rows.push(
          <ChatBusiness msg={msg} key={msg.id} roomMessages={roomMessages} />
        );
      }

      startOfUserMsg = roomMessages[idx]?.senderID;
    });

  return (
    <div
      className={`group relative w-full mt-[1px] pt-5 pb-4 px-[3%] flex-1 flex flex-col gap-4 overflow-y-auto max-sm:mb-[1rem]`}
    >
      <div className="flex-row gap-4 mb-1">
        <hr className="w-[40%] border border-solid border-br-light opacity-40" />
        <span className="text-tiny text-neutral-400">Today</span>
        <hr className="w-[40%] border border-solid border-br-light  opacity-50" />
      </div>

      {rows.length > 0 && rows?.map((row) => row)}
    </div>
  );
}
export default BusinessChatRoom;
