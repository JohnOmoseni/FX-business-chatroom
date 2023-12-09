import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { MdKeyboardArrowRight, MdLogout } from "react-icons/md";
import Button from "@components/Button";
import { useDispatch, useSelector } from "react-redux";
import PaneHeading from "./PaneHeading";
import {
  setVisibleRightPane,
  setCloseRightPane,
} from "@redux/features/appStateSlice";
import EditProfile from "./EditProfile";
import { auth } from "../../../config/firebase-config";
import { signOut } from "firebase/auth";
import placeholderImg from "@assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const test = true;

const tabClassName =
  "w-full flex-row gap-3 p-4 shadow-sm rounded-md transition border border-solid border-green-100 hover:drop-shadow-sm hover:scale-105 focus-visible:outline-1 focus-visible:outline focus-within:outline-green-500 bg-green-100  opacity-90";

const List = ({ icon, label, value }) => (
  <div className={`${tabClassName} !py-2 !bg-neutral-100`}>
    <span className="pl-2">{icon}</span>
    <p className="flex-1 w-full pr-3">
      <span className="text-sm text-neutral-500 tracking-wide">{label}</span>
      <span className="font-semibold truncate">{value}</span>
    </p>
  </div>
);

function UserProfile() {
  const [isEditProfile, setEditProfile] = useState(false);
  const { currentUser: userProfile, isActive } = useSelector(
    (state) => state.authUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(userProfile);

  const handleLogOut = async () => {
    alert("Do you wanna sign out");
    try {
      signOut(auth);
      navigate("/auth/sign-in");
    } catch (err) {
      console.log(err.message, "Error logging out");
    }
  };

  const handleNavigate = (id) => {
    if (id === "userWallet") {
      dispatch(setVisibleRightPane({ id, val: true }));
    } else {
      dispatch(setVisibleRightPane({ id, val: true }));
    }
  };

  return isEditProfile ? (
    <EditProfile setEditProfile={setEditProfile} />
  ) : (
    <>
      <PaneHeading
        title="Profile"
        onClick={() => dispatch(setCloseRightPane())}
      />
      <div className="w-full py-4 px-4 overflow-auto">
        <div className="flex-column mx-auto md:w-[95%] gap-4 !items-center md:flex-row md:gap-clamp-sm">
          <div className="relative w-[140px] h-[140px] md:w-[100px] md:h-[100px] clip-circle rounded-[50%] border border-solid border-neutral-200 shadow-md">
            <img
              src={userProfile?.avatar ?? placeholderImg}
              alt=""
              className="group-hover:scale-105 transition"
            />
            <span
              className={`${
                isActive ? "bg-green-400" : "bg-[#888] "
              } absolute z-[100] bottom-[2px] right-[4px] w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
            ></span>
          </div>
          <div className="pr-3 flex-1 text-center md:text-left">
            <h3 className="font-kinn mt-6 text-shadow text-gradient-100">
              {userProfile?.businessName}
            </h3>
            <span className="!text-[#555555] ">
              @{userProfile?.displayName}
            </span>

            {userProfile?.country && (
              <p className="mt-3 flex-row gap-2 font-semibold md:justify-start">
                <CiLocationOn size={20} />
                {userProfile?.country}
              </p>
            )}
          </div>
        </div>

        <div className="w-full" onClick={() => setEditProfile(true)}>
          <Button
            title="Edit profile"
            icon={<FaRegEdit size={20} />}
            className="flex-row mx-auto mt-14 mb-12 text-lg !py-3 w-[80%] transition-100 hover:drop-shadow-sm hover:scale-x-105 active:scale-95 active:translate-y-1 bg-gradient-200 opacity-80"
          />
        </div>

        <div className="flex-column w-[90%] mx-auto gap-6 p-4 shadow-md rounded-sm">
          <List
            icon={<AiOutlineMail size={20} />}
            label="Email"
            value={userProfile?.email}
          />
          <List
            icon={<PiPhoneLight size={20} />}
            label="Phone Number"
            value={userProfile?.phoneNo}
          />
        </div>

        <div className="mt-12 w-full flex-column gap-6">
          <div
            className={`${tabClassName} cursor-pointer ring-1 ring-inset ring-zinc-200`}
            onClick={() => handleNavigate("userWallet")}
          >
            <span className="flex-1 font-semibold">Account Wallet</span>
            <MdKeyboardArrowRight size={20} />
          </div>
          <div
            className={`${tabClassName} cursor-pointer`}
            onClick={() => handleNavigate("tradeWallet")}
          >
            <span className="flex-1 font-semibold">Exchange Wallet</span>
            <MdKeyboardArrowRight size={20} />
          </div>
        </div>

        <Button
          title="Sign out"
          icon={<MdLogout size={20} />}
          className="flex-row w-[90] ml-auto mt-14 mb-3 ring-1 ring-inset ring-slate-300 transition hover:drop-shadow-sm bg-slate-200 opacity-90"
          onClick={handleLogOut}
        />
      </div>
    </>
  );
}
export default UserProfile;
