const LoginProviderButton = ({ onClick, title, icon }) => {
	return (
		<button
			onClick={onClick}
			className="bg-blue-500 hover:bg-blue-500/90 active:bg-blue-500 w-full flex items-center gap break-all rounded-lg p-1"
		>
			{icon}
			<p className="flex-1 break-all font-semibold text-sm md:text-base text-white">
				{title}
			</p>
		</button>
	);
};

export default LoginProviderButton;
