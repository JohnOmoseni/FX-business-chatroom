import { MdOutlineArrowBack } from "react-icons/md";
import Dropdown from "@components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsPrivateChat } from "@redux/features/chatSlice";

const IconBg = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} icon inline-flex w-full rounded-md bg-white p-2 text-sm opacity-80 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
    >
      {children}
    </div>
  );
};

function Heading({ userChat }) {
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

        <div className="w-full border border-solid border-br-light  overflow-hidden rounded-[50%]">
          <img src={avatar ?? ""} alt="" className="w-[30px] h-[30px]" />
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
