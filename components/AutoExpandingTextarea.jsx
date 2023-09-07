"use client";
import SendIcon from "./SendIcon";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import useAutoSizeTextArea from "@/hook/useAutoSizeTextArea";
import { useStoreChatMutation } from "@/store/api/chatStoreApi";

const AutoExpandingTextarea = () => {
	const { conversationId } = useSelector((state) => state.chat);
	const [isDisabled, setIsDisabled] = useState(true);
	const [value, setValue] = useState("");
	const textAreaRef = useRef(null);

	const [storeChat] = useStoreChatMutation();

	useAutoSizeTextArea(textAreaRef.current, value);

	useEffect(() => {
		if (value.trim() == "") {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
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
