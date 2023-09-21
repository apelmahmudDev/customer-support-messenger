"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBotTyping } from "@/store/slices/uiSlice";
import SendIcon from "./SendIcon";
import { useStoreChatMutation } from "@/store/api/testApi";
import useAutoSizeTextArea from "@/hook/useAutoSizeTextArea";
import { storeConversationId, storeTempMessage } from "@/store/slices/chatSlice";

const AutoExpandingTextarea = () => {
	const dispatch = useDispatch();
	const { conversationId } = useSelector((state) => state.chat);
	const { isBotTyping } = useSelector((state) => state.ui);
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
		dispatch(setBotTyping(true));
		if(!conversationId){
			dispatch(
				storeTempMessage({
					user_message: value,
					id: Date.now().toString(),
					isTemp: true,
				})
			);
		};
		storeChat({ promt: value, conversationId });
		setValue("");
	};

	const handleKeyPress = (e) => {
		if (value.length && e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			dispatch(setBotTyping(true));
			if(!conversationId){
				dispatch(
					storeTempMessage({
						user_message: value,
						id: Date.now().toString(),
						isTemp: true,
					})
				);
			};
			storeChat({ promt: value, conversationId });
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
					autoFocus
					style={{ maxHeight: "200px" }}
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
