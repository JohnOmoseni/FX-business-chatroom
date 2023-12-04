import { useEffect, useRef, useState } from "react";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { validateMessage } from "@utils";
import { roomID } from "@constants/constants";
import { v4 as uuid } from "uuid";
import { PiImage } from "react-icons/pi";

function ChatRoomInput({ userChat }) {
  const { currentUser } = useSelector((state) => state.authUser);
  const [newMessage, setNewMessage] = useState("");
  const [img, setImg] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current && inputRef.current.focus();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const storageRef = ref(storage, uuid());

    if (img) {
      const uploadTask = uploadBytesResumable(storageRef, img);
      console.log("running img");

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(`File available at ${downloadURL}`);
            await updateDoc(doc(db, "chatroom", roomID), {
              messages: arrayUnion({
                id: uuid(),
                text: newMessage,
                img: downloadURL,
                senderID: currentUser?.uid,
                date: Timestamp.now(),
                roomID,
              }),
            });
          });
        }
      );
    } else {
      if (newMessage === "") return;
      const isValid = validateMessage(newMessage);
      if (!isValid) {
        return;
      }
      await updateDoc(doc(db, "chatroom", roomID), {
        messages: arrayUnion({
          id: uuid(),
          text: newMessage,
          senderID: currentUser?.uid,
          date: Timestamp.now(),
        }),
      });
    }

    setNewMessage("");
    setImg(null);
  };

  return (
    <div className="w-full min-h-[60px] bg-slate-100 flex items-center gap-3  px-4 pr-2">
      <form onSubmit={handleSend} className="w-full flex-1 flex py-2 gap-4">
        <div className="flex-1 flex-row">
          <input
            type="text"
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type something..."
            className="i-reset w-full pr-1 placeholder:text-neutral-400 truncate"
          />
          <div className="flex-row gap-3">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <span>
                <PiImage size={26} color="#aaa" />
              </span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`flex-row px-3 py-2 bg-green-500 bg-opacity-80 text-white rounded-md`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
export default ChatRoomInput;
