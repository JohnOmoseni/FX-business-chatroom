import { useEffect, useRef, useState } from "react";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { validateMessage } from "@utils";
import { roomID } from "@constants/constants";
import { v4 as uuid } from "uuid";
import { BsEmojiSmile } from "react-icons/bs";
import { PiImage } from "react-icons/pi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function ChatRoomInput({ userChat }) {
	const { currentUser } = useSelector((state) => state.authUser);
	const { screenSize } = useSelector((state) => state.appState);
	const [newMessage, setNewMessage] = useState("");
	const [img, setImg] = useState(null);
	const [showEmoji, setShowEmoji] = useState("");
	const inputRef = useRef(null);
	const emojiContainerRef = useRef(null);

	useEffect(() => {
		inputRef?.current && inputRef.current.focus();
	}, []);

	useEffect(() => {
		if (newMessage === "") {
			inputRef?.current.setAttribute("rows", "1");
		}
	}, [newMessage]);

	const handleEmojiSelect = (emoji) => {
		const symbol = emoji.unified.split("_");
		const codeArray = [];
		symbol.forEach((sym) => codeArray.push(`0x${sym}`));

		let em = String.fromCodePoint(...codeArray);
		setNewMessage(newMessage + em);
	};

	const handleInputChange = (e) => {
		setNewMessage(e.target.value);
		adjustTextAreaHeight();
	};
	const handleKeyDown = (e) => {
		// if (e.code === "Enter") {
		//   handleSend(e);
		// }
	};

	const adjustTextAreaHeight = () => {
		const textarea = inputRef?.current;

		// max no of rows
		const maxRows = 5;
		const lineHeight = parseInt(
			window.getComputedStyle(textarea).lineHeight,
			10
		);
		const rows = Math.min(
			maxRows,
			Math.floor(textarea.scrollHeight / lineHeight)
		);

		textarea.rows = rows;
		if (rows >= 5) {
			textarea.style.overflowY = "auto";
		}
	};

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
						await updateDoc(doc(db, "chatroom", roomID), {
							messages: arrayUnion({
								id: uuid(),
								text: newMessage,
								img: downloadURL,
								senderID: currentUser?.uid,
								businessName: currentUser?.businessName,
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
		<div className="w-full mt-auto min-h-[4rem] bg-slate-100 flex-row px-4 py-1 pr-3 border-y border-solid border-br-light">
			<form onSubmit={handleSend} className="w-full flex-row py-2 gap-3">
				<div className="flex-1 flex-row gap-3">
					<div title="emoji" className="relative  hover:text-slate-800">
						<BsEmojiSmile
							color="#333"
							className="opacity-90"
							size={18}
							onClick={() => setShowEmoji(!showEmoji)}
						/>
						{showEmoji && (
							<div
								ref={emojiContainerRef}
								className="absolute bottom-[150%] left-0"
							>
								<Picker
									data={data}
									emojiSize={20}
									emojiButtonSize={28}
									maxFrequentRows={0}
									previewPosition="top"
									perLine={screenSize >= 640 ? 12 : 7}
									theme="light"
									navPosition="bottom"
									onEmojiSelect={handleEmojiSelect}
								/>
							</div>
						)}
					</div>

					<textarea
						type="text"
						ref={inputRef}
						value={newMessage}
						onChange={handleInputChange}
						onKeyDown={handleKeyDown}
						placeholder="Type something..."
						rows={1}
						className="i-reset !whitespace-normal w-full pr-1 placeholder:text-neutral-400"
					/>
					<div title="Send image">
						<input
							type="file"
							id="file"
							className="hidden"
							onChange={(e) => setImg(e.target.files[0])}
						/>
						<label htmlFor="file">
							<span className="icon">
								<PiImage size={24} color="#555" />
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
