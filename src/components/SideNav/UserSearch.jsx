import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase-config";

function UserSearch({ user, setUser, displayName, avatar, lastMsg, active }) {
  const { currentUser } = useSelector((state) => state.authUser);

  const handleClick = async () => {
    // check whether the foundUser has an existing chat with the current user, if not, create one and add to userChats
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create chat
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            avatar: user.photoURL,
          },
          [combinedId + ".date"]: {
            createdAt: serverTimestamp(),
          },
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            avatar: currentUser.photoURL,
          },
          [combinedId + ".date"]: {
            createdAt: serverTimestamp(),
          },
        });
      }
    } catch (err) {}

    setUser(null);
  };

  return (
    <div
      className="group py-2 px-2 rounded-md grid grid-cols-main gap-3 items-center bg-white hover:bg-lime-100 transition-colors shadow-sm border border-solif border-br-light cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative w-[50px] h-[50px] rounded-[50%] border border-solid border-neutral-200">
        <img
          src={avatar}
          alt={displayName.split(" ")[0]}
          className="group-hover:scale-105 transi"
        />
        <span
          className={`${
            active ? "bg-green-400" : "bg-[#888] "
          } absolute z-[100] -bottom-[2px] right-0 w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
        ></span>
      </div>

      <div className="flex-column gap-2">
        <h4 className="font-semibold tracking-tight leading-5">
          Mel {displayName}
        </h4>
        <p className="text-tiny">{lastMsg}</p>
      </div>
    </div>
  );
}
export default UserSearch;
