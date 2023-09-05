"use client";
import { useStoreChatMutation } from "@/store/api/chatStoreApi";
import Image from "next/image";
import { useState } from "react";

const AutoExpandingTextarea = () => {
	const [userValue, setUserValue] = useState("");
	const [storeChat] = useStoreChatMutation();

	const handleSubmitUserValue = (e) => {
		e.preventDefault();
		storeChat({
			promt: userValue,
		});
		console.log("userValue", userValue);
	};

	return (
		<form onSubmit={handleSubmitUserValue}>
			<input
				onChange={(e) => setUserValue(e.target.value)}
				type="text"
				className="border"
			/>
			<button type="submit" className="chat-textarea-button">
				<Image src="/assets/send.png" alt="send" height="20" width="20" />
			</button>
		</form>
	);
};

export default AutoExpandingTextarea;
