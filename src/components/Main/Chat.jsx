function Chat({ owner }) {
  return (
    <div
      className={`flex items-center ${
        owner ? "flex-row-reverse" : "flex-row"
      } !justify-start gap-4`}
    >
      <div className="w-[30px] h-[30px] rounded-[50%] border border-solid border-br-light self-start">
        <img src="" alt="" />
      </div>
      <div
        className={`${
          owner
            ? "max-w-[60%] bg-slate-100 after:border-t-slate-200 "
            : "max-w-[70%] bg-green-100 after:border-t-green-100 "
        } relative  min-w-[100px] py-1.5 px-3 flex-column bg-green-100 rounded-md shadow-sm after:absolute after:top-0 after:right-[100%] after:translate-x-[8px] after:border-8 after:border-solid after:border-b-transparent after:border-x-transparent after:-z-[1px] after:rounded-ss-md`}
      >
        <p className="w-full text-base  text-left text-shadow flex-row !justify-between mb-[2px]">
          <span className="tracking-tight">Evelyn</span>
          <span className="text-tiny tracking-normal">Yeeah</span>
        </p>
        <p className="leading-5 text-regular">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          doloribus consectetur vel et! Illum pariatur molestias quam dolore
          amet, ut dolores aperiam sequi iste enim voluptatem ipsam nulla
          perferendis exercitationem.
        </p>
        <span className="text-tiny py-[1px] text-neutral-400 text-shadow text-right w-full">
          12:46 pm
        </span>
      </div>
    </div>
  );
}
export default Chat;
