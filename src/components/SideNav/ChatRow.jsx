import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config/firebase-config";
import { setChangeUser, setIsPrivateChat } from "@redux/features/chatSlice";
import { setActivePane } from "@redux/features/appStateSlice";

function ChatRow({ user, lastMessage }) {
  const { currentUser } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const isActive = user?.uid === currentUser?.uid;

  const handleSelect = async () => {
    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user.uid
        : user?.uid + currentUser?.uid;
    // check whether the chat exists in chats
    const res = await getDoc(doc(db, "chats", combinedId));

    console.log(res.data(), combinedId, user, currentUser);

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
    dispatch(setActivePane({ id: "showChat", val: true }));
    dispatch(setChangeUser({ currentUser, user }));
    dispatch(setIsPrivateChat(true));
  };

  return (
    <li
      className="group w-full py-2 px-2 rounded-md grid grid-cols-list gap-2 items-center bg-white hover:bg-lime-100 transition-colors shadow-sm border border-solif border-br-light cursor-pointer"
      onClick={handleSelect}
    >
      <div className="relative w-[45px] h-[45px] rounded-[50%] border border-solid border-neutral-200 ">
        <img
          src={user?.avatar}
          alt={user?.displayName}
          className="group-hover:scale-105 transition overflow-hidden"
        />
        <span
          className={`${
            isActive ? "bg-green-400" : "bg-[#888] "
          } absolute z-[100] -bottom-[2px] right-0 w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
        ></span>
      </div>

      <div className="flex-column gap-1">
        <h4 className="font-semibold tracking-tight leading-5 truncate">
          {user?.displayName}
        </h4>
        {lastMessage && <p className="text-tiny truncate">{lastMessage}</p>}
      </div>

      <div className="flex-column gap-2 !items-center">
        <span className="text-neutral-500 text-tiny">12:30pm</span>
        <div className="relative text-[0.65em] w-[20px] h-[20px] grid place-items-center bg-[#222] rounded-[50%] text-white text-center">
          3
        </div>
      </div>
    </li>
  );
}
export default ChatRow;
