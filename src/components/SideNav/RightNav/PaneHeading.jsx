import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setVisibleRightPane } from "@redux/features/appStateSlice";
import { setCloseRightPane } from "@redux/features/appStateSlice";

function PaneHeading({ title, onClick, isVisible, backTo = "userProfile" }) {
  const { screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const handleBackArrowClick = () => {
    if (screenSize >= 768) {
      dispatch(setVisibleRightPane({ id: backTo, val: true }));
    } else {
      dispatch(setCloseRightPane());
    }
  };
  return (
    <div className="w-full pt-6 pb-4 px-[2%] flex-row gap-4 !justify-start opacity-80 shadow-md">
      {(screenSize < 768 || (screenSize >= 768 && isVisible)) && (
        <div
          onClick={onClick ? onClick : handleBackArrowClick}
          className="icon absolute p-2 text-sm rounded-sm transition hover:ring-1 ring-inset ring-gray-200 hover:scale-95"
        >
          <MdOutlineArrowBack color="black" size={18} />
        </div>
      )}

      <h3 className="flex-2 w-full font-kinn text-center text-[#444] text-shadow">
        {title}
      </h3>
    </div>
  );
}
export default PaneHeading;
