import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatRow from "./ChatRow";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

function Conversations() {
  const { currentUser } = useSelector((state) => state.authUser);
  const [usersChat, setUsersChat] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          console.log(doc.data());
          setUsersChat(doc.data());
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
        <div className="">
          <p>No Conversations</p>
        </div>
      )}
    </div>
  );
}
export default Conversations;
