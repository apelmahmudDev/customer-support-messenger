const NewChatButton = ({ onClick }) => {
	return (
		<button onClick={onClick} className="new-chat__button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="shrink-0 w-5 h-5"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
			<span>New Chat</span>
		</button>
	);
};

export default NewChatButton;
