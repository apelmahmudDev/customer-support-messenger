"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// This function checks if the user is authenticated and redirects if not.
const withAuth = (WrappedComponent) => {
	const WithAuth = (props) => {
		const { token } = useSelector((state) => state.auth);

		const router = useRouter();

		// Implement your authentication logic here
		const isAuthenticated = false;

		useEffect(() => {
			if (!token) {
				// If the user is not authenticated, redirect to the login page
				router.push("/login");
			}
		}, []);

		// If the user is authenticated, render the protected component
		return token ? <WrappedComponent {...props} /> : null;
	};

	WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

	return WithAuth;
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
