import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setVisibleRightPane } from "@redux/features/appStateSlice";
import { setBusinessProfile } from "@redux/features/chatSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChatDropdown() {
  const { user } = useSelector((state) => state.usersState);

  const dispatch = useDispatch();

  const handleClick = (id) => {
    const isPane = [
      "userProfile",
      "tradeWallet",
      "userWallet",
      "currencyList",
      "businessProfile",
    ]?.some((val) => val === id);

    if (!isPane) {
      dispatch(setVisibleRightPane({ id: "userProfile", val: true }));
      return;
    }
    dispatch(setVisibleRightPane({ id, val: true }));
    dispatch(setBusinessProfile(user));
    console.log(user);
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full rounded-md bg-white p-2 text-sm  shadow-sm ring-1 ring-inset ring-gray-300  opacity-80 hover:bg-gray-50">
          <BsThreeDotsVertical
            size={18}
            className="cursor-pointer"
            color="black"
          />
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
        <Menu.Items className="absolute -right-[11px] z-10 mt-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("userWallet")}
                >
                  Personal Wallet
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("tradeWallet")}
                >
                  Trade Account
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("businessProfile")}
                >
                  User Profile
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                  onClick={() => handleClick("currencyList")}
                >
                  Currency List
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
