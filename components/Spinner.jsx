const Spinner = ({ small }) => {
	return (
		<svg
			width={small ? "22" : "24"}
			height={small ? "22" : "24"}
			viewBox="0 0  24 24"
			className={`${small ? "pr-1 mb-1" : ""}`}
			xmlns="http://www.w3.org/2000/svg"
		>
			<g className="spinner_Wezc">
				<circle fill="#ffcf4b" cx="12" cy="2.5" r="1.5" opacity=".14" />
				<circle
					fill="#ffcf4b"
					cx="16.75"
					cy="3.77"
					r="1.5"
					opacity=".29"
				/>
				<circle
					fill="#ffcf4b"
					cx="20.23"
					cy="7.25"
					r="1.5"
					opacity=".43"
				/>
				<circle
					fill="#ffcf4b"
					cx="21.50"
					cy="12.00"
					r="1.5"
					opacity=".57"
				/>
				<circle
					fill="#ffcf4b"
					cx="20.23"
					cy="16.75"
					r="1.5"
					opacity=".71"
				/>
				<circle
					fill="#ffcf4b"
					cx="16.75"
					cy="20.23"
					r="1.5"
					opacity=".86"
				/>
				<circle fill="#ffcf4b" cx="12" cy="21.5" r="1.5" />
			</g>
		</svg>
	);
};

export default Spinner;
