import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { formatDateStatus } from "@utils";

const DateStatus = ({ status }) => (
	<div className="flex-row gap-4 mb-1">
		<hr className="w-[45%] border border-solid border-br-light opacity-40" />
		<span className="text-tiny text-neutral-400 capitalize whitespace-nowrap">
			{status}
		</span>
		<hr className="w-[45%] border border-solid border-br-light  opacity-50" />
	</div>
);

function Messages({ chatId }) {
	const [messages, setMessages] = useState([]);
	const elemRef = useRef(null);

	useEffect(() => {
		if (chatId) {
			const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
				console.log(doc.data());
				doc.exists() && setMessages(doc.data().messages);
			});

			return () => {
				unsub();
			};
		}
	}, [chatId]);

	useEffect(() => {
		elemRef?.current &&
			elemRef.current?.scrollIntoView({ behaviour: "smooth" });
	}, [chatId]);

	let startOfUserMsg = "";
	let lastDateStatus = "";
	const array = [];

	messages.length > 0 &&
		messages?.forEach((msg, idx) => {
			let dateStatus = formatDateStatus(msg?.date);

			if (lastDateStatus !== dateStatus) {
				array.push(<DateStatus status={dateStatus} key={dateStatus} />);
				array.push(
					<Chat msg={msg} key={msg.id} messages={messages} startMsg />
				);
			} else {
				if (startOfUserMsg !== messages[idx]?.senderID) {
					array.push(
						<Chat msg={msg} key={msg.id} messages={messages} startMsg />
					);
				} else {
					array.push(<Chat msg={msg} key={msg.id} messages={messages} />);
				}
			}

			lastDateStatus = dateStatus;
			startOfUserMsg = messages[idx]?.senderID;
		});

	return (
		<div
			className={`group relative w-full h-full pt-5 pb-4 px-[4%] flex flex-col gap-4 overflow-x-hidden overflow-y-auto`}
		>
			{array.length > 0 && array?.map((row) => row)}
			<div
				ref={elemRef}
				className="min-h-8 w-10 select-none pointer-events-none"
			></div>
		</div>
	);
}
export default Messages;
