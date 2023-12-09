import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsPrivateChat } from "@redux/features/chatSlice";
import { setClosePane } from "@redux/features/appStateSlice";
import ChatDropdown from "./ChatDropdown";
import { setVisibleRightPane } from "@redux/features/appStateSlice";
import { setBusinessProfile } from "@redux/features/chatSlice";

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

function Heading({ userChat }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = userChat?.avatar;
  const { user, isPrivateChat } = useSelector((state) => state.usersState);

  const handleBack = () => {
    if (isPrivateChat) {
      dispatch(setIsPrivateChat(false));
      dispatch(setClosePane({ id: "showChat", val: false }));
    } else {
      dispatch(setClosePane({ id: "showChatRoom", val: false }));
      navigate(-1);
    }
  };

  const handleProfileNavigate = () => {
    dispatch(setVisibleRightPane({ id: "businessProfile", val: true }));
    dispatch(setBusinessProfile(user));
    console.log(user);
  };

  return (
    <div className="w-full relative z-50 py-[3%] px-[2%] grid grid-cols-row items-center gap-4 bg-gradient-200 opacity-90 shadow-md min-h-[50px] max-h-[80px]">
      <div className="grid grid-cols-2 gap-3 relative">
        <IconBg onClick={handleBack}>
          <MdOutlineArrowBack color="black" size={18} />
        </IconBg>

        <div
          className="group icon relative w-[32px] h-[32px] rounded-[50%] border border-solid border-neutral-200 clip-circle"
          onClick={handleProfileNavigate}
        >
          <img
            src={avatar ?? ""}
            alt=""
            className="group-hover:scale-105 transition"
          />
        </div>
      </div>

      <h3 className="font-kinn mt-1 text-center text-[#444] text-shadow">
        {isPrivateChat && userChat?.displayName
          ? userChat?.businessName
          : userChat?.displayName}
      </h3>
      <div className="flex-row justify-between gap-3">
        <ChatDropdown />
      </div>
    </div>
  );
}
export default Heading;
