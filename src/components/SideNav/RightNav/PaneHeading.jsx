import { MdOutlineArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";

function PaneHeading({ title, onClick, isVisible }) {
  const { screenSize } = useSelector((state) => state.appState);

  return (
    <div className="w-full pt-6 pb-4 px-[2%] flex-row gap-4 !justify-start opacity-80 shadow-md">
      {(screenSize < 768 || (screenSize >= 768 && isVisible)) && (
        <div
          onClick={onClick}
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
