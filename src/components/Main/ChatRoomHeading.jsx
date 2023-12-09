import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClosePane } from "@redux/features/appStateSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import Dropdown from "@components/Dropdown";

const IconBg = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} icon w-full rounded-md bg-white p-1 text-sm opacity-80 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
    >
      {children}
    </div>
  );
};

function ChatRoomHeading({ userChat }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = userChat?.avatar;
  const { isPrivateChat } = useSelector((state) => state.usersState);

  const handleBack = () => {
    dispatch(setClosePane({ id: "showChatRoom", val: false }));
    navigate(-1);
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth/sign-in");
    } catch (err) {
      console.log(err.message, "Error logging out");
    }
  };

  return (
    <div className="w-full relative z-50 py-[3%] px-[2%] grid grid-cols-row items-center gap-4 bg-gradient-200 opacity-90 shadow-md min-h-[50px] max-h-[80px]">
      <div className="grid grid-cols-2 gap-3 relative">
        <IconBg onClick={handleBack}>
          <MdOutlineArrowBack color="black" size={18} />
        </IconBg>
      </div>

      <h3 className="font-kinn mt-1 text-center text-[#444] text-shadow">
        FX Chat Room
      </h3>
      <div className="flex-row justify-between gap-3">
        <Dropdown
          list={["Log out"]}
          onClick={handleLogOut}
          menuBtn={() => (
            <BsThreeDotsVertical
              size={18}
              className="cursor-pointer"
              color="black"
            />
          )}
        />
      </div>
    </div>
  );
}
export default ChatRoomHeading;
