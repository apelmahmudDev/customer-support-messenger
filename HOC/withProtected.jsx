/* eslint-disable react/display-name */
// withAuth.js (Higher-Order Component)
import { useRouter } from "next/router";
import { useEffect } from "react";

// This function checks if the user is authenticated and redirects if not.
const withAuth = (WrappedComponent) => {
	return (props) => {
		const router = useRouter();

		useEffect(() => {
			// Implement your authentication logic here
			const isAuthenticated = /* Check if the user is authenticated */ false;

			if (!isAuthenticated) {
				// If the user is not authenticated, redirect to the login page
				router.push("/login");
			}
		}, []);

		// If the user is authenticated, render the protected component
		return isAuthenticated ? <WrappedComponent {...props} /> : null;
	};
};

export default withAuth;
