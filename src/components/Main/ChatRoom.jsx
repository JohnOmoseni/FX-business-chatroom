import { useEffect, useState } from "react";
import Chat from "./Chat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase-config";

function ChatRoom() {
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chat-room"));

    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const msgsArray = [];
        querySnapshot.forEach((doc) => {
          msgsArray.push(doc.data());
        });
        setRoomMessages(msgsArray.length > 0 && msgsArray);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(`Room messages: ${roomMessages}`);

    return () => {
      unsub();
    };
  }, []);

  return (
    <div
      className={`group relative w-full mt-[1px] pt-4 pb-6 px-[4%] flex-1 flex flex-col  gap-4 overflow-y-auto`}
    >
      <div className="flex-row gap-4">
        <hr className="w-[40%] border border-solid border-br-light opacity-40" />
        <span className="text-tiny text-neutral-400">Today</span>
        <hr className="w-[40%] border border-solid border-br-light  opacity-50" />
      </div>

      {roomMessages.length > 0 &&
        roomMessages?.map((msg) => {
          return <Chat msg={msg} key={msg.id} />;
        })}
    </div>
  );
}
export default ChatRoom;
