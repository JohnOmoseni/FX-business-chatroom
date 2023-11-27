import { MdOutlineArrowBack } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropdownMenu from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsPrivateChat } from "@redux/features/chatSlice";

const IconBg = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} icon w-[25px] h-[25px] rounded-sm bg-green-100 opacity-90  grid place-items-center`}
    >
      {children}
    </div>
  );
};

function Heading({ userChat, openDropdown, setOpenDropdown }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = userChat?.avatar;
  const { isPrivateChat } = useSelector((state) => state.userChat);

  const handleBack = () => {
    if (isPrivateChat) {
      dispatch(setIsPrivateChat(false));
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full relative z-50 py-[3%] px-[2%] grid grid-cols-row items-center gap-4 bg-gradient-200 opacity-90 shadow-md min-h-[50px] max-h-[80px]">
      <div className="flex-row gap-3 relative self-start">
        <IconBg onClick={handleBack}>
          <MdOutlineArrowBack className="icon" color="black" size={18} />
        </IconBg>

        <div className="w-[30px] h-[30px] rounded-[50%]  border border-solid border-br-light self-start">
          <img src={avatar ?? ""} alt="" />
        </div>
      </div>

      <h3 className="font-kinn mt-1 text-center text-[#444] text-shadow">
        {isPrivateChat && userChat?.displayName
          ? userChat?.displayName
          : "FX Chat Room"}
      </h3>
      <div className="flex-row justify-between gap-3 self-start mt-[4px]">
        <IconBg
          className="dropdown-btn"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <BsThreeDotsVertical
            size={18}
            className="cursor-pointer"
            color="black"
          />
        </IconBg>
      </div>
      {openDropdown && <DropdownMenu />}
    </div>
  );
}
export default Heading;
