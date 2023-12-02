import { setActivePane } from "@redux/features/appStateSlice";
import { useDispatch, useSelector } from "react-redux";

const currentUser = {};
const isActive = {};

function RightNav() {
  const { visiblePane, screenSize } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const handleCloseRightPane = () => {
    if (visiblePane?.showRightPane && screenSize <= 760) {
      dispatch(setActivePane({ id: showRightPane, val: false }));
    }
  };
  return (
    <div className="w-full flex-column !items-center pt-8 md:pt-[12%]">
      <div className="relative w-[80px] h-[80px] rounded-[50%] border border-solid border-neutral-200 shadow-sm">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.displayName}
          className="group-hover:scale-105 transition"
        />
        <span
          className={`${
            isActive ? "bg-green-400" : "bg-[#888] "
          } absolute z-[100] bottom-[2px] right-[4px] w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
        ></span>
      </div>
      <h3 className="text-center font-kinn mt-6 mb-2">Johnny Maestro</h3>
      <p className="text-sm">Some business address</p>
      <div className="flex-2"></div>
    </div>
  );
}
export default RightNav;
