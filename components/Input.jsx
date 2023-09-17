const Input = ({ type = "text", name = "", onChange, value }) => {
	return (
		<input
			onChange={onChange}
			value={value}
			type={type}
			name={name}
			id={name}
			className="w-full text-sm md:text-base border border-gray rounded-lg p-2 md:p-[11px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none autofill:bg-transparent"
		/>
	);
};

export default Input;
