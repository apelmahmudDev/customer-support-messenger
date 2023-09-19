"use client";
import SendIcon from "./SendIcon";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutoSizeTextArea from "@/hook/useAutoSizeTextArea";
import {
	storeConversationId,
	storeTempMessage,
} from "@/store/slices/chatSlice";
import { useAddChatMutation } from "@/store/api/chatApi";
import { setBotTyping } from "@/store/slices/uiSlice";

const AutoExpandingTextarea = () => {
	const dispatch = useDispatch();
	const { conversationId } = useSelector((state) => state.chat);
	const { isBotTyping } = useSelector((state) => state.ui);
	const [isDisabled, setIsDisabled] = useState(true);
	const [value, setValue] = useState("");
	const textAreaRef = useRef(null);

	const [addChat, { data, isSuccess }] = useAddChatMutation();

	useAutoSizeTextArea(textAreaRef.current, value);

	useEffect(() => {
		if (value.length > 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}, [value]);

	const handleChange = (e) => {
		setValue(e.target?.value);
	};

	const handleSubmitUserValue = (e) => {
		e.preventDefault();
		dispatch(setBotTyping(true));
		dispatch(
			storeTempMessage({
				user_message: value,
				id: Date.now().toString(),
				isTemp: true,
			})
		);
		addChat({
			promt: value,
			chatId: conversationId,
		});
		setValue("");
	};

	const handleKeyPress = (e) => {
		if (value.length && e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			dispatch(setBotTyping(true));
			dispatch(
				storeTempMessage({
					user_message: value,
					id: Date.now().toString(),
					isTemp: true,
				})
			);
			addChat({
				promt: value,
				chatId: conversationId,
			});
			setValue("");
		}
	};

	// set conversationId after sending message
	useEffect(() => {
		if (isSuccess && data?.response?.records?.id) {
			dispatch(storeConversationId(data?.response?.records?.id));
		}
	}, [isSuccess, data?.response?.records?.id, dispatch]);

	return (
		<form onSubmit={handleSubmitUserValue} className="w-full">
			<div className="chat-send-box">
				<textarea
					className="chat-textarea"
					id="chat-textarea"
					onChange={handleChange}
					onKeyDown={handleKeyPress}
					placeholder="Write your message.."
					ref={textAreaRef}
					rows={1}
					value={value}
					style={{ maxHeight: "200px" }}
					autoFocus
				/>
				<button
					className="chat-send-btn"
					disabled={isDisabled || isBotTyping}
				>
					<span className="text-primary-dark" data-state="closed">
						<SendIcon />
					</span>
				</button>
			</div>
		</form>
	);
};

export default AutoExpandingTextarea;
