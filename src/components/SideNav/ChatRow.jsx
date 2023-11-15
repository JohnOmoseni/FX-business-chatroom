function ChatRow({ name, desc, createdAt, msgCount, avatar, active }) {
  return (
    <li className="group py-2 px-2 rounded-md grid grid-cols-main gap-3 items-center bg-white hover:bg-lime-100 transition-colors shadow-sm border border-solif border-br-light cursor-pointer">
      <div className="relative w-[50px] h-[50px] rounded-[50%] border border-solid border-neutral-200">
        <img
          src={avatar}
          alt={name.split(" ")[0]}
          className="group-hover:scale-105 transi"
        />
        <span
          className={`${
            active ? "bg-green-400" : "bg-[#888] "
          } absolute z-[100] -bottom-[2px] right-0 w-[14px] h-[14px] rounded-[50%] shadow-sm border border-solid border-neutral-300`}
        ></span>
      </div>

      <div className="flex-column gap-2">
        <h4 className="font-semibold tracking-tight leading-5">Mel {name}</h4>
        <p className="text-tiny">{desc}</p>
      </div>

      <div className="flex-column gap-2 !items-center">
        <span className="text-neutral-500 text-tiny">{createdAt}</span>
        <span className="text-tiny w-[25px] h-[25px] grid place-items-center bg-[#222] rounded-[50%] text-white">
          {msgCount}
        </span>
      </div>
    </li>
  );
}
export default ChatRow;
