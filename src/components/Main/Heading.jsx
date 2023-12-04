import { MdOutlineArrowBack } from "react-icons/md";
import Dropdown from "@components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsPrivateChat } from "@redux/features/chatSlice";
import { setClosePane } from "@redux/features/appStateSlice";

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
  const { isPrivateChat } = useSelector((state) => state.usersState);

  const handleBack = () => {
    if (isPrivateChat) {
      dispatch(setIsPrivateChat(false));
      dispatch(setClosePane({ id: "showChat", val: false }));
    } else {
      dispatch(setClosePane({ id: "showChatRoom", val: false }));
      navigate(-1);
    }
  };

  return (
    <div className="w-full relative z-50 py-[3%] px-[2%] grid grid-cols-row items-center gap-4 bg-gradient-200 opacity-90 shadow-md min-h-[50px] max-h-[80px]">
      <div className="grid grid-cols-2 gap-3 relative">
        <IconBg onClick={handleBack}>
          <MdOutlineArrowBack color="black" size={18} />
        </IconBg>

        <div className="group icon relative w-[30px] h-[30px] rounded-[50%] border border-solid border-neutral-200">
          <img
            src={avatar ?? ""}
            alt=""
            className="group-hover:scale-105 transition"
          />
        </div>
      </div>

      <h3 className="font-kinn mt-1 text-center text-[#444] text-shadow">
        {isPrivateChat && userChat?.displayName
          ? userChat?.displayName
          : "FX Chat Room"}
      </h3>
      <div className="flex-row justify-between gap-3">
        <Dropdown />
      </div>
    </div>
  );
}
export default Heading;
