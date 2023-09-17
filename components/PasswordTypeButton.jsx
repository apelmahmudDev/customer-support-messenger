const PasswordTypeButton = ({ icon, onClick }) => {
	return (
		<button
			onClick={onClick}
			type="button"
			className="absolute bg-white w-8 h-8 pl-1 m-auto right-2 top-0 bottom-0 flex items-center"
		>
			{icon}
		</button>
	);
};

export default PasswordTypeButton;
