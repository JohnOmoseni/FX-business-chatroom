import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatRow from "./ChatRow";
import { setUsers } from "@redux/features/chatSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";

function Business() {
  const { currentUser } = useSelector((state) => state.authUser);
  const { users } = useSelector((state) => state.usersState);
  const dispatch = useDispatch();

  const sortFunction = (a, b) => {
    const objA = a.displayName;
    const objB = b.displayName;
    return objA.localeCompare(objB);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let usersArray = [];

        querySnapshot.forEach((doc) => {
          usersArray.push(doc.data());
        });
        dispatch(setUsers(usersArray));
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [currentUser?.uid]);

  const otherUsers = useMemo(() => {
    return users
      ?.filter((user) => user?.uid !== currentUser?.uid)
      ?.sort(sortFunction);
  }, [currentUser?.uid]);

  return (
    <div
      className={`${
        users.length === 0 ? "grid place-items-center" : ""
      } pb-6 flex-1 w-full overflow-y-auto relative`}
    >
      {users.length > 0 ? (
        <ul className="flex-column gap-6">
          {otherUsers?.map((user) => {
            return <ChatRow key={user.uid} user={user} />;
          })}
        </ul>
      ) : (
        <p className="text-neutral-500 text-shadow text-center">
          No registered users
        </p>
      )}
    </div>
  );
}
export default Business;
