const currentUser = {};
const isActive = {};

function UserProfile() {
  return (
    <div>
      UserProfile
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
export default UserProfile;
