import { useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import DropdownMenu from "./Dropdown";

const IconBg = ({ children, setOpenDropdown, openDropdown }) => {
  return (
    <div
      onClick={() => setOpenDropdown(!openDropdown)}
      className="w-[25px] h-[25px] rounded-sm bg-neutral-400 grid place-items-center"
    >
      {children}
    </div>
  );
};

function Heading() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="w-full relative z-50 py-[3%] px-[2%] grid grid-cols-row items-center gap-4 bg-neutral-300 opacity-90 shadow-md min-h-[50px] max-h-[80px]">
      <div className="flex-row gap-3 relative self-start mt-[4px]">
        <IconBg>
          <MdOutlineLocationOn className="icon" color="white" size={16} />
        </IconBg>
        <div className="w-[25px] h-[25px] rounded-[50%]  border border-solid border-br-light self-start">
          <img src="" alt="" />
        </div>
      </div>
      <h3 className="font-kinn text-center ">Fx Business Room</h3>
      <div className="flex-row justify-between gap-3 self-start mt-[4px]">
        <IconBg setOpenDropdown={setOpenDropdown} openDropdown={openDropdown}>
          <BsArrowRight />
          <DropdownMenu />
        </IconBg>
        <IconBg></IconBg>
      </div>
    </div>
  );
}
export default Heading;
