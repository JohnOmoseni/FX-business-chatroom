import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export function Chat({ msg, startMsg }) {
  const { currentUser } = useSelector((state) => state.authUser);

  const owner = msg?.senderID === currentUser?.uid;
  const newMsgRef = useRef();

  useEffect(() => {
    newMsgRef?.current &&
      newMsgRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [msg]);

  return (
    <div
      ref={newMsgRef}
      className={`flex items-center ${
        owner ? "flex-row-reverse" : "flex-row"
      }  ${startMsg ? "gap-2 " : "mt-[-0.4rem]"} !justify-start gap-3.5`}
    >
      <div
        className={`${
          owner
            ? "max-w-[60%] bg-slate-100 after:border-t-slate-200 "
            : "max-w-[70%] bg-green-100 after:border-t-green-100 "
        } relative  min-w-[100px] py-1.5 px-3 flex-column bg-green-100 rounded-md shadow-sm ${
          startMsg
            ? "after:absolute after:top-0 after:right-[100%] after:border-8 "
            : "rounded-md"
        } after:translate-x-[8px] after:border-solid after:border-b-transparent after:border-x-transparent after:-z-[1px] after:rounded-ss-md`}
      >
        <div>
          <p className="leading-5 text-regular break-words">{msg?.text}</p>
          {msg?.img && (
            <div className="my-2 rounded-sm max-h-[250px] overflow-hidden">
              <img src={msg.img} alt="" />
            </div>
          )}
        </div>
        <span className="text-tiny py-[1px] text-neutral-400 text-shadow text-right w-full"></span>
      </div>
    </div>
  );
}
export default Chat;
