export const validateForm = (data) => {
	const errors = {};

	if (!data.email) {
		errors.email = "Email is required";
	} else if (!isValidEmail(data.email)) {
		errors.email = "Invalid email format";
	}

	if (!data.password) {
		errors.password = "Password is required";
	} else if (data.password.length < 6) {
		errors.password = "Password must be at least 6 characters";
	}

	return errors;
};

const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};
