import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ list, menuBtn, menuClass, onClick }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`${menuClass} inline-flex items-center w-full rounded-md bg-white p-2 text-sm border border-solid border-br-light opacity-80`}
        >
          {menuBtn() ?? (
            <BsThreeDotsVertical
              size={18}
              className="cursor-pointer"
              color="black"
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-[11px] z-10 mt-3 w-40 origin-top-right divide-y divide-gray-100 rounded-br-md rounded-bl-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {list?.length > 0 &&
            list?.map((item, idx) => {
              return (
                <div className="py-1" key={idx}>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => onClick(item)}
                      >
                        {item}
                      </div>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
