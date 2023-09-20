"use client";
import { useState } from "react";
import {
	useGetChatMessageQuery,
	useStoreChatMutation,
} from "@/store/api/testApi";

const conversationId = 66;
const TempInput = () => {
	const [message, setMessage] = useState("");

	const { data } = useGetChatMessageQuery(conversationId);

	console.log("data", data);

	const [storeChat, { isLoading, isSuccess, isError, error }] =
		useStoreChatMutation();

	const handleSubmit = (e) => {
		e.preventDefault();
		storeChat({ promt: message, conversationId });
	};

	return (
		<div className="my-3">
			<form onSubmit={handleSubmit} action="">
				<input
					type="text"
					onChange={(e) => setMessage(e.target.value)}
					name=""
					placeholder="Enter your message"
				/>
				<button>Send</button>
			</form>
		</div>
	);
};

export default TempInput;
