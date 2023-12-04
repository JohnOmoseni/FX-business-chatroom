import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChangeUser, setIsPrivateChat } from "@redux/features/chatSlice";
import Swal from "sweetalert2";

export function Chat({ msg, startMsg, messages }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authUser);
  const { user, isPrivateChat } = useSelector((state) => state.usersState);
  const owner = msg?.senderID === currentUser?.uid;
  const newMsgRef = useRef();

  useEffect(() => {
    newMsgRef?.current &&
      newMsgRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);

  const handleChatRoomClick = (id) => {
    console.log("Clicked on chat " + id);
    const clickedUser =
      messages?.length > 0 &&
      messages?.find((message, idx) => {
        return message.id === id;
      });

    Swal.fire({
      icon: "question",
      titleText: "Respond privately or Respond in Chatroom",
      showDenyButton: true,
      denyButtonText: "Reply In Chatroom",
      confirmButtonText: "Reply privately",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Reply privately");
        dispatch(setChangeUser({ currentUser, user }));
        dispatch(setIsPrivateChat(true));
      } else if (result.isDenied) {
        console.log("Reply in chat");
      }
    });
  };

  return (
    <div
      ref={newMsgRef}
      onClick={!isPrivateChat ? () => handleChatRoomClick(msg?.id) : undefined}
      className={`flex items-center ${
        owner ? "flex-row-reverse" : "flex-row"
      }  ${startMsg ? "gap-2 " : "mt-[-0.4rem]"} !justify-start gap-3.5`}
    >
      {!isPrivateChat && (
        <div className="w-[30px] h-[30px] rounded-[50%] border border-solid border-br-light self-start">
          <img src={owner ? currentUser?.avatar : user?.avatar} alt="" />
        </div>
      )}
      <div
        className={`${
          owner
            ? "max-w-[60%] bg-slate-100 after:border-t-slate-200 "
            : "max-w-[70%] bg-green-100 after:border-t-green-100 "
        } relative  min-w-[100px] py-1.5 px-3 flex-column bg-green-100 rounded-md shadow-sm ${
          startMsg
            ? "after:absolute after:top-0 after:right-[100%] after:border-8 "
            : "rounded-md"
        } after:translate-x-[8px] after:border-solid after:border-b-transparent after:border-x-transparent after:-z-[1px] after:rounded-ss-md`}
      >
        {!isPrivateChat && (
          <p className="w-full text-base text-left text-shadow flex-row gap-3 !justify-between mb-[2px]">
            <span className="tracking-tight">
              {owner ? currentUser?.displayName : user?.displayName}
            </span>
            <span className="text-tiny tracking-normal !w-[50px] truncate">
              {owner ? currentUser?.uid : user?.uid}
            </span>
          </p>
        )}
        <div>
          <p className="leading-5 text-regular">{msg?.text}</p>
          {msg?.img && (
            <div className="my-2 rounded-sm max-h-[250px] overflow-hidden">
              <img src={msg.img} alt="" />
            </div>
          )}
        </div>
        <span className="text-tiny py-[1px] text-neutral-400 text-shadow text-right w-full"></span>
      </div>
    </div>
  );
}
export default Chat;
