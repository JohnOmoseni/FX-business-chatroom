import { useEffect, useRef, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { validateMessage } from "@utils";
import { PiImage } from "react-icons/pi";
import { BsFillSendXFill } from "react-icons/bs";

function InputBar({ userChat, chatId }) {
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
            await updateDoc(doc(db, "chats", chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: newMessage,
                img: downloadURL,
                senderID: currentUser?.uid,
                date: Timestamp.now(),
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

      try {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: newMessage,
            senderID: currentUser?.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [chatId + ".lastMessage"]: newMessage,
          [chatId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", userChat?.uid), {
          [chatId + ".lastMessage"]: newMessage,
          [chatId + ".date"]: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    }

    setNewMessage("");
    setImg(null);
  };

  return (
    <div className="w-full min-h-[4rem] bg-slate-100 flex items-center gap-3 px-4 pr-2">
      <form
        onSubmit={handleSend}
        className="w-full flex-1 flex-row pt-2 pb-3 gap-4"
      >
        <div className="flex-1 flex-row">
          <input
            type="text"
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type something..."
            className="i-reset w-full pr-1 placeholder:text-neutral-400"
          />

          <div title="Send image">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file" className="icon grid place-items-center">
              <span>
                <PiImage size={26} color="#aaa" />
              </span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`flex-row gap-2 px-3 py-2 bg-green-500 text-white rounded-md`}
        >
          <span className="icon">
            <BsFillSendXFill size={16} color="white" className="opacity-70" />
          </span>
          Send
        </button>
      </form>
    </div>
  );
}
export default InputBar;
