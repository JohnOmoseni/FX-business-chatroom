import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatRow from "./ChatRow";
import { setUsers } from "@redux/features/usersSlice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";

function Business() {
  const { currentUser } = useSelector((state) => state.authUser);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let usersArray = [];

        querySnapshot.forEach((doc) => {
          usersArray.push(doc.data());
        });
        const otherUsers = usersArray.filter(
          (user) => user?.uid !== currentUser?.uid
        );
        dispatch(setUsers(otherUsers));
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [currentUser?.uid]);

  return (
    <div
      className={`${
        users.length === 0 ? "grid place-items-center" : ""
      } pb-6 flex-1 w-full overflow-y-auto relative`}
    >
      {users.length > 0 ? (
        <ul className="flex-column gap-6">
          {users?.map((user) => {
            return <ChatRow key={user.uid} user={user} />;
          })}
        </ul>
      ) : (
        <div className="text-neutral-500">
          <p className="text-shadow">No registered users</p>
        </div>
      )}
    </div>
  );
}
export default Business;
