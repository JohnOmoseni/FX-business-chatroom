import { useEffect, useRef } from "react";
import SendMessage from "../Buttons/SendMessage";

function InputBar() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current && inputRef.current.focus();
  }, []);

  return (
    <div className="w-full min-h-[60px] bg-slate-100 flex items-center gap-3  px-4 pr-2">
      <div className="flex-1 flex py-2">
        <input
          type="text"
          ref={inputRef}
          placeholder="Type something..."
          className="i-reset w-full pr-1 placeholder:text-neutral-400"
        />
        <div className="flex-row gap-3">
          <img src="" alt="" className="w-[24px]" />
          <p>mlcml</p>
          <input type="file" id="file" className="hidden" />
          <label htmlFor="file">
            <img src="" alt="" className="w-[24px]" />
            <p>lscslc</p>
          </label>
        </div>
      </div>
      <SendMessage />
    </div>
  );
}
export default InputBar;
