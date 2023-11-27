import { BiSearchAlt } from "react-icons/bi";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { useSelector } from "react-redux";

function Search({ setUser, searchUser, setSearchUser, setErrorSearch }) {
  const { users } = useSelector((state) => state.users);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchUser)
    );
    try {
      const querySnapshot = await getDocs(q);
      const fromCache = querySnapshot._snapshot.fromCache;
      const array = [];

      if (fromCache) {
        setErrorSearch(true);
      }
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
        console.log(doc.data());
      });
      array.length > 0 && setUser(array);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchUser(val);

    const foundUsers = users?.filter((user) =>
      user?.displayName.toLowerCase().includes(val.toLowerCase())
    );
    console.log(foundUsers);
    if (foundUsers?.length > 0) {
      setUser(foundUsers);
    } else {
      setUser(users);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="px-3 py-3.5 mx-auto w-[95%] relative rounded-md shadow-sm border border-solid border-br-light">
      <span className="icon absolute center right-3 align-middle">
        <BiSearchAlt size={16} fill="#888" />
      </span>

      <input
        type="text"
        name="search"
        value={searchUser}
        placeholder="Search..."
        onChange={handleInputChange}
        onKeyDown={handleKey}
        className="w-full i-reset placeholder:text-base placeholder:text-neutral-500"
      />
    </div>
  );
}
export default Search;
