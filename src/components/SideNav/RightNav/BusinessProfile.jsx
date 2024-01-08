import { CiLocationOn } from "react-icons/ci";
import { PiPhoneLight } from "react-icons/pi";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import PaneHeading from "./PaneHeading";
import { setCloseRightPane } from "@redux/features/appStateSlice";

const tabClassName =
  "w-full flex-row gap-3 p-4 shadow-sm rounded-md transition border border-solid border-green-100 hover:drop-shadow-sm hover:scale-105 focus-visible:outline-1 focus-visible:outline focus-within:outline-green-500 bg-green-100  opacity-90";

const List = ({ icon, label, value }) => (
  <div className={`${tabClassName} !py-2 !bg-neutral-100`}>
    <span>{icon}</span>
    <p className="flex-1 w-full pr-3">
      <span className="text-sm text-neutral-500 tracking-wide">
        {label ?? "-"}
      </span>
      <span className="font-semibold break-words truncate">{value ?? "-"}</span>
    </p>
  </div>
);

function BusinessProfile() {
  const { businessProfile } = useSelector((state) => state.usersState);
  const { isActive } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  console.log(businessProfile);

  return (
    <>
      <PaneHeading
        title="Profile"
        onClick={() => dispatch(setCloseRightPane())}
      />
      <div className="w-full pt-10 pb-4 px-4 overflow-auto">
        <div className="flex-column gap-4 !items-center md:!items-start md:flex-row md:!justify-start px-4 md:gap-clamp-sm">
          <div className="relative min-w-[120px] w-[120px] h-[120px] md:min-w-[100px] md:h-[100px] clip-circle rounded-[50%] border border-solid border-neutral-200 shadow-md">
            <img
              src={businessProfile?.avatar ?? ""}
              alt=""
              className="group-hover:scale-105 transition"
            />
            <span
              className={`${
                isActive ? "bg-green-400" : "bg-[#888] "
              } absolute z-[100] bottom-[2px] right-[4px] w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
            ></span>
          </div>
          <div className="pr-3 text-center md:text-left">
            <h3 className="font-kinn mt-6 text-shadow text-gradient-100 capitalize">
              {businessProfile?.businessName ?? "Unknown"}
            </h3>
            <span className="!text-[#555555]">
              {businessProfile?.displayName
                ? `@${businessProfile?.displayName}`
                : "unknown"}
            </span>

            {businessProfile?.country && (
              <p className="mt-3 flex-row gap-2 font-semibold md:justify-start">
                <CiLocationOn size={20} />
                {businessProfile?.country ?? "-"}
              </p>
            )}
          </div>
        </div>

        <div className="flex-column w-[90%] my-[20%] mx-auto gap-6 p-4 shadow-md rounded-sm">
          <List
            icon={<AiOutlineMail size={20} />}
            label="Email"
            value={businessProfile?.email}
          />
          <List
            icon={<PiPhoneLight size={20} />}
            label="Phone Number"
            value={businessProfile?.phoneNo}
          />
        </div>
      </div>
    </>
  );
}
export default BusinessProfile;
