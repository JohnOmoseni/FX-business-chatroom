import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatRow from "./ChatRow";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { setUserChats } from "@redux/features/chatSlice";

function Conversations() {
  const { currentUser } = useSelector((state) => state.authUser);
  const [usersChat, setUsersChat] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setUsersChat(doc.data());
          const entries = Object.entries(doc.data());
          const array = entries?.map((arr) => {
            return {
              ...arr[1].userInfo,
              chatId: arr[0],
              date: Object.entries(arr[1]?.date),
              lastMessage: arr[1].lastMessage,
            };
          });
          dispatch(setUserChats(array));
          console.log(array);
        },
        (err) => console.log(err)
      );
      return () => {
        unsubscribe();
      };
    };
    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  return (
    <div
      className={`${
        Object.entries(usersChat).length === 0 ? "grid place-items-center" : ""
      } pb-6 flex-1 w-full overflow-y-auto relative`}
    >
      {Object.entries(usersChat).length > 0 ? (
        <ul className="flex-column gap-6">
          {Object.entries(usersChat)
            ?.sort((a, b) => b[1].date - a[1].date)
            ?.map((user) => {
              return (
                <ChatRow key={user[0]} user={user[1].userInfo} {...user[1]} />
              );
            })}
        </ul>
      ) : (
        <div className="text-neutral-500">
          <p className="text-shadow">No Conversations</p>
        </div>
      )}
    </div>
  );
}
export default Conversations;
