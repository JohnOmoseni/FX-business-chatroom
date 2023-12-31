import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setClosePane } from "@redux/features/appStateSlice";
import Dropdown from "@components/Dropdown";
import useAuthContext from "@context/AuthContext";

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

function ChatRoomHeading() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logOut } = useAuthContext();
  const { screenSize } = useSelector((state) => state.appState);

  const handleBack = () => {
    if (screenSize >= 768) {
      navigate(-1);
    } else {
      dispatch(setClosePane({ id: "showChatRoom", val: false }));
    }
  };

  const handleLogOut = async () => {
    await logOut();
  };

  return (
    <div className="w-full relative z-50 py-[3%] px-[2%] md:py-3.5 md:px-3  grid grid-cols-row items-center gap-4 bg-gradient-200 opacity-90 shadow-md min-h-[50px] max-h-[100px]">
      <div className="grid grid-cols-2 gap-3 relative">
        <IconBg onClick={handleBack}>
          <MdOutlineArrowBack color="black" size={18} />
        </IconBg>
      </div>

      <h3 className="font-kinn mt-1 text-center text-[#444] leading-5 text-shadow">
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
