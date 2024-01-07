import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChangeUser, setIsPrivateChat } from "@redux/features/chatSlice";
import { faker } from "@faker-js/faker";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import Swal from "sweetalert2";
import { setActivePane } from "@redux/features/appStateSlice";

export function ChatBusiness({ msg, startMsg }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authUser);
  const { users } = useSelector((state) => state.usersState);
  const owner = msg?.senderID === currentUser?.uid;
  const userObj =
    users?.length > 0 &&
    users?.find((user) => {
      return user?.uid === msg?.senderID;
    });
  const newMsgRef = useRef();

  useEffect(() => {
    newMsgRef?.current &&
      newMsgRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);

  const handleChatRoomClick = (id) => {
    if (owner) return;
    const clickedUser =
      users?.length > 0 &&
      users?.find((user) => {
        return user?.uid === id;
      });

    console.log("Clicked on chat " + typeof id, clickedUser);

    Swal.fire({
      icon: "question",
      titleText: "Respond privately or Respond in Chatroom",
      showDenyButton: true,
      denyButtonText: "Reply In Chatroom",
      confirmButtonText: "Reply privately",
    }).then((result) => {
      if (result.isConfirmed) {
        openPrivateChat(clickedUser);
      } else if (result.isDenied) {
        console.log("Reply in chatroom");
      }
    });
  };

  const openPrivateChat = async (user) => {
    dispatch(setChangeUser({ currentUser, user }));
    dispatch(setIsPrivateChat(true));
    dispatch(setActivePane({ id: "showChat", val: true }));
    dispatch(setActivePane({ id: "showChatRoom", val: false }));

    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user.uid
        : user?.uid + currentUser?.uid;
    // check whether the chat exists in chats
    const res = await getDoc(doc(db, "chats", combinedId));

    console.log(combinedId, user, currentUser);

    if (!res.exists()) {
      console.log("running");
      // set document in chats
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      // set document in userChats
      await updateDoc(doc(db, "userChats", currentUser?.uid), {
        [combinedId + ".userInfo"]: {
          displayName: user?.displayName,
          avatar: user?.avatar,
          uid: user.uid,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user?.uid), {
        [combinedId + ".userInfo"]: {
          displayName: currentUser?.displayName,
          avatar: currentUser?.avatar,
          uid: currentUser.uid,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } else if (res.exists()) {
      console.log(res);
    }
  };

  return (
    <div
      ref={newMsgRef}
      onClick={() => handleChatRoomClick(msg?.senderID)}
      className={`flex items-center ${
        owner ? "flex-row-reverse" : "flex-row"
      }  ${startMsg ? "gap-2 " : "mt-[-0.4rem]"} !justify-start gap-3.5`}
    >
      <div className="w-[30px] h-[30px] rounded-[50%] border border-solid border-br-light self-start">
        <img
          src={
            owner
              ? currentUser?.avatar
              : userObj?.avatar
              ? userObj?.avatar
              : faker.image.avatar()
          }
          alt=""
        />
      </div>
      <div
        className={`${
          owner
            ? "max-w-[60%] bg-slate-100 after:border-t-slate-200 "
            : "max-w-[70%] bg-green-100 after:border-t-green-100 "
        } relative  min-w-[100px] py-1.5 px-2.5 flex-column bg-green-100 rounded-md shadow-sm ${
          startMsg
            ? "after:absolute after:top-0 after:right-[100%] after:border-8 "
            : "rounded-md"
        } after:translate-x-[8px] after:border-solid after:border-b-transparent after:border-x-transparent after:-z-[1px] after:rounded-ss-md`}
      >
        <p className="w-full text-base text-left text-shadow flex-row gap-3 !justify-between mb-[2px]">
          <span className="tracking-tight">
            {owner
              ? currentUser?.businessName
              : userObj?.businessName ?? "Unknown"}
          </span>
          <span className="text-tiny tracking-normal !w-[50px] truncate">
            {msg?.senderID}
          </span>
        </p>
        <div className="w-full">
          <p className=" leading-5 text-base break-words ">{msg?.text}</p>
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
export default ChatBusiness;
