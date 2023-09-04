"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const AutoExpandingTextarea = () => {
	const [content, setContent] = useState("");
	const [height, setHeight] = useState("auto");

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

	return (
		<div className="w-full flex flex-col flex-grow relative border border-black/10 bg-white rounded-lg shadow-xs">
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
			<button className="chat-textarea-button">
				<Image
					src="/assets/send.png"
					alt="send"
					height="20"
					width="20"
				/>
			</button>
		</div>
	);
};

export default AutoExpandingTextarea;
