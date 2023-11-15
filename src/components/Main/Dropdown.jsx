import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "@constants/NavItems";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { menuVariant } from "@utils";
import { CSSTransition } from "react-transition-group";

const Dropdown = ({ setIsDropdown, isDropdown, selectedObj, setOpenMenu }) => {
  const dropdown = selectedObj?.dropdown;
  const title = selectedObj?.link;

  return (
    <CSSTransition
      in={isDropdown === true}
      timeout={500}
      unmountOnExit
      classNames="menu-secondary"
    >
      <div className="w-full h-full flex-1 overflow-hidden">
        <div className="flex items-center gap-3 p-[2%] px-4">
          <span onClick={() => setIsDropdown(false)}>
            <BsArrowLeft size={18} color="white" />
          </span>
          <h3 className="flex-1 text-center text-shadow">{title}</h3>
        </div>
        <div className="dropdown h-[260px] overflow-y-auto mt-6">
          <ul
            className="w-full px-4 grid items-center
          gap-3"
          >
            {dropdown?.map(({ link, href }, idx) => {
              return (
                <li
                  key={idx}
                  className="py-3 px-2 hover:bg-[#484a4d] rounded-md hover:shadow-md transition-colors cursor-pointer"
                  onClick={() => setOpenMenu(false)}
                >
                  <Link to={href} className="flex-row gap-3">
                    <span className="icon p-2 rounded-[50%] bg-[#383838] shadow-lg">
                      {/* <Icon className="h-5 w-5" aria-hidden="true" /> */}
                    </span>
                    <p className="flex-1 text-shadow text-base leading-none">
                      {link}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </CSSTransition>
  );
};

function DropdownMenu({ setOpenMenu }) {
  const [dropdownId, setDropdownId] = useState("solutions");
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);

  const handleTabClick = (id) => {
    const dropdown = navItems.find((item) => item.id === id);
    if (dropdown) {
      setIsDropdown(true);
      setSelectedObj(dropdown);
      dropdown && setDropdownId(id);
    }
  };

  return (
    <motion.div
      variants={menuVariant}
      initial="hidden"
      animate="animate"
      className="block bg-[#222222] w-[50%] text-white flex-column absolute top-[100%] right-[-2px] border border-solid border-br-light rounded-b-md"
    >
      <div className="w-full my-2">
        {isDropdown ? (
          <Dropdown
            isDropdown={isDropdown}
            setOpenMenu={setOpenMenu}
            selectedObj={selectedObj}
            setIsDropdown={setIsDropdown}
          />
        ) : (
          <CSSTransition
            in={isDropdown === false}
            timeout={500}
            unmountOnExit
            classNames="menu-primary"
          >
            <ul
              className="w-full flex-1 px-2 grid items-center
          overflow-y-auto"
            >
              {navItems.map(({ link, id }, idx) => {
                return (
                  <li
                    key={idx}
                    className="py-3 px-2 flex-row gap-3 hover:bg-[#353535] rounded-md hover:shadow-md transition-colors cursor-pointer"
                    onClick={() => handleTabClick(id)}
                  >
                    <span className="icon p-2 rounded-[50%] bg-[#383838] shadow-lg">
                      {/* <Icon className="h-5 w-5" aria-hidden="true" /> */}
                    </span>
                    <p className="flex-1 text-shadow text-base leading-none">
                      {link}
                    </p>
                    <span>
                      <BsArrowRight size={18} color="white" />
                    </span>
                  </li>
                );
              })}
            </ul>
          </CSSTransition>
        )}
      </div>
    </motion.div>
  );
}

export default DropdownMenu;
