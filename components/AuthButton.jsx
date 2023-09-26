import Spinner from "./Spinner";

const AuthButton = ({ type = "button", isLoading }) => {
	return (
		<button
			type={type}
			className="flex items-center justify-center gap-2 bg-dark-primary hover:bg-dark-primary/90 active:bg-dark-primary p-3 text-white rounded-lg font-semibold text-sm md:text-base break-all"
		>
			<span>Sign in</span>
			{isLoading && <Spinner small/>}
		</button>
	);
};

export default AuthButton;
