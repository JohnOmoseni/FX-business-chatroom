import Chat from "./Chat";

function Messages({ owner }) {
  return (
    <div
      className={`group relative w-full mt-[1px] pt-4 pb-6 px-[3%] flex-1 flex flex-col  gap-4 overflow-y-auto `}
    >
      <div className="flex-row gap-4">
        <hr className="w-[40%] border border-solid border-br-light opacity-40" />
        <span className="text-tiny text-neutral-400">Today</span>
        <hr className="w-[40%] border border-solid border-br-light  opacity-50" />
      </div>

      <Chat />
      <Chat owner />
      <Chat />
      <Chat owner />
      <Chat />
      <Chat owner />
      <Chat />
    </div>
  );
}
export default Messages;
