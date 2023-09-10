"use client";
import SendIcon from "./SendIcon";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAutoSizeTextArea from "@/hook/useAutoSizeTextArea";
import { useStoreChatMutation } from "@/store/api/chatStoreApi";
import { storeConversationId } from "@/store/slices/chatSlice";

const AutoExpandingTextarea = () => {
	const dispatch = useDispatch();
	const { conversationId } = useSelector((state) => state.chat);
	const [isDisabled, setIsDisabled] = useState(true);
	const [value, setValue] = useState("");
	const textAreaRef = useRef(null);

	const [storeChat, { data, isSuccess }] = useStoreChatMutation();

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
		storeChat({
			promt: value,
			chatId: conversationId,
		});
		setValue("");
	};

	// set conversationId after sending message
	useEffect(() => {
		if (isSuccess && data?.id) {
			dispatch(storeConversationId(data?.id));
		}
	}, [isSuccess, data?.id, dispatch]);

	return (
		<form onSubmit={handleSubmitUserValue} className="w-full">
			<div className="chat-send-box">
				<textarea
					className="chat-textarea"
					id="chat-textarea"
					onChange={handleChange}
					placeholder="Write your message.."
					ref={textAreaRef}
					rows={1}
					value={value}
					style={{ maxHeight: "200px" }}
					autoFocus
				/>
				<button className="chat-send-btn" disabled={isDisabled}>
					<span className="text-primary-dark" data-state="closed">
						<SendIcon />
					</span>
				</button>
			</div>
		</form>
	);
};

export default AutoExpandingTextarea;
