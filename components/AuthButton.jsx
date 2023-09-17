const AuthButton = ({ type = "button" }) => {
	return (
		<button
			type={type}
			className="bg-dark-primary hover:bg-dark-primary/90 active:bg-dark-primary p-3 text-white rounded-lg font-semibold text-sm md:text-base break-all"
		>
			Sign in
		</button>
	);
};

export default AuthButton;
