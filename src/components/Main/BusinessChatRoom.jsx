import { useEffect, useRef, useState } from "react";
import ChatBusiness from "./ChatBusiness";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { roomID } from "@constants/constants";
import { formatDateStatus } from "@utils";

const DateStatus = ({ status }) => (
  <div className="flex-row gap-4 mb-1">
    <hr className="w-[40%] border border-solid border-br-light opacity-40" />
    <span className="text-tiny text-neutral-400 capitalize">{status}</span>
    <hr className="w-[40%] border border-solid border-br-light  opacity-50" />
  </div>
);

function BusinessChatRoom() {
  const [roomMessages, setRoomMessages] = useState([]);
  const elemRef = useRef(null);

  useEffect(() => {
    const getRoomMessages = async () => {
      try {
        const unsub = onSnapshot(doc(db, "chatroom", roomID), (doc) => {
          doc.exists() && setRoomMessages(doc.data().messages);
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

  useEffect(() => {
    elemRef?.current &&
      elemRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [roomMessages]);

  let startOfUserMsg = "";
  let lastDateStatus = "";
  const array = [];
  roomMessages?.forEach((msg, idx) => {
    let dateStatus = formatDateStatus(msg?.date);

    if (lastDateStatus !== dateStatus) {
      array.push(<DateStatus status={dateStatus} key={dateStatus} />);
      array.push(
        <ChatBusiness
          msg={msg}
          key={msg.id}
          roomMessages={roomMessages}
          startMsg
        />
      );
    } else {
      if (startOfUserMsg !== roomMessages[idx]?.senderID) {
        array.push(
          <ChatBusiness
            msg={msg}
            key={msg.id}
            roomMessages={roomMessages}
            startMsg
          />
        );
      } else {
        array.push(
          <ChatBusiness msg={msg} key={msg.id} roomMessages={roomMessages} />
        );
      }
    }

    lastDateStatus = dateStatus;
  });

  return (
    <div
      className={`group relative w-full mt-[1px] pt-5 pb-4 px-[3%] flex-1 flex flex-col gap-4 overflow-hidden overflow-y-auto max-sm:mb-[1rem]`}
    >
      {array.length > 0 && array?.map((row) => row)}
      <div ref={elemRef} className="absolute h-0 bottom-0"></div>
    </div>
  );
}
export default BusinessChatRoom;
