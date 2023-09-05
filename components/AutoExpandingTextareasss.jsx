"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStoreChatMutation } from "@/store/api/chatStoreApi";

const AutoExpandingTextarea = () => {
	const [content, setContent] = useState("");
	const [height, setHeight] = useState("auto");

	const [storeChat] = useStoreChatMutation();

	// Update the textarea height whenever the content changes
	useEffect(() => {
		const textarea = document.getElementById("auto-expanding-textarea");
		textarea.style.height = "auto";
		textarea.style.height = `${textarea.scrollHeight}px`;
	}, [content]);

	// Handle changes to the textarea content
	const handleTextareaChange = (event) => {
		setContent(event.target.value);
	};

	const handleChatSubmit = (e) => {
		e.preventDefault();
		// storeChat({
		// 	prompt: content,
		// });
		console.log("content", content);
	};

	return (
		<form
			onClick={handleChatSubmit}
			className="w-full flex flex-col flex-grow relative border border-black/10 bg-white rounded-lg shadow-xs"
		>
			<textarea
				id="auto-expanding-textarea"
				value={content}
				tabIndex={0}
				rows={1}
				onChange={handleTextareaChange}
				style={{ height: height }}
				placeholder="Send a message"
				className="chat-textarea"
				spellCheck="false"
			></textarea>
			<button type="submit" className="chat-textarea-button">
				<Image src="/assets/send.png" alt="send" height="20" width="20" />
			</button>
		</form>
	);
};

export default AutoExpandingTextarea;
